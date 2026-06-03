import CompanionComponent from "@/components/CompanionComponent";
import { getCompanion } from "@/lib/actions/companion.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();
  const { name, subject, topic, title, duration, subjectData }=companion

  if (!user) redirect("/sign-in");
  if (!name) redirect("/companions");
  return (
    <main className="w-full">
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="flex size-18 items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: subjectData?.color || "#E5D0FF" }}
          >
            <img
              src={subjectData?.icon_url || `/icons/${subject}.svg`}
              alt="subject"
              width={35}
              height={35}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{name}</p>
              <div className="subject-badge max--sm:hidden">{subject}</div>
            </div>
            <p className="text-lg">Topic: {topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
          {duration} minutes
        </div>
      </article>
      <CompanionComponent {...companion} userName={user.firstName!} userImage={user.imageUrl} companionId={id} />
    </main>
  );
};

export default CompanionSession;
