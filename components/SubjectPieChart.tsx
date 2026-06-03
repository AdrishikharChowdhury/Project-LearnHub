"use client";

import { useRef, useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts";

interface SubjectPieChartProps {
  data: SubjectBreakdown[];
}

const COLORS = ["#fe5933", "#fccc41", "#22c55e", "#3b82f6", "#a855f7", "#ec4899", "#14b8a6", "#f97316", "#6b7280"];

const SubjectPieChart = ({ data }: SubjectPieChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border-2 rounded-2xl text-muted-foreground">
        No subject data this month
      </div>
    );
  }

  const pieData = data.map((d, i) => ({
    id: i,
    value: d.sessions + d.quizzes,
    label: d.subject,
    color: COLORS[i % COLORS.length],
  }));

  return (
    <div ref={containerRef} className="border-2 rounded-2xl p-4">
      <h3 className="text-lg font-bold mb-2">Subject Distribution</h3>
      <PieChart
        series={[{
          data: pieData,
          innerRadius: 30,
          outerRadius: 80,
          paddingAngle: 2,
          cornerRadius: 4,
        }]}
        width={Math.max(width, 300)}
        height={250}
        slotProps={{ legend: { direction: "vertical", position: { vertical: "middle", horizontal: "end" } } }}
      />
    </div>
  );
};

export default SubjectPieChart;
