import React, { useEffect, useState } from 'react'
import EndPage from './EndPage';
import axios from "axios";


export default function QuizPage() {
    const [isFinished, setIsFinished] = useState(false);
    const [words , setWords] = useState([]);
    const [currentWord , setCurrentWord] = useState(0);
    const [choosenPros , setChoosenPros] = useState("");
    const [rightAnswer , setRightAnswer] = useState(0);
    const [wrongAnswer , setWrongAnswer] = useState(0);
    const [progress , setProgress] = useState(0);
    const [score , setScore] = useState(0);
   

    async function getWords(){

      try {
        const {data} = await axios.get("http://localhost:3001/words");
        setWords(data);
    
      } catch (error) {
          throw error;        
      }
      
    }


  useEffect(()=> {
    getWords();
  },[]);

  const handelClick = (e) => { 
    setChoosenPros(e.target.dataset.value);
    removeColorFromLi();
    e.target.classList.add("bg-main-color");
    e.target.classList.add("text-white");
  }

  const checkAnswer = (e) => {
    if(choosenPros === words[currentWord]?.pos){
      setRightAnswer(rightAnswer + 1);
      console.log("right"); //alert user that he is right
    }
    else{
      setWrongAnswer(wrongAnswer + 1);
      console.log("wrong"); //aletr user that he is wrong
    }
    if(currentWord === words.length - 2){
      e.target.innerText = "Finish";
    }
    if(currentWord === words.length - 1){
      //make a delay to complete the progress bar and to make sure the score is calculated 
      setInterval(() => {
        setIsFinished(true);
      }, 1000 );
    }else{
      removeColorFromLi();
      setChoosenPros("");
      setCurrentWord(currentWord + 1);
    }

   }
   useEffect(() => {
    calculateScore();
    calculateProgress();
  }, [rightAnswer , wrongAnswer]);

   const calculateScore = () => {
      setScore((rightAnswer / words.length) * 100);
   }

   const calculateProgress = () => {
    if (words.length > 0) {
      setProgress(((rightAnswer + wrongAnswer) / words.length) * 100);
    }
   }
   const removeColorFromLi = () => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach((li)=> li.classList.remove("bg-main-color" , "text-white"));
   }

  return (
    isFinished ? <EndPage score={score} /> :
    <>
    <div className=" w-full h-4 absolute -top-5 bg-[rgba(232,232,232,255)] rounded-lg overflow-hidden">
      <div className="h-full bg-main-color  text-md leading-4 text-white transition-all" style={{width:`${progress}%`}}>
        {progress.toFixed()}%
      </div>
    </div>
    <h1 className="text-2xl xs:hidden md:block pt-6">
      What is the Part of speaach of this word ?
    </h1>
    <h1 className="font-bold mt-5 text-main-color xs:text-4xl xs: md:text-5xl">     
      {words[currentWord]?.word}
    </h1>

    <ul className="grid md:grid-cols-2 xs:grid-cols-1 gap-x-20 md:gap-y-10 xs:gap-y-3 w-[70%] m-auto text-lg md:my-20 xs:my-16">
      <li  data-value="noun" onClick={handelClick} className=''>Noun</li>
      <li data-value="verb" onClick={handelClick}>Verb</li>
      <li data-value="adverb" onClick={handelClick}>Adverb</li>
      <li data-value="adjective" onClick={handelClick}>Adjective</li>
    </ul>

    <button
      className="bg-main-color text-white py-3 px-16 rounded-3xl"
      onClick={checkAnswer} disabled={!choosenPros}>
      Next
    </button>
  </>

    )
}
