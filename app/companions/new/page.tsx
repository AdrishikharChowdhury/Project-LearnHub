import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermission } from "@/lib/actions/companion.action";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const canCreateCompanion = await newCompanionPermission();

  return (
    <main className="flex flex-col items-center justify-center w-full md:w-2/3 lg:w-1/3 mx-auto px-4">
      {canCreateCompanion ? (
        <article className="w-full gap-4 flex flex-col">
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit w-full" >
          <Image src="/images/limit.svg" alt="limit-reached" width={360} height={230} />
          <div className="cta-badge">
            Upgrade Your Plan
          </div>
          <h1>You've Reached Your Limit</h1>
          <p>You've reached your companion limit. Upgrade to create more companions and premium features.</p>
          <Link href='/subscription' className="btn-primary w-full justify-center" >Upgrade My Plan</Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
