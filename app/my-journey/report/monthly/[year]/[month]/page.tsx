import { getMonthlyReport } from "@/lib/actions/report.action";
import { progressReportPermission } from "@/lib/actions/companion.action";
import FullReportPage from "@/components/FullReportPage";
import { redirect } from "next/navigation";

interface MonthlyReportPageProps {
  params: Promise<{ year: string; month: string }>;
}

const MonthlyReportPage = async ({ params }: MonthlyReportPageProps) => {
  const isPermitted = await progressReportPermission();
  if (!isPermitted) redirect("/my-journey");

  const { year, month } = await params;
  const yearNum = parseInt(year);
  const monthNum = parseInt(month);

  try {
    const report = await getMonthlyReport(yearNum, monthNum);

    return (
      <main className="w-full max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">
        <FullReportPage report={report} />
      </main>
    );
  } catch {
    redirect("/my-journey");
  }
};

export default MonthlyReportPage;
