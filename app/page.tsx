import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { getAllCompanions, getRecentSessions, getUserSessions } from "@/lib/actions/companion.action";

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions=await getRecentSessions(10)
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="home-section overflow-scroll no-scrollbar justify-start">
        {companions.length > 0
          ? companions.map((companion, idx: number) => (
              <CompanionCard key={idx} {...companion} />
            ))
          : <p className="ml-2 font-extralight text-gray-500">No Companions Have been created Yet</p>}
      </section>
      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
