import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <main>
      <h1>Popular Companions</h1>
      <section className="home-section">
        <CompanionCard
          id="123"
          name="Sabrina The Brainiac"
          topic="Neural Circuit"
          subject="science"
          duration={45}
          color="#e5d0ff"
        />
        <CompanionCard
        id="456"
          name="Ash The Human Calculator"
          topic="Derivatives & Integrals"
          subject="maths"
          duration={30}
          color="#ffda6e"
           />
        <CompanionCard
        id="789"
          name="Misty the Lexical Treasurer"
          topic="English Literature"
          subject="language"
          duration={30}
          color="#BDE7FF"
           />
      </section>
      <section className="home-section">
        <CompanionsList />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
