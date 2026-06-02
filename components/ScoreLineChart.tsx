"use client";

import { LineChart } from "@mui/x-charts";

interface ScoreLineChartProps {
  trend: QuizTrendPoint[];
}

const ScoreLineChart = ({ trend }: ScoreLineChartProps) => {
  if (trend.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border-2 rounded-2xl text-muted-foreground">
        No quiz data this month
      </div>
    );
  }

  return (
    <div className="border-2 rounded-2xl p-4">
      <h3 className="text-lg font-bold mb-2">Score Trend</h3>
      <LineChart
        xAxis={[{
          data: trend.map((t) => t.day),
          scaleType: "band",
          tickLabelStyle: { fontSize: 10 },
        }]}
        yAxis={[{
          min: 0,
          max: 100,
        }]}
        series={[{
          data: trend.map((t) => t.score),
          label: "Score %",
          color: "#fe5933",
          showMark: true,
        }]}
        width={600}
        height={250}
        slotProps={{ legend: { hidden: true } }}
      />
    </div>
  );
};

export default ScoreLineChart;
