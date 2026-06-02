"use client";

interface StatsCardsProps {
  total: number;
  averageScore: number;
  bestScore: number;
  subjects: number;
}

const StatsCards = ({ total, averageScore, bestScore, subjects }: StatsCardsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-700 border-green-500 bg-green-50/50";
    if (score >= 50) return "text-yellow-700 border-yellow-500 bg-yellow-50/50";
    return "text-red-700 border-red-500 bg-red-50/50";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      <div className="border border-black bg-white rounded-2xl p-5 flex flex-col items-center gap-2 shadow-sm">
        <p className="text-4xl font-bold text-black">{total}</p>
        <p className="text-sm text-muted-foreground">Quizzes Taken</p>
      </div>
      <div className={`border rounded-2xl p-5 flex flex-col items-center gap-2 shadow-sm ${getScoreColor(averageScore)}`}>
        <p className="text-4xl font-bold">{averageScore}%</p>
        <p className="text-sm text-muted-foreground">Average Score</p>
      </div>
      <div className="border border-black bg-white rounded-2xl p-5 flex flex-col items-center gap-2 shadow-sm">
        <p className="text-4xl font-bold text-black">{subjects}</p>
        <p className="text-sm text-muted-foreground">Subjects</p>
      </div>
    </div>
  );
};

export default StatsCards;
