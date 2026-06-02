import { generateQuiz, getCooldownRemaining } from "@/lib/actions/quiz.action";
import QuestionCards from "./QuestionCards";
import CooldownTimer from "./CooldownTimer";

interface QuizClientProps {
  companionId: string;
}

const QuizClient = async ({ companionId }: QuizClientProps) => {
  const remaining = await getCooldownRemaining(companionId);

  if (remaining > 0) {
    return (
      <main className="flex justify-center items-center h-[90vh]">
        <CooldownTimer remainingMs={remaining} />
      </main>
    );
  }

  const questions = await generateQuiz(companionId);
  return (
    <main className="h-[90vh] w-3/5 flex flex-col justify-center items-center overflow-y-scroll">
      <h1 className="text-4xl">Quiz Session</h1>
      <QuestionCards companionId={companionId} questions={questions} />
    </main>
  );
};

export default QuizClient;
