import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.action";
import Link from "next/link";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const topic = filters.topic ? filters.topic : "";
  const subject = filters.subject ? filters.subject : "";
  const companions = await getAllCompanions({ subject, topic });
  return (
    <main className="w-full">
      <section className="flex justify-between gap-4 max-sm:flex-col w-full">
        <h1>Companions Library</h1>
        <div className="flex gap-4 items-center max-sm:flex-col">
          <div className="flex gap-2">
            <Link href="/companions/new" className="btn-primary text-sm whitespace-nowrap">
              Create Companion
            </Link>
            <Link href="/subjects/new" className="btn-primary text-sm whitespace-nowrap">
              + Add Subject
            </Link>
          </div>
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {companions.length > 0 ?
          companions.map((companion, idx: number) => (
            <CompanionCard key={idx} {...companion} />
          )):<p className="ml-2 font-extralight text-gray-500">No Companions Have been created Yet</p>}
      </section>
    </main>
  );
};

export default CompanionsLibrary;
