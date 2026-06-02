interface ReportMonth {
  year: number;
  month: number;
  label: string;
  reportNumber: number;
  quizCount: number;
  avgScore: number;
}

interface QuizTrendPoint {
  day: string;
  score: number;
}

interface CompanionStat {
  companionId: string;
  topic: string;
  subject: string;
  sessions: number;
  quizAttempts: number;
  avgScore: number;
}

interface SubjectBreakdown {
  subject: string;
  sessions: number;
  quizzes: number;
  avgScore: number;
}

interface MonthlyReport {
  month: ReportMonth;
  startDate: string;
  endDate: string;
  quizStats: {
    total: number;
    averageScore: number;
    bestScore: number;
    trend: QuizTrendPoint[];
  };
  companionStats: CompanionStat[];
  subjectBreakdown: SubjectBreakdown[];
}
