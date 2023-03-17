//Grab all neccesary HTML element for JavaScript interaction
var timerEl=document.getElementById('time')
var questionDis=document.getElementById('question')
var answerEl= document.getElementById('Answers')
var startButton= document.getElementById('start-btn')
var scoreEl= document.getElementById('score')
var scoreKeeperEl=document.getElementById('scoreKeeperEl')
var initialsInput=document.getElementById('inInput')
var sumbitButton=document.getElementById('submit')
let IntervalId
let timerCount
var index= 0
let score= 0

//Create an array of objects that contain properties to be called user interaction
var questions= [
    {
        question: 'What does HTML stand for?',
        answers: [
            {text: 'Hypertext Markup Language', correct: true},
            {text: 'Im not 100% sure', correct: false},
            {text: 'Home Telemark Locator', correct: false},
            {text: 'None of the above', correct:false},
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers:[
            {text: 'Could you repeat the question?', correct:false},
            {text: 'Cascading Style Sheets', correct:true},
            {text: 'Color Size and Scope', correct:false},
            {text: 'Collapsible Style Storage', correct:false},

        ]
    
    },
    {
        question: 'what does the method .appendChild() do?',
        answers:[
            {text: 'I didnt quite catch that part', correct:false},
            {text: 'Adds a child element to the targeted parent', correct:true},
            {text: 'Removes a child element from the trageted parent', correct:false},
            {text: 'Creates an element as the child of the targeted parent', correct:false},
        ]
    
    }
    ,
    {
        question: 'How do you create a timer function?',
        answers:[
            {text: 'setInterval()', correct:true},
            {text: 'Use a stopwatch', correct:false},
            {text: 'intervalSet()', correct:false},
            {text: 'timer.create()', correct:false},
        ]
    
    },
    {
        question: 'Coding is fun',
        answers:[
            {text: 'False', correct:false},
            {text: 'True', correct:true},
        ]
    
    },
    {
        question: 'The DOM refers to a family tree like structure that is used to traverse your CSS page',
        answers:[
            {text: 'True', correct:false},
            {text: 'False', correct:true},
        ]
    
    }
]

//Fisher-Yates algorithm for randomization
//Fisher Yates loops through the array from end to start picks a random item and then switches it with the current iteration
function shuffleQuestions (array) {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const l = array[i];
    array[i] = array[j];
    array[j] = l;
  }
}
shuffleQuestions(questions)
console.log(questions)

startButton.addEventListener('click',startQuiz)

//function to start the quiz
function startQuiz(){
    //changes start button functionality for start button based on innerText
    if (startButton.innerText == 'Try Again'|| startButton.innerText == 'Restart'){
        location.reload() 
     }
     timerCount=60
     //hides the start button on quiz start up
     startButton.classList.add('hide')
     //sets initial timer for the quiz
     timerEl.innerHTML= timerCount + ' seconds left'
     //creates 1 second interval for timer countdown
     IntervalId=setInterval(timer,1000)
     //Create first question
     createQuestions()
}

function timer() {
    if (timerCount > 0)
        timerCount--
        timerEl.classList.remove('wrong')
    timerEl.innerText = timerCount + ' seconds left'
    if(timerCount === 1) {
        timerEl.innerText = timerCount + ' second left'
    }
    //Gameover if timer reaches zero
    // disable all answer buttons and change start button to reload page
    if (timerCount === 0) {
        timerEl.innerText = "Gameover!"
        Array.from(answerEl.children).forEach(button => {
            button.disabled = true
            startButton.innerText = 'Try Again'
            startButton.classList.remove('hide')
        }
        )
    }
} 

function createQuestions(){
    clearDisplay()
displayQuestion(questions[index])
}
//while loop to clear display but removing the first child while there is a first child
function clearDisplay(){
    while (answerEl.firstChild){
        answerEl.removeChild (answerEl.firstChild)
    }
    }

function displayQuestion(questions){
    //changes question section to display a question from the questions array
    //questions refers to the array, question refers to the property assigned to each object
    questionDis.innerText = questions.question
    questions.answers.forEach(answers => {
        //creates a button for each answer available
    const answer =document.createElement('button')
    //set the buttons inner text to the text property within the answers array
    answer.innerText=answers.text
    //style the button to look like other buttons
    answer.classList.add('btn')
    //give the dataset attribute of correct for reference in answer select function
    //only assigning the correct answer
    if (answers.correct){
    answer.dataset.correct = answers.correct
    }
    //add the event listener to each button
    answer.addEventListener('click',selectAnswer)
    //append the button to the answer element
    answerEl.appendChild(answer)
    })
}  

function selectAnswer(event){
    //sets a var for the targeted button
    var chosenAnswer = event.target
    var correct = chosenAnswer.dataset.correct
    //disable all buttons after selection to prevent multiple clicks affecting score
    Array.from(answerEl.children).forEach(answer=> {
        answer.classList.remove('correct')
        answer.classList.remove('wrong')
        answer.disabled = true
})
    // if the target has been assigned the 'correct' data attribute
    //correct answer function adds to user score and displays green for success
    if(correct){
        chosenAnswer.classList.add('correctAns')
        score ++
        localStorage.setItem('score',score)
        score=localStorage.getItem('score',score)
        // if target has not been assigned the 'correct data attribute
        //wrong answer function
    } else {
        chosenAnswer.classList.add('wrongAns')
        timerEl.classList.add('wrong')
        timerCount = timerCount -5
        timerEl.innerText= timerCount + ' seonconds left -5'
        console.log('wrong')
    }
    //if else statement that marks the end of the quiz
    if(questions.length > index +1)
    setTimeout(() =>{
        index++
        createQuestions()
    //timeout is used so that the visual can be seen briefly before the next question displays
    },500)
    else{
        scoreKeeperEl.classList.remove('hide')
        startButton.classList.remove('hide')
        scoreEl.classList.remove('hide')
        timerEl.classList.remove('wrong')
        clearInterval(IntervalId)
        timerEl.innerText = "Congratulations!"
        startButton.innerHTML="Restart"
    }
    var getInt= localStorage.getItem('saved initials',inInput)
    var getScore= localStorage.getItem('saved score',Math.floor((score/questions.length) * 100) + '%')
    scoreDis.innerText= Math.floor((score/questions.length) * 100) + '%'
    if(getInt && getScore){
    lastScore.innerText= getInt + ':'+' ' + getScore
    }
    else {
        lastScore.innerText='Save your score to compare next time!'
    }
}

const scoreKeep = (ev)=>{
    ev.preventDefault()
    localStorage.setItem('saved score',Math.floor((score/questions.length) * 100) + '%')
    inInput=document.getElementById('inInput').value
    localStorage.setItem('saved initials', inInput)
    location.reload()
}
submit.addEventListener('click',scoreKeep)