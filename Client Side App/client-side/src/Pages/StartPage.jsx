import React, { useState } from 'react'
import QuizPage from './QuizPage';

export default function StartPage() {
    const [isStarted, setIsStarted] = useState(false);

  return (
    isStarted ? <QuizPage /> :
    <div className="flex flex-col items-center h-full">
          <div className="mt-24">
            <h1 className="text-4xl font-bold">Welcome to the Quiz</h1>
            <p className="my-5 text-2xl">
              You need to decide the part of speech of the words.
            </p>
            <button
              className="bg-main-color text-white py-3 px-16 rounded-3xl mt-28"
              onClick={() => setIsStarted(true)}>
              Start
            </button>
          </div>
        </div>
  )
}
