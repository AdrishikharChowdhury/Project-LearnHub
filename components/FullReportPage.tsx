"use client";

import dynamic from "next/dynamic";
import StatsCards from "./StatsCards";
import ScoreLineChart from "./ScoreLineChart";
import SessionsBarChart from "./SessionsBarChart";
import SendEmailButton from "./SendEmailButton";
import { useRouter } from "next/navigation";

const SubjectPieChart = dynamic(() => import("./SubjectPieChart"), { ssr: false });

interface FullReportPageProps {
  report: MonthlyReport;
}

const FullReportPage = ({ report }: FullReportPageProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{report.month.label}</h1>
          <p className="text-muted-foreground">
            {new Date(report.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
            {new Date(report.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <SendEmailButton
          year={report.month.year}
          month={report.month.month}
          label={report.month.label}
        />
      </div>

      <StatsCards
        total={report.quizStats.total}
        averageScore={report.quizStats.averageScore}
        bestScore={report.quizStats.bestScore}
        subjects={report.subjectBreakdown.length}
      />

      <ScoreLineChart trend={report.quizStats.trend} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SessionsBarChart data={report.companionStats} />
        <SubjectPieChart data={report.subjectBreakdown} />
      </div>

      {report.companionStats.length > 0 && (
        <div className="border border-black bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="text-xl font-bold mb-4">Companion Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2">
                  <th className="py-2 px-3">Topic</th>
                  <th className="py-2 px-3">Subject</th>
                  <th className="py-2 px-3 text-center">Sessions</th>
                  <th className="py-2 px-3 text-center">Quizzes</th>
                  <th className="py-2 px-3 text-center">Avg Score</th>
                </tr>
              </thead>
              <tbody>
                {report.companionStats.map((comp) => (
                  <tr key={comp.companionId} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-3 font-medium">{comp.topic}</td>
                    <td className="py-3 px-3 capitalize">{comp.subject}</td>
                    <td className="py-3 px-3 text-center">{comp.sessions}</td>
                    <td className="py-3 px-3 text-center">{comp.quizAttempts}</td>
                    <td className="py-3 px-3 text-center font-bold">{comp.avgScore}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullReportPage;
