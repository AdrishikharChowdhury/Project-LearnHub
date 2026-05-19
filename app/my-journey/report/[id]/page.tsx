import React from 'react'
interface QuizReportProps{
    questionsState:QuizQuestion[]
}

const options=["(a)","(b)","(c)","(d)"]

const QuizReport = ({questionsState}:QuizReportProps) => {
  return (
    <main className='flex justify-center w-full flex-col items-center'>
      <h1>Quiz Report</h1>
      {questionsState.map((q)=>(
        <div className="">
            <p>{q.question}</p>
        </div>
      ))}
    </main>
  )
}

export default QuizReport
