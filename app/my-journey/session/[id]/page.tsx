import {
  getMessages,
  sessionHistoryPermission,
} from "@/lib/actions/companion.action";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

interface MessageSessionPageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: MessageSessionPageProps) => {
  const { id } = await params;
  const messages = await getMessages(id);
  const user = await currentUser();
  const isMessageHistory = await sessionHistoryPermission();
  if (!user) redirect("/sign-in");
  console.log(id);
  return (
    isMessageHistory && (
      <main className="h-[90vh] overflow-y-scroll">
        {messages.messages.map((message: SavedMessage, idx: number) => (
          <div
            key={idx}
            className={`max-w-1/2 w-fit text-white flex flex-col gap-2 ${message.role === "user" ? "self-end" : ""} `}
          >
            <div
              className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse mr-4" : "ml-4"} items-center `}
            >
              {message.role === "user" ? (
                <Image
                  alt="avatar"
                  src={user.imageUrl}
                  width={40}
                  height={15}
                  className="rounded-full"
                />
              ) : (
                ""
              )}
              <p className="font-extrabold text-black capitalize ">
                {message.role === "user" ? user.firstName! : message.role}
              </p>
            </div>

            <p
              className={`bg-primary/90 py-5 px-6 rounded-2xl text-lg ${message.role === "user" ? "text-right self-end" : ""}`}
            >
              {message.content}
            </p>
          </div>
        ))}
      </main>
    )
  );
};

export default page;
