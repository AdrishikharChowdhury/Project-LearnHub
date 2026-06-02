"use client";

interface StatsCardsProps {
  total: number;
  averageScore: number;
  bestScore: number;
  subjects: number;
}

const StatsCards = ({ total, averageScore, bestScore, subjects }: StatsCardsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 border-green-400";
    if (score >= 50) return "text-yellow-600 border-yellow-400";
    return "text-red-600 border-red-400";
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      <div className="border-2 rounded-2xl p-5 flex flex-col items-center gap-2">
        <p className="text-4xl font-bold">{total}</p>
        <p className="text-sm text-muted-foreground">Quizzes Taken</p>
      </div>
      <div className={`border-2 rounded-2xl p-5 flex flex-col items-center gap-2 ${getScoreColor(averageScore)}`}>
        <p className="text-4xl font-bold">{averageScore}%</p>
        <p className="text-sm text-muted-foreground">Average Score</p>
      </div>
      <div className="border-2 rounded-2xl p-5 flex flex-col items-center gap-2">
        <p className="text-4xl font-bold">{subjects}</p>
        <p className="text-sm text-muted-foreground">Subjects</p>
      </div>
    </div>
  );
};

export default StatsCards;
