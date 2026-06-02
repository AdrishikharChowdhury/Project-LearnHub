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
            {messagesHistories.length === 0 ? (
              <p className="text-muted-foreground text-center py-8 bg-white border border-black rounded-3xl">
                No conversation history found. Start talking to your companions.
              </p>
            ) : (
              <section className="flex flex-col gap-4 bg-white p-6 border border-black rounded-2xl w-full">
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
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
            )}
          </AccordionContent>
        </AccordionItem>
      )}
    </>
  );
};

export default MessagesList;
