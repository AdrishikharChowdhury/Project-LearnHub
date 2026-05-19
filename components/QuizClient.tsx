import { generateQuiz } from "@/lib/actions/quiz.action";
import React from "react";
import QuestionCards from "./QuestionCards";

interface QuizClientProps {
  companionId: string;
}

const QuizClient = async ({ companionId }: QuizClientProps) => {
  const questions = await generateQuiz(companionId);
  return (
    <main className="h-[90vh] w-3/5 flex flex-col justify-center items-center overflow-y-scroll">
      <h1 className="text-4xl">Quiz Session</h1>
      <QuestionCards questions={questions} />
    </main>
  );
};

export default QuizClient;
