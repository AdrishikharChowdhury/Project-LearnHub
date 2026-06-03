import { getAllQuizSessions } from "@/lib/actions/quiz.action";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatTimestamp, getSubjectColor } from "@/lib/utils";
import { quizPermission } from "@/lib/actions/companion.action";

const QuizList = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const isQuiz=await quizPermission()

  const quizzes = await getAllQuizSessions(user.id);

  return (
    <>
    {isQuiz && (
    <AccordionItem value="quizzes">
      <AccordionTrigger className="text-2xl font-bold">
        My Quizzes ({quizzes.length})
      </AccordionTrigger>
      <AccordionContent>
        {quizzes.length === 0 ? (
          <p className="text-muted-foreground text-center py-8 bg-white border-[3px] border-black rounded shadow-brutal">
            No quizzes taken yet. Start a quiz session to see your progress.
          </p>
        ) : (
          <section className="flex gap-4 overflow-x-auto no-scrollbar bg-white p-6 border-[3px] border-black rounded w-full shadow-brutal">
            {quizzes.reverse().map((quiz, idx) => (
              <Link key={idx} href={`/my-journey/report/${quiz.id}`} className="no-underline! shrink-0">
                <div
                  className="relative group h-full w-80 rounded border-[3px] border-black shadow-brutal hover:shadow-brutal-hover transition-all overflow-hidden bg-white"
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-2 group-hover:w-full transition-all duration-500 ease-in-out"
                    style={{ backgroundColor: getSubjectColor(quiz.companions.subject) }}
                  />
                  <div className="relative z-10 p-5 flex flex-col justify-between" style={{ minHeight: "100%" }}>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-black uppercase tracking-wider text-black/60">Quiz on</span>
                      <h2 className="text-2xl font-black truncate text-black">{quiz.companions?.topic}</h2>
                    </div>
                    <div className="mt-6 flex flex-col gap-2">
                      <span className="subject-badge w-fit">{quiz.companions?.subject}</span>
                      <p className="text-xs text-black/70">
                        <b>Submitted:</b> {formatTimestamp(quiz.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}
      </AccordionContent>
    </AccordionItem>
    )}
    </>
  );
};

export default QuizList;
