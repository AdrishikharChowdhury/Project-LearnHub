"use client";

import { CheckCheck, X } from "lucide-react";
import { formatTimestamp } from "@/lib/utils";
import dynamic from "next/dynamic";

const DownloadPDFButton = dynamic(() => import("./DownloadPDFButton"), {
  ssr: false,
});

const alphaOptions = ["(a)", "(b)", "(c)", "(d)"];

interface ReportContentProps {
  quizData: QuizAttempt;
  cooldownEnd?: string;
}

const ReportContent = ({ quizData, cooldownEnd }: ReportContentProps) => {
  const companion = Array.isArray(quizData.companions)
    ? quizData.companions[0]
    : quizData.companions;
  return (
    
    <main className="flex justify-center w-full flex-col items-center">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
        <h1>Quiz Report</h1>
        <DownloadPDFButton quizData={quizData} />
      </div>
      <section className="h-full w-full flex flex-col gap-6 mt-4">
        <div className="flex flex-col md:flex-row w-full h-auto items-start md:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Topic: {companion.topic}</h2>
          <div className="flex flex-wrap items-center gap-4">
            <p className="subject-badge">{companion.subject}</p>
            <p className="text-sm flex items-center gap-2">
              <b>Submitted At: </b>{" "}
              <span>{formatTimestamp(quizData.created_at)}</span>
            </p>
          </div>
        </div>
        <hr />
        <div className="w-full h-full flex flex-col gap-6">
          {quizData.questions.map((question, idx: number) => (
            <div key={idx} className="flex w-full flex-col gap-4">
              <p className="text-xl sm:text-2xl font-extrabold w-full flex gap-3 items-start">
                <span className="flex-shrink-0 mt-1">
                  {question.my_answer === question.correctAnswer ? (
                    <CheckCheck className="text-green-500 size-7 sm:size-8" />
                  ) : (
                    <X className="text-red-500 size-7 sm:size-8" />
                  )}
                </span>
                <span>
                  {idx + 1}. {question.question}
                </span>
              </p>
              <ol className="flex flex-col gap-2 w-full">
                {question.options.map((option, optidx: number) => (
                  <li
                    className={`text-base sm:text-lg py-3 px-4 border-[3px] border-black rounded ml-0 sm:ml-4 w-full flex gap-3 ${
                      optidx === question.correctAnswer
                        ? "bg-green-500 border-green-500 text-white"
                        : optidx === question.my_answer
                        ? "bg-red-500 border-red-500 text-white"
                        : "bg-white text-black"
                    }`}
                    key={optidx}
                  >
                    <span className="font-bold flex-shrink-0">{alphaOptions[optidx]}</span>
                    <span>{option}</span>
                  </li>
                ))}
              </ol>
              <p className="text-sm sm:text-base py-4 px-5 border-[3px] border-black ml-0 sm:ml-4 rounded w-full bg-black text-white leading-relaxed">
                <b>Explanation:</b> {question.explanation}
              </p>
            </div>
          ))}
        </div>
        <hr />
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-2">
          <h2 className="text-xl sm:text-2xl flex gap-2 justify-between sm:justify-start">
            <span className="font-extrabold">Correct Answers:</span>{" "}
            <span className="font-extralight">{quizData.correct_answers}</span>
          </h2>
          <h2 className="text-xl sm:text-2xl flex gap-2 justify-between sm:justify-start">
            <span className="font-extrabold">Percentage Obtained:</span>
            <span className="font-extralight">{quizData.score}%</span>
          </h2>
        </div>
        {cooldownEnd && (
          <p className="text-center text-muted-foreground mt-8">
            Next quiz available after{" "}
            <span className="font-semibold">
              {new Date(cooldownEnd).toLocaleString()}
            </span>
          </p>
        )}
      </section>
    </main>
  );
};

export default ReportContent;
