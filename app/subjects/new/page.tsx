import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SubjectForm from "@/components/SubjectForm";

const NewSubjectPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="flex flex-col items-center w-full md:w-2/3 lg:w-1/3 mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create a New Subject</h1>
      <SubjectForm />
    </main>
  );
};

export default NewSubjectPage;
