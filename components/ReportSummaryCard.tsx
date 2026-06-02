"use client";

import Link from "next/link";

interface ReportSummaryCardProps {
  month: ReportMonth;
}

const ReportSummaryCard = ({ month }: ReportSummaryCardProps) => {
  const getBarColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const startDate = new Date(month.year, month.month, 1);
  const endDate = new Date(month.year, month.month + 1, 0);
  const dateRange = `${startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  return (
    <Link
      href={`/my-journey/report/monthly/${month.year}/${month.month}`}
      className="no-underline!"
    >
      <div className="border border-black rounded-2xl p-5 flex flex-col gap-3 hover:shadow-md transition-shadow cursor-pointer bg-white">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <h3 className="text-xl font-bold">
            Monthly Report #{month.reportNumber}
          </h3>
          <span className="text-sm text-muted-foreground">{month.label}</span>
        </div>
        <p className="text-sm text-muted-foreground">{dateRange}</p>

        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
          <div
            className={`h-4 rounded-full transition-all duration-500 ${getBarColor(month.avgScore)}`}
            style={{ width: `${month.avgScore}%` }}
          />
        </div>

        <div className="flex justify-between text-sm mt-1">
          <span>{month.quizCount} quizzes</span>
          <span className="font-bold">{month.avgScore}% avg</span>
        </div>

        <p className="text-primary font-semibold text-sm mt-1">
          View Full Report →
        </p>
      </div>
    </Link>
  );
};

export default ReportSummaryCard;
