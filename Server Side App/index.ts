import { Request, Response } from 'express';
import express = require("express");



const { wordList, scoresList } = require('./TestData.json');
const app = express();
const PORT = 3000;

//type for the word object
type word = {
    id: number,
    word: string,
    pos: string,
  };  

//resopnse for parsing the JSON data in the request body
app.use(express.json());

app.get('/words', (req: Request, res: Response) => {
  const selectedWords:word[] = selectRandomWords(wordList, 10);
  res.json(selectedWords);
});

app.post('/rank', (req: Request, res: Response) => {
  const { score } = req.body;
  const rank : string = calculateRank(score);
  res.json({ rank });
});



function selectRandomWords(words:word[] , count:number):word[]{
    
    //Initialize a set to make the random words unique
    const finalWords = new Set<word>();
    const types : string [] = ['adjective' , 'adverb' , 'noun' , 'verb'];

    //shuffle the types array to make the words random cuz the words were alway starting with the same types
    shuffleArray(types);

    //Loop for each type and select a random word of that type
    types.forEach((type:string) =>{
          const selectedWords: word[] = words.filter((word)=> word.pos === type);
          const randomTypeIndex : number =Math.floor(Math.random()*selectedWords.length);
          finalWords.add(selectedWords[randomTypeIndex]);  
    });

    //complete the rest of the words randomly
    while(finalWords.size < count){
        const randomIndex : number = Math.floor(Math.random()*words.length);
        finalWords.add(words[randomIndex]);
    }
    //convert the set to an array
    const finalWordsArray: word[] = Array.from(finalWords);
    
    return finalWordsArray;
}




// Function to calculate the rank percentage

function calculateRank(score: number): string {
  const lowerScores = scoresList.filter((s:number) => s < score);
  const rankPercentage = (lowerScores.length / scoresList.length) * 100;

  // Trim the rank percentage to 2 decimal places if it float if not retun it as a decimal then convert it to string
  const trimmedNumber = parseFloat(rankPercentage.toFixed(2)).toString();
  return trimmedNumber ;
}


function shuffleArray(array:string[]):void{
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
