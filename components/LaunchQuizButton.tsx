"use client";
import Link from "next/link";

interface QuizButtonProps {
  isQuiz: boolean;
  id: string;
}

const LaunchQuizButton = ({ isQuiz, id }: QuizButtonProps) => {
  return (
    <button className={` w-full justify-center ${isQuiz?"btn-primary":"btn-disabled"} `}>
      {isQuiz ? (
        <Link href={`/quiz/${id}`} className="w-full">
          Start Quiz
        </Link>
      ) : (
        <p>Not Enough Sessions</p>
      )}
    </button>
  );
};

export default LaunchQuizButton;
