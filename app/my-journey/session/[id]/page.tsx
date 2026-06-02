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

  return (
    isMessageHistory && (
      <main className="h-[80vh] sm:h-[85vh] overflow-y-auto px-4 sm:px-6 py-6 w-full max-w-3xl mx-auto flex flex-col gap-4 no-scrollbar">
        {messages.messages.map((message: SavedMessage, idx: number) => (
          <div
            key={idx}
            className={`max-w-[85%] sm:max-w-[70%] w-fit flex flex-col gap-1.5 ${message.role === "user" ? "self-end" : "self-start"} `}
          >
            <div
              className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse mr-1" : "ml-1"} items-center `}
            >
              {message.role === "user" ? (
                <Image
                  alt="avatar"
                  src={user.imageUrl}
                  width={32}
                  height={32}
                  className="rounded-full border border-black/20"
                />
              ) : (
                ""
              )}
              <p className="font-bold text-sm text-neutral-800 capitalize">
                {message.role === "user" ? (user.firstName || "User") : message.role}
              </p>
            </div>

            <p
              className={`py-3 px-4 sm:py-3.5 sm:px-5 rounded-2xl text-sm sm:text-base leading-relaxed ${
                message.role === "user"
                  ? "bg-primary text-white rounded-tr-none self-end"
                  : "bg-white text-black border border-black rounded-tl-none"
              }`}
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
