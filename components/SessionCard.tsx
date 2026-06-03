import { getCompanion } from "@/lib/actions/companion.action";
import { formatTimestamp } from "@/lib/utils";
import Link from "next/link";

interface messageProps {
  companion_id: string;
  id: string;
  created_at: string;
}

const SessionCard = async ({ companion_id, id, created_at }: messageProps) => {
  const companion = await getCompanion(companion_id);
  return (
    <Link
      className="no-underline! hover:no-underline active:no-underline shrink-0"
      href={`/my-journey/session/${id}`}
    >
      <div
        className="relative group h-full w-80 rounded border-[3px] border-black shadow-brutal hover:shadow-brutal-hover transition-all overflow-hidden bg-white"
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-2 group-hover:w-full transition-all duration-500 ease-in-out"
          style={{ backgroundColor: companion.subjectData?.color || "#E5D0FF" }}
        />
        <div className="relative z-10 p-5 flex flex-col justify-between" style={{ minHeight: "100%" }}>
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-black truncate text-black">{companion.name}</h2>
            <p className="text-xs text-black/70">Topic: {companion.topic}</p>
          </div>
          <div className="mt-6 flex flex-col gap-2">
            <div className="subject-badge w-fit">{companion.subject}</div>
            <p className="text-xs text-black/70">
              <b>Created At:</b> {formatTimestamp(created_at)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SessionCard;
