const questions = [
    {
        question: "What is the capital city of India?",
        answers: [
            { text: 'Mumbai', correct: false },
            { text: 'Kolkata', correct: false },
            { text: 'New Delhi', correct: true },
            { text: 'Chennai', correct: false }
        ]
    },
    {
        question: "Who was the first President of India?",
        answers: [
            { text: 'Dr. Rajendra Prasad', correct: true },
            { text: 'Jawaharlal Nehru', correct: false },
            { text: 'Dr. Sarvepalli Radhakrishnan', correct: false },
            { text: 'Indira Gandhi', correct: false }
        ]
    },
    {
        question: "Which is the longest river in India?",
        answers: [
            { text: 'Ganga', correct: false },
            { text: 'Godavari', correct: false },
            { text: 'Yamuna', correct: false },
            { text: 'Brahmaputra', correct: true }
        ]
    },
    {
        question: "Which Indian city is known as the 'Pink City'?",
        answers: [
            { text: 'Mumbai', correct: false },
            { text: 'Kolkata', correct: false },
            { text: 'Jaipur', correct: true },
            { text: 'Chandigarh', correct: false }
        ]
    }
];


const question = document.querySelector('.question')
const answerbtn = document.querySelector('.answer-btns')
const next = document.querySelector('.next')

let currentQuestionIndex = 0;
let score = 0;

function  startQuiz(){
 currentQuestionIndex = 0;
score = 0;
next.innerHTML = 'Next';
showQuestion();
}
startQuiz()
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    question.innerHTML = questionNo + "." + currentQuestion.question;
  
    currentQuestion.answers.forEach(answer =>{
    let button = document.createElement('button');
    button.classList.add('btn');
    button.innerText = answer.text;
    answerbtn.appendChild(button);

    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer)
   })
}

 function resetState(){
    next.style.display = 'none'; 
    while(answerbtn.firstChild){
        answerbtn.removeChild(answerbtn.firstChild)
    }
}

function selectAnswer(e){
 const selbutton = e.target;
 const isCorrect = selbutton.dataset.correct === "true";

 if(isCorrect){
    selbutton.classList.add("correct")
    score++;
 }
 else{
    selbutton.classList.add("incorrect")
 }
Array.from(answerbtn.children).forEach(button =>{
    if(button.dataset.correct === "true"){
        button.classList.add("correct")
    }
    button.disabled = "true";
});
next.style.display ="block"
}
function showScore(){
    resetState();
    question.innerHTML = `You Scored ${score} Out of ${questions.length}!`;
    next.innerHTML = "Play Again"
    next.style.display ="block";

}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
next.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})