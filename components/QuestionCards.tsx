"use client";

import { saveQuizAttempt } from "@/lib/actions/quiz.action";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface QuestionCardsProps {
  questions: QuizQuestion[];
  companionId:string
}

const TIMER_MINUTES = 10;

const QuestionCards = ({ questions,companionId }: QuestionCardsProps) => {
  const [questionNo, setQuestionNo] = useState(0);
  const [selected, setSelected] = useState("");
  const [questionsState, setQuestionsState] = useState(
    questions.map((q) => ({ ...q, my_answer: 0 })),
  );
  const [timeLeft, setTimeLeft] = useState(TIMER_MINUTES * 60);
  const submittedRef = useRef(false);

  const submitQuiz = async (finalState: typeof questionsState) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    const correctAnswers = finalState.filter(
      (q) => q.correctAnswer === q.my_answer,
    );
    const score = Math.round((correctAnswers.length / questions.length) * 100);
    await saveQuizAttempt(
      companionId,
      finalState,
      score,
      questions.length,
      correctAnswers.length,
    );
    redirect("/my-journey");
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      submitQuiz(questionsState);
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const nextQuestion = () => {
    setQuestionNo((q) => q + 1);
    setSelected("");
    setQuestionsState((prev) =>
      prev.map((q, i) =>
        i === questionNo ? { ...q, my_answer: Number(selected) } : q,
      ),
    );
  };
  const prevQuestion = () => {
    setQuestionNo((q) => q - 1);
  };
  const onSubmit = () => submitQuiz(questionsState);
  return (
    <div className="flex flex-col w-full min-h-1/2 justify-between border-2 shadow-xl gap-4">
      <div className="w-full p-5 bg-primary text-white font-bold text-2xl flex justify-between items-center">
        <span>Question: {questionNo + 1}/{questions.length}</span>
        <span className={`font-mono ${timeLeft <= 60 ? "text-red-300 animate-pulse" : ""}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      <div className="px-16 shrink-0 flex flex-col gap-6">
        <p className="text-3xl font-extrabold">
          {questions[questionNo].question}
        </p>
        <div className="flex flex-col gap-4">
          {questions[questionNo].options.map((option, optidx: number) => (
            <p className="text-xl flex gap-3 items-center" key={optidx}>
              <span className="w-10">
                {questionNo + 1}.{optidx + 1}.
              </span>
              <input
                type="radio"
                value={optidx}
                checked={selected === String(optidx)}
                onChange={() => setSelected(String(optidx))}
                name={`q_${questionNo}`}
                id={`option_${questionNo}_${optidx}`}
              />
              <label htmlFor={`option_${questionNo}_${optidx}`}>{option}</label>
            </p>
          ))}
        </div>
        <button onClick={() => setSelected("")} className="self-end">
          Clear Selection
        </button>
      </div>
      <div className="text-white w-full p-5 bg-primary flex justify-center items-center gap-6 text-lg">
        <button
          className={`w-1/6 text-center btn-disabled flex justify-center ${questionNo === 0 && "hidden"} `}
          onClick={prevQuestion}
        >
          <ArrowLeft /> Previous
        </button>
        <button
          onClick={onSubmit}
          className={`w-1/6 text-center btn-disabled flex justify-center ${questionNo !== questions.length - 1 && "hidden"} `}
        >
          Submit
        </button>
        <button
          onClick={nextQuestion}
          className={`w-1/6 text-center btn-disabled flex justify-center ${questionNo === questions.length - 1 && "hidden"} `}
        >
          Next <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default QuestionCards;
