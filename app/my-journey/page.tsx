import CompanionsList from "@/components/CompanionsList";
import MessagesList from "@/components/MessagesList";
import MonthlyReportsList from "@/components/MonthlyReportsList";
import QuizList from "@/components/QuizList";
import SessionCard from "@/components/SessionCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getUserCompanions,
  getUserHistory,
  getUserSessions,
  sessionHistoryPermission,
} from "@/lib/actions/companion.action";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const Profile = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);
  
  return (
    <main className="w-full lg:w-3/4 mx-auto">
      <section className="flex flex-col justify-between items-center  gap-6 border-b pb-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center text-center sm:text-left">
          <Image
            src={user.imageUrl}
            alt="image"
            width={110}
            height={110}
            className="rounded-lg"
          />
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 w-full md:w-auto">
          <div className="border border-black rounded-xl p-3 px-4 flex items-center gap-3 bg-white shadow-sm min-w-45">
            <Image
              src="/icons/check.svg"
              alt="checkmark"
              width={22}
              height={22}
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold leading-none">{sessionHistory.length}</span>
              <span className="text-xs text-muted-foreground mt-1">Lessons Completed</span>
            </div>
          </div>
          <div className="border border-black rounded-xl p-3 px-4 flex items-center gap-3 bg-white shadow-sm min-w-45">
            <Image
              src="/icons/cap.svg"
              alt="checkmark"
              width={22}
              height={22}
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold leading-none">{companions.length}</span>
              <span className="text-xs text-muted-foreground mt-1">Companions Created</span>
            </div>
          </div>
        </div>
      </section>
      <Accordion defaultValue={["recent", "companions", "history","quizzes", "reports"]}>
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title="Recent Sessions"
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions ({companions.length})
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
        <MessagesList />
        <QuizList />
        <MonthlyReportsList />
      </Accordion>
    </main>
  );
};

export default Profile;
