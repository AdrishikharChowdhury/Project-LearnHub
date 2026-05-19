"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

interface QuestionCardsProps {
  questions: QuizQuestion[];
}

const QuestionCards = ({ questions }: QuestionCardsProps) => {
  const [questionNo, setQuestionNo] = useState(0);
  const [selected, setSelected] = useState("");
  const [questionsState, setQuestionsState] = useState(
    questions.map((q) => ({ ...q, my_answer: 0 })),
  );
  const [submitted, setSubmitted] = useState(false);
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
  const onSubmit = () => {
    setSubmitted(true);
    console.log(questionsState);
  };
  return (
    <div className="flex flex-col w-full min-h-1/2 justify-between border-2 shadow-xl gap-4">
      <div className="w-full p-5 bg-primary text-white font-bold text-2xl">
        Question: {questionNo + 1}/{questions.length}
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
