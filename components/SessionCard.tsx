import { getCompanion } from "@/lib/actions/companion.action";
import { formatTimestamp, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface messageProps {
  companion_id: string;
  id: string;
  created_at: string;
}

const SessionCard = async ({ companion_id, id, created_at }: messageProps) => {
  const companion = await getCompanion(companion_id);
  return (
    <Link
      className="no-underline! hover:no-underline active:no-underline"
      href={`/my-journey/session/${id}`}
    >
      <div
        className="h-full w-80 rounded-4xl border-2 bg-yellow-400 p-5 flex flex-col justify-between"
        style={{ backgroundColor: getSubjectColor(companion.subject) }}
      >
        <h2 className="text-xl font-bold">{companion.name}</h2>
        <p className="text-sm mt-2">Topic: {companion.topic}</p>
        <div className="subject-badge w-max mt-10">{companion.subject}</div>
        <p className="text-sm mt-2">
          <b>Created At:</b> {formatTimestamp(created_at)}
        </p>
      </div>
    </Link>
  );
};

export default SessionCard;
