import CompanionsList from "@/components/CompanionsList";
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
  const messagesHistories = await getUserHistory(user.id);
  const isMessageHistory=await sessionHistoryPermission()
  return (
    <main className="lg:w-3/4">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt="image"
            width={110}
            height={110}
            className="rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/check.svg"
                alt="checkmark"
                width={22}
                height={22}
              />
              <p className="text-2xl font-bold">{sessionHistory.length}</p>
              <p>Lessons Completed</p>
            </div>
          </div>
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/cap.svg"
                alt="checkmark"
                width={22}
                height={22}
              />
              <p className="text-2xl font-bold">{companions.length}</p>
              <p>Companions Created</p>
            </div>
          </div>
        </div>
      </section>
      <Accordion defaultValue={["recent", "companions", "history"]}>
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
        {isMessageHistory &&(<AccordionItem value="history">
          <AccordionTrigger className="text-2xl font-bold">
            Conversation History ({messagesHistories.length})
          </AccordionTrigger>
          <AccordionContent>
            <section className="home-section flex-col overflow-scroll justify-start bg-white p-5 border-2 border-black rounded-4xl">
              <h1>Conversation History</h1>
              <div className="flex gap-4">
              {messagesHistories.reverse().map((messageHistory, idx: number) => (
                <SessionCard
                  key={idx}
                  companion_id={messageHistory.companion_id}
                  id={messageHistory.id}
                  created_at={messageHistory.created_at}
                />
              ))}</div>
            </section>
          </AccordionContent>
        </AccordionItem>)}
      </Accordion>
    </main>
  );
};

export default Profile;
