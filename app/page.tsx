import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";
import { getAllCompanions } from "@/lib/actions/companion.action";

const Page = async () => {
  const companions = await getAllCompanions({});
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="home-section overflow-scroll no-scrollbar justify-start">
        {companions.length > 0
          ? companions.map((companion, idx: number) => (
              <CompanionCard key={idx} {...companion} />
            ))
          : recentSessions.map((companion, idx: number) => (
              <CompanionCard key={idx} {...companion} />
            ))}
      </section>
      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={companions.length < 0 ? recentSessions : companions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
