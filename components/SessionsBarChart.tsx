"use client";

import { useRef, useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts";

interface SessionsBarChartProps {
  data: CompanionStat[];
}

const SessionsBarChart = ({ data }: SessionsBarChartProps) => {
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
      <div className="flex items-center justify-center h-64 border-[3px] border-black rounded text-muted-foreground shadow-brutal">
        No session data this month
      </div>
    );
  }

  return (
    <div ref={containerRef} className="border-[3px] border-black rounded p-4 shadow-brutal">
      <h3 className="text-lg font-extrabold mb-2">Sessions per Companion</h3>
      <BarChart
        xAxis={[{
          data: data.map((d) => d.topic.length > 12 ? d.topic.slice(0, 12) + "..." : d.topic),
          scaleType: "band",
          tickLabelStyle: { fontSize: 10 },
        }]}
        yAxis={[{ min: 0 }]}
        series={[{
          data: data.map((d) => d.sessions),
          label: "Sessions",
          color: "#fe5933",
        }]}
        width={Math.max(width, 300)}
        height={250}
        hideLegend
      />
    </div>
  );
};

export default SessionsBarChart;
