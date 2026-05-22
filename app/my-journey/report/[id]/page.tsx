import QuestionCards from "@/components/QuestionCards";
import ReportContent from "@/components/ReportContent";
import { getAllQuizAnswers } from "@/lib/actions/quiz.action";
import { formatTimestamp } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";


interface QuizPageProps {
  params: Promise<{ id: string }>;
}

const QuizReport = async ({ params }: QuizPageProps) => {
  const { id } = await params;
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const quizData:QuizAttempt = await getAllQuizAnswers(user.id, id);
  return (
    <ReportContent quizData={quizData} />
  );
};

export default QuizReport;
