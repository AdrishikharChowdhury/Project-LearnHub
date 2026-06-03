

import { getCompanionSession } from "@/lib/actions/companion.action";
import Image from "next/image";
import LaunchQuizButton from "./LaunchQuizButton";

interface CompanionQuizCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  subjectData?: {
    icon_url: string;
    color: string;
    display_name: string;
  } | null;
}

const CompanionQuizCard  = async ({
  id,
  name,
  topic,
  subject,
  duration,
  subjectData,
}: CompanionQuizCardProps) => {
    const isQuiz=await getCompanionSession(id)
  return (
    <article className="relative group companion-card shrink-0 bg-white overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 w-2 group-hover:w-full transition-all duration-500 ease-in-out"
        style={{ backgroundColor: subjectData?.color || "#E5D0FF" }}
      />
      <div className="relative z-10 flex flex-col gap-5 justify-between h-full">
        <div>
          <div className="flex justify-between items-center">
            <div className="subject-badge">{subject}</div>
            <button className="companion-bookmark">
              <Image
                src="/icons/bookmark.svg"
                alt="bookmark"
                width={12.5}
                height={15}
              />
            </button>
          </div>
          <h2 className="text-2xl font-black mt-4">{name}</h2>
          <p className="text-sm mt-2">Topic: {topic}</p>
          <div className="flex items-center gap-2 mt-3">
            <Image
              src="/icons/clock.svg"
              alt="duration"
              width={13.5}
              height={13.5}
            />
            <p className="text-sm">{duration} mins duration</p>
          </div>
        </div>
        <LaunchQuizButton id={id} isQuiz={isQuiz} />
      </div>
    </article>
  );
};

export default CompanionQuizCard;
