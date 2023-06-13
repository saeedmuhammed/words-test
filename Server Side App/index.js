"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var _a = require('./TestData.json'), wordList = _a.wordList, scoresList = _a.scoresList;
var app = express();
var PORT = 3001;
//To allow API accepts requests from localhost 
var cors = require('cors');
app.use(cors());
//resopnse for parsing the JSON data in the request body
app.use(express.json());
app.get('/words', function (req, res) {
    var selectedWords = selectRandomWords(wordList, 10);
    res.json(selectedWords);
});
app.post('/rank', function (req, res) {
    var score = req.body.score;
    var rank = calculateRank(score);
    res.json({ rank: rank });
});
function selectRandomWords(words, count) {
    //Initialize a set to make the random words unique
    var finalWords = new Set();
    var types = ['adjective', 'adverb', 'noun', 'verb'];
    //shuffle the types array to make the words random cuz the words were alway starting with the same types
    shuffleArray(types);
    //Loop for each type and select a random word of that type
    types.forEach(function (type) {
        var selectedWords = words.filter(function (word) { return word.pos === type; });
        var randomTypeIndex = Math.floor(Math.random() * selectedWords.length);
        finalWords.add(selectedWords[randomTypeIndex]);
    });
    //complete the rest of the words randomly
    while (finalWords.size < count) {
        var randomIndex = Math.floor(Math.random() * words.length);
        finalWords.add(words[randomIndex]);
    }
    //convert the set to an array
    var finalWordsArray = Array.from(finalWords);
    return finalWordsArray;
}
// Function to calculate the rank percentage
function calculateRank(score) {
    var lowerScores = scoresList.filter(function (s) { return s < score; });
    var rankPercentage = (lowerScores.length / scoresList.length) * 100;
    // Trim the rank percentage to 2 decimal places if it float if not retun it as a decimal then convert it to string
    var trimmedNumber = parseFloat(rankPercentage.toFixed(2)).toString();
    return trimmedNumber;
}
function shuffleArray(array) {
    var _a;
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [array[j], array[i]], array[i] = _a[0], array[j] = _a[1];
    }
}
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
