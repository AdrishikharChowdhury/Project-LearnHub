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

const QuizList = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const quizzes = await getAllQuizSessions(user.id);

  return (
    <AccordionItem value="companions">
      <AccordionTrigger className="text-2xl font-bold">
        My Quizzes ({quizzes.length})
      </AccordionTrigger>
      <AccordionContent>
        <section className="home-section flex-col overflow-scroll justify-start bg-white p-5 border-2 border-black rounded-4xl">
          {quizzes.map((quiz, idx) => (
            <Link key={idx} href={`/my-journey/report/${quiz.id}`} className="no-underline!">
              <div
                className="h-full w-80 rounded-4xl border-2 bg-yellow-400 p-5 flex flex-col justify-between"
                style={{
                  backgroundColor: getSubjectColor(quiz.companions.subject),
                }}
              >
                <h2 className="text-sm font-light" >Quiz on,</h2>
                <h2 className="text-2xl font-bold">{quiz.companions?.topic}</h2>
                <p className="subject-badge w-fit">{quiz.companions?.subject}</p>
                <p className="text-sm mt-2">
                  <b>Submitted At:</b> {formatTimestamp(quiz.created_at)}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </AccordionContent>
    </AccordionItem>
  );
};

export default QuizList;
