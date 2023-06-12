import { useState } from "react";
import "./App.css";
import ribbon from "./quality.png";
function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  return (
    <div className="w-3/4 m-auto h-[500px] box-border block text-center mt-28 card relative rounded-lg shadow-2xl">
      {isStarted ? (
        <>
          {isFinished ? (
            <div className="m-auto pt-5">
              <div>
                <img src={ribbon} alt="" className="w-48 m-auto" />
                <h1 className="font-bold text-4xl mb-5"> Your Rank is </h1>
                <span className="block text-4xl mb-20"> 80 </span>
                <button className="bg-[rgba(0,77,137,255)] text-white py-3 px-16 rounded-3xl">
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className=" w-full h-4 absolute -top-5 bg-[rgba(240,240,240,255)] rounded-lg overflow-hidden">
                <div className="h-full w-1/2 bg-[rgba(0,77,137,255)]  text-md leading-4 text-white">
                  50%
                </div>
              </div>
              <h1 className="text-2xl pt-6">
                What is the Part of speaach of this word ?
              </h1>
              <h1 className="font-bold text-5xl mt-5 text-[rgba(0,77,137,255)]">     
                Animal
              </h1>

              <ul class="grid grid-cols-2 gap-x-20 gap-y-10 w-[70%] m-auto text-lg my-20">
                <li>Noun</li>
                <li>Verb</li>
                <li>Adverb</li>
                <li>Adjective</li>
              </ul>

              <button
                className="bg-[rgba(0,77,137,255)] text-white py-3 px-16 rounded-3xl"
                onClick={() => setIsFinished(true)}>
                Next
              </button>
            </>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center h-full">
          <div className="mt-24">
            <h1 className="text-4xl font-bold">Welcome to the Quiz</h1>
            <p className="my-5 text-2xl">
              {" "}
              You need to decide the part of speech of the words{" "}
            </p>
            <button
              className="bg-[rgba(0,77,137,255)] text-white py-3 px-16 rounded-3xl mt-28"
              onClick={() => setIsStarted(true)}>
              Start
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
