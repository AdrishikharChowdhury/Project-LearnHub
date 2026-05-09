import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const topic = filters.topic ? filters.topic : "";
  const subject = filters.subject ? filters.subject : "";
  const companions = await getAllCompanions({ subject, topic });
  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>Companions Library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {companions.length > 0 &&
          companions.map((companion, idx: number) => (
            <CompanionCard key={idx} {...companion} color={getSubjectColor(companion.subject)} />
          ))}
      </section>
    </main>
  );
};

export default CompanionsLibrary;
