"use client";

import { BarChart } from "@mui/x-charts";

interface SessionsBarChartProps {
  data: CompanionStat[];
}

const SessionsBarChart = ({ data }: SessionsBarChartProps) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border-2 rounded-2xl text-muted-foreground">
        No session data this month
      </div>
    );
  }

  return (
    <div className="border-2 rounded-2xl p-4">
      <h3 className="text-lg font-bold mb-2">Sessions per Companion</h3>
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
        width={400}
        height={250}
        slotProps={{ legend: { hidden: true } }}
      />
    </div>
  );
};

export default SessionsBarChart;
