import CompanionQuizCard from "@/components/CompanionQuizCard";
import { getUserCompanions } from "@/lib/actions/companion.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  return (
    <main>
      <h1>Quizzes Section</h1>
      <section className="companions-grid">
        {companions.map((companion,idx:number) => (
          <CompanionQuizCard key={idx} {...companion} />
        ))}
      </section>
    </main>
  );
};

export default page;
