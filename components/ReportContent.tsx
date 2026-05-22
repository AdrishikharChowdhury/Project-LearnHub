"use client";

import { CheckCheck, X } from "lucide-react";
import { formatTimestamp } from "@/lib/utils";

const alphaOptions = ["(a)", "(b)", "(c)", "(d)"];

interface ReportContent {
  quizData: QuizAttempt;
}

const ReportContent = ({ quizData }: ReportContent) => {
  const companion = Array.isArray(quizData.companions)
    ? quizData.companions[0]
    : quizData.companions;
  return (
    <main className="flex justify-center w-full flex-col items-center">
      <h1>Quiz Report</h1>
      <section className="h-full w-full flex flex-col gap-6">
        <div className="flex w-full h-auto items-center justify-between">
          <h2 className="text-3xl font-bold">Topic: {companion.topic}</h2>
          <div className="h-full flex justify-center items-center gap-4">
            <p className="subject-badge">{companion.subject}</p>
            <p className="text-sm mt-2 flex items-center justify-center gap-2 mb-2">
              <b>Submitted At: </b>{" "}
              <span>{formatTimestamp(quizData.created_at)}</span>
            </p>
          </div>
        </div>
        <hr />
        <div className="w-full h-full flex flex-col gap-6">
          {quizData.questions.map((question, idx: number) => (
            <div key={idx} className="flex w-full flex-col gap-4">
              <p className="text-2xl font-extrabold w-full flex gap-4 items-center">
                <span>
                  {question.my_answer === question.correctAnswer ? (
                    <CheckCheck className="text-green-500 size-10" />
                  ) : (
                    <X className="text-red-500 size-10" />
                  )}
                </span>
                <span>
                  {idx + 1}. {question.question}
                </span>
              </p>
              <ol className="flex flex-col gap-2 w-full">
                {question.options.map((option, optidx: number) => (
                  <li
                    className={`text-xl py-4 border-2 pl-4 rounded-2xl ml-4 w-max min-w-1/2 flex gap-4 ${optidx === question.correctAnswer ? "bg-green-500 text-white" : optidx === question.my_answer && "bg-red-500 text-white"}`}
                    key={optidx}
                  >
                    <span>{alphaOptions[optidx]}</span> <span>{option}</span>
                  </li>
                ))}
              </ol>
              <p className="text-xl py-6 border-2 px-4 ml-4 rounded-2xl w-fit bg-black text-white">
                Explanation: {question.explanation}
              </p>
            </div>
          ))}
        </div>
        <hr />
        <div className="flex justify-between">
          <h2 className="text-2xl flex gap-4">
            <span className="font-extrabold">Correct Answers:</span>{" "}
            <span className="font-extralight">{quizData.correct_answers}</span>
          </h2>
          <h2 className="text-2xl flex gap-4">
            <span className="font-extrabold">Percentage Obtained:</span>
            <span className="font-extralight">{quizData.score}%</span>
          </h2>
        </div>
      </section>
    </main>
  );
};

export default ReportContent;
