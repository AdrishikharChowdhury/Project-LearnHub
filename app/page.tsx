import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { Button } from "@/components/ui/button";
import { recentSessions } from "@/constants";

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="home-section">
        <CompanionCard
          id="123"
          name="Alakazam the Mind Scholar"
          topic="Neural Network of the Brain"
          subject="science"
          duration={45}
          color="#e5d0ff"
        />
        <CompanionCard
        id="456"
          name="Abra the Math Wizard"
          topic="Derivatives & Integrals"
          subject="maths"
          duration={30}
          color="#ffda6e"
           />
        <CompanionCard
        id="789"
          name="Chatot the Word Whistler"
          topic="English Literature"
          subject="language"
          duration={30}
          color="#BDE7FF"
           />
      </section>
      <section className="home-section">
        <CompanionsList title="Recently completed sessions" companions={recentSessions} classNames="w-2/3 max-lg:w-full" />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
