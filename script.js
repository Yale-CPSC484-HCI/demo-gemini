// adapted from https://github.com/WebDevSimplified/JavaScript-Quiz-App/tree/master

import { GoogleGenerativeAI } from "@google/generative-ai";
//var host = "localhost:4444";
var host = "cpsc484-01.stdusr.yale.internal:8888";
$(document).ready(function() {
  sp2tx.start();
});

var sp2tx = {
  socket: null,

  start: function() {
    var url = "ws://" + host + "/sp2tx";
    sp2tx.socket = new WebSocket(url);
    sp2tx.socket.onmessage = function (event) {
      var text = event.data;
      if (text !== "") {
        if (text!= "You"){
          topic=text;
          console.log("Topic recived: "+topic);
        }
      }
    }
  }
};


const gemini_api_key = 'your api key here';
const genAI = new GoogleGenerativeAI(gemini_api_key);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

const example_qa = `{"question": "Is Gemini intelligent?",
"answers": [
  { "text": "idk :/", "correct": true },
  { "text": "YES!!!", "correct": false },
  { "text": "Um no", "correct": false },
  { "text": "maybe???", "correct": true }
]}`

let shuffledQuestions, currentQuestionIndex
let topic = "Computers"//null

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  waitForTopic()
}

function setNextQuestion() {
  resetState()
  questionElement.innerText = "Generating new question..."
  getQuestionGemini()
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  nextButton.classList.remove('hide')
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function waitForTopic(){
  resetState()
  //questionElement.innerText = "Can you provide me a topic for the game. You can choose any topic you want."
  questionElement.innerText = "Welcome to "+topic+" Trivia!"
  const button = document.createElement('button')
  if (topic!=null){
    console.log("Asking gemini to generate question and answers")
    getQuestionGemini()
  }
}

async function getQuestionGemini(){
  const prompt = "Write a trivia question about "+topic+" questions can have 2 to 4 answers and return like the following example json "+example_qa+" question should be extremely hard to answerß."
  console.log(prompt)

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  const parsed_qa = JSON.parse(text)
  console.log(parsed_qa)
  showQuestion(parsed_qa)
}

const questions = [
  {
    question: 'Is Gemini intelligent?',
    answers: [
      { text: 'idk :/', correct: true },
      { text: 'YES!!!', correct: false },
      { text: 'Um no', correct: false },
      { text: 'maybe???', correct: true }
    ]
  }
]
