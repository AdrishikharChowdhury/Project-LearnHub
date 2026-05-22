import {
  getUserHistory,
  sessionHistoryPermission,
} from "@/lib/actions/companion.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import SessionCard from "./SessionCard";

const MessagesList = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const messagesHistories = await getUserHistory(user.id);
  const isMessageHistory = await sessionHistoryPermission();
  return (
    <>
      {isMessageHistory && (
        <AccordionItem value="history">
          <AccordionTrigger className="text-2xl font-bold">
            Conversation History ({messagesHistories.length})
          </AccordionTrigger>
          <AccordionContent>
            <section className="home-section flex-col overflow-scroll justify-start bg-white p-5 border-2 border-black rounded-4xl">
              <h1>Conversation History</h1>
              <div className="flex gap-4">
                {messagesHistories
                  .reverse()
                  .map((messageHistory, idx: number) => (
                    <SessionCard
                      key={idx}
                      companion_id={messageHistory.companion_id}
                      id={messageHistory.id}
                      created_at={messageHistory.created_at}
                    />
                  ))}
              </div>
            </section>
          </AccordionContent>
        </AccordionItem>
      )}
    </>
  );
};

export default MessagesList;
