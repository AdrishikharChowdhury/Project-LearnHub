import { getAvailableMonths } from "@/lib/actions/report.action";
import { progressReportPermission } from "@/lib/actions/companion.action";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import ReportSummaryCard from "./ReportSummaryCard";

const MonthlyReportsList = async () => {
  const isPermitted = await progressReportPermission();

  if (!isPermitted) return null;

  const months = await getAvailableMonths();

  return (
    <AccordionItem value="reports">
      <AccordionTrigger className="text-2xl font-bold">
        Monthly Reports ({months.length})
      </AccordionTrigger>
      <AccordionContent>
        {months.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No reports available yet. Start taking quizzes and sessions to see your progress.
          </p>
        ) : (
          <section className="flex flex-col gap-4">
            {months.map((month) => (
              <ReportSummaryCard
                key={`${month.year}-${month.month}`}
                month={month}
              />
            ))}
          </section>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default MonthlyReportsList;
