import Loader from "@/components/Loader";
import QuizClient from "@/components/QuizClient";
import  { Suspense } from "react";

interface QuizSessionPageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: QuizSessionPageProps) => {
  const { id } = await params;
  return (
    <Suspense fallback={<Loader />}>
      <QuizClient companionId={id} />
    </Suspense>
  );
};

export default page;
