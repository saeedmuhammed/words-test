import React, { useEffect, useState } from "react";
import EndPage from "./EndPage";
import axios from "axios";
import { toast } from "react-toastify";

export default function QuizPage() {
  const [isFinished, setIsFinished] = useState(false);
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const [choosenItem, setChoosenItem] = useState(null);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);

  async function getWords() {
    try {
      const { data } = await axios.get("http://localhost:3001/words");
      setWords(data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getWords();
  }, []);

  const handelClick = (e) => {
    setChoosenItem(e.target);
    removeColorFromLi();
    e.target.classList.add("bg-main-color");
    e.target.classList.add("text-white");
  };

  const checkAnswer = (e) => {
    if (choosenItem.dataset.value === words[currentWord]?.pos) {
      setRightAnswer(rightAnswer + 1);
      //alert user that he is right
      choosenItem.classList.add("bg-right-answer");
      toast.success("Right Answer !", { autoClose: 500, theme: "colored" });
    } else {
      setWrongAnswer(wrongAnswer + 1);
      //aletr user that he is wrong
      choosenItem.classList.add("bg-wrong-answer");
      toast.error("Wrong Answer !", { autoClose: 500, theme: "colored" });
    }

    if (currentWord === words.length - 2) {
      e.target.innerText = "Finish";
    }

    if (currentWord === words.length - 1) {
      //make a delay to complete the progress bar and to make sure the score is calculated
      setTimeout(() => {
        setIsFinished(true);
      }, 1000);
    } else {
      setChoosenItem("");
      toggleLiItems();
      setTimeout(() => {
        removeColorFromLi();
        setCurrentWord(currentWord + 1);
        toggleLiItems();
      }, 1500);
    }
  };
  useEffect(() => {
    calculateScore();
    calculateProgress();
  }, [rightAnswer, wrongAnswer]);

  const calculateScore = () => {
    setScore((rightAnswer / words.length) * 100);
  };

  const calculateProgress = () => {
    if (words.length > 0) {
      setProgress(((rightAnswer + wrongAnswer) / words.length) * 100);
    }
  };
  const removeColorFromLi = () => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) =>
      li.classList.remove(
        "bg-main-color",
        "text-white",
        "bg-right-answer",
        "bg-wrong-answer"
      )
    );
  };
  const toggleLiItems = () => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li) => li.classList.toggle("pointer-events-none"));
  };

  return isFinished ? (
    <EndPage score={score} />
  ) : (
    <>
      <div className=" w-full h-4 absolute -top-5 bg-[rgba(232,232,232,255)] rounded-lg overflow-hidden">
        <div
          className="h-full bg-main-color  text-md leading-4 text-white transition-all duration-1000"
          style={{ width: `${progress}%` }}
        >
          {progress.toFixed()}%
        </div>
      </div>
      <h1 className="text-2xl xs:hidden md:block pt-6">
        What is the Part of speech of this word ?
      </h1>
      <h1 className="font-bold mt-5 text-main-color xs:text-4xl xs: md:text-5xl">
        {words[currentWord]?.word}
      </h1>

      <ul className="grid md:grid-cols-2 xs:grid-cols-1 gap-x-20 md:gap-y-10 xs:gap-y-3 w-[70%] m-auto text-lg md:my-20 xs:my-16">
        <li data-value="noun" onClick={handelClick}>
          Noun
        </li>
        <li data-value="verb" onClick={handelClick}>
          Verb
        </li>
        <li data-value="adverb" onClick={handelClick}>
          Adverb
        </li>
        <li data-value="adjective" onClick={handelClick}>
          Adjective
        </li>
      </ul>

      <button
        className="bg-main-color text-white py-3 px-16 rounded-3xl"
        onClick={checkAnswer}
        disabled={!choosenItem}
      >
        Check
      </button>
    </>
  );
}
