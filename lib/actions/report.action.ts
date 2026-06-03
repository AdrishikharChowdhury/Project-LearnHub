"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "../supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function startOfMonth(year: number, month: number) {
  return new Date(year, month, 1).toISOString();
}

function endOfMonth(year: number, month: number) {
  return new Date(year, month + 1, 0, 23, 59, 59, 999).toISOString();
}

function isMonthComplete(year: number, month: number) {
  const now = new Date();
  const firstOfNextMonth = new Date(year, month + 1, 1);
  return now >= firstOfNextMonth;
}

export const getAvailableMonths = async (): Promise<ReportMonth[]> => {
  const { userId } = await auth();
  if (!userId) return [];

  const supabase = createSupabaseClient();

  const { data: quizzes } = await supabase
    .from("quiz_attempts")
    .select("created_at, score")
    .eq("author", userId);

  const { data: sessions } = await supabase
    .from("session_history")
    .select("created_at")
    .eq("user_id", userId);

  const monthMap = new Map<string, { quizCount: number; totalScore: number; sessionCount: number }>();

  quizzes?.forEach((q) => {
    const d = new Date(q.created_at);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const entry = monthMap.get(key) || { quizCount: 0, totalScore: 0, sessionCount: 0 };
    entry.quizCount++;
    entry.totalScore += q.score;
    monthMap.set(key, entry);
  });

  sessions?.forEach((s) => {
    const d = new Date(s.created_at);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const entry = monthMap.get(key) || { quizCount: 0, totalScore: 0, sessionCount: 0 };
    entry.sessionCount++;
    monthMap.set(key, entry);
  });

  const months: ReportMonth[] = [];
  let reportNumber = 1;

  const sortedKeys = Array.from(monthMap.keys()).sort((a, b) => {
    const [yA, mA] = a.split("-").map(Number);
    const [yB, mB] = b.split("-").map(Number);
    return yB - yA || mB - mA;
  });

  for (const key of sortedKeys) {
    const [year, month] = key.split("-").map(Number);
    if (!isMonthComplete(year, month)) continue;
    const data = monthMap.get(key)!;
    months.push({
      year,
      month,
      label: `${MONTH_NAMES[month]} ${year}`,
      reportNumber: reportNumber++,
      quizCount: data.quizCount,
      avgScore: data.quizCount > 0 ? Math.round(data.totalScore / data.quizCount) : 0,
    });
  }

  return months;
};

export const getMonthlyReport = async (
  year: number,
  month: number,
): Promise<MonthlyReport> => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  if (!isMonthComplete(year, month)) {
    throw new Error("Reports are only available after the month ends");
  }

  const supabase = createSupabaseClient();
  const from = startOfMonth(year, month);
  const to = endOfMonth(year, month);

  const { data: quizAttempts } = await supabase
    .from("quiz_attempts")
    .select(`
      score, created_at, correct_answers, total_questions,
      companion_id,
      companions ( topic, subject )
    `)
    .eq("author", userId)
    .gte("created_at", from)
    .lte("created_at", to);

  const { data: sessionHistory } = await supabase
    .from("session_history")
    .select("created_at, companion_id")
    .eq("user_id", userId)
    .gte("created_at", from)
    .lte("created_at", to);

  // Quiz stats
  const quizScores = (quizAttempts || []).map((q: any) => q.score);
  const total = quizScores.length;
  const averageScore = total > 0 ? Math.round(quizScores.reduce((a: number, b: number) => a + b, 0) / total) : 0;
  const bestScore = total > 0 ? Math.max(...quizScores) : 0;

  // Score trend
  const trendMap = new Map<string, number[]>();
  (quizAttempts || []).forEach((q: any) => {
    const day = new Date(q.created_at).toISOString().slice(0, 10);
    const arr = trendMap.get(day) || [];
    arr.push(q.score);
    trendMap.set(day, arr);
  });
  const trend: QuizTrendPoint[] = Array.from(trendMap.entries())
    .map(([day, scores]) => ({
      day,
      score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    }))
    .sort((a, b) => a.day.localeCompare(b.day));

  // Companion stats
  const companionMap = new Map<string, CompanionStat>();
  (quizAttempts || []).forEach((q: any) => {
    const id = q.companion_id;
    const comp = q.companions;
    const entry = companionMap.get(id) || {
      companionId: id,
      topic: comp?.topic || "Unknown",
      subject: comp?.subject || "Unknown",
      sessions: 0,
      quizAttempts: 0,
      avgScore: 0,
      totalScore: 0,
    };
    entry.quizAttempts++;
    entry.totalScore += q.score;
    entry.avgScore = Math.round(entry.totalScore / entry.quizAttempts);
    companionMap.set(id, entry);
  });
  (sessionHistory || []).forEach((s: any) => {
    const id = s.companion_id;
    const entry = companionMap.get(id);
    if (entry) {
      entry.sessions++;
    } else {
      companionMap.set(id, {
        companionId: id,
        topic: "Unknown",
        subject: "Unknown",
        sessions: 1,
        quizAttempts: 0,
        avgScore: 0,
        totalScore: 0,
      });
    }
  });

  // Subject breakdown
  const subjectMap = new Map<string, SubjectBreakdown>();
  companionMap.forEach((comp) => {
    const entry = subjectMap.get(comp.subject) || {
      subject: comp.subject,
      sessions: 0,
      quizzes: 0,
      avgScore: 0,
      totalScore: 0,
    };
    entry.sessions += comp.sessions;
    entry.quizzes += comp.quizAttempts;
    entry.totalScore += comp.totalScore;
    subjectMap.set(comp.subject, entry);
  });
  const subjectBreakdown = Array.from(subjectMap.values()).map((s) => ({
    ...s,
    avgScore: s.quizzes > 0 ? Math.round(s.totalScore / s.quizzes) : 0,
  }));

  const companionStats = Array.from(companionMap.values());

  const availableMonths = await getAvailableMonths();
  const monthInfo = availableMonths.find((m) => m.year === year && m.month === month);

  return {
    month: monthInfo || { year, month, label: `${MONTH_NAMES[month]} ${year}`, reportNumber: 0, quizCount: total, avgScore: averageScore },
    startDate: from,
    endDate: to,
    quizStats: { total, averageScore, bestScore, trend },
    companionStats,
    subjectBreakdown,
  };
};

export const sendReportEmail = async (
  userEmail: string,
  year: number,
  month: number,
) => {
  const report = await getMonthlyReport(year, month);
  if (!report) throw new Error("No data for this month");

  const subjectRows = report.subjectBreakdown
    .map((s) => `<li>${s.subject}: ${s.quizzes} quizzes, ${s.avgScore}% avg</li>`)
    .join("");

  const companionRows = report.companionStats
    .map((c) => `<tr><td>${c.topic}</td><td>${c.subject}</td><td>${c.sessions}</td><td>${c.quizAttempts}</td><td>${c.avgScore}%</td></tr>`)
    .join("");

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #fe5933;">Monthly Progress Report</h1>
      <h2>${report.month.label}</h2>
      <p>${new Date(report.startDate).toLocaleDateString()} - ${new Date(report.endDate).toLocaleDateString()}</p>
      <hr />
      <h3>Quiz Summary</h3>
      <ul>
        <li>Quizzes taken: <strong>${report.quizStats.total}</strong></li>
        <li>Average score: <strong>${report.quizStats.averageScore}%</strong></li>
        <li>Best score: <strong>${report.quizStats.bestScore}%</strong></li>
      </ul>
      <h3>By Subject</h3>
      <ul>${subjectRows}</ul>
      <h3>Companion Details</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <tr style="background: #f5f5f5;"><th>Topic</th><th>Subject</th><th>Sessions</th><th>Quizzes</th><th>Avg Score</th></tr>
        ${companionRows}
      </table>
      <hr />
      <p style="color: #666; font-size: 12px;">Generated by LearnHub</p>
    </div>
  `;

  await resend.emails.send({
    from: "LearnHub <onboarding@resend.dev>",
    to: userEmail,
    subject: `Monthly Progress Report - ${report.month.label}`,
    html,
  });
};
