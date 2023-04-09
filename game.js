const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [];


 // legge il valore inserito nella combobox numsel di index.html
var a = localStorage.getItem("terValue");
    //alert(a);

 // legge il valore inserito nella combobox numsel di index.html
var x = localStorage.getItem("selValue");
   // alert(x);

// legge il valore inserito nella combobox subjectsel di index.html
var y = localStorage.getItem("secValue");
   // alert(y);

// carica il database per la materia selezionata
var z;
if(y=="AL ENG"){
    z='alen.json';
} else if (y=="AGK ENG"){
    z='agken.json';
} else if (y=="OPS ENG"){
    z='opsen.json';
} else if (y=="HPL ENG"){
    z='hplen.json';
} else if (y=="NAV ENG"){
    z='naven.json';
} else if (y=="MET ENG"){
    z='meten.json';
} else if (y=="FPP ENG"){
    z='fppen.json';
} else if (y=="POF ENG"){
    z='pofen.json';
} else if (y=="COM ENG"){
    z='comen.json';
} 



 fetch(z)
    .then(res => { return res.json();})
    .then(loadedQuestions => {
        questions = loadedQuestions;
       
        startGame();
    })
     .catch(err => {
         console.error(err);
    });




 // legge il valore inserito nella combobox numsel di index.html
// var x = localStorage.getItem("selValue");
// alert(x);



//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = x;


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    
// codice per domande random
    // const questionIndex = Math.floor(Math.random() * availableQuesions.length);
   // fine codice per domande random 
    
// codice per domande in sequenza
    const questionIndex = 0;
    // fine codice per domande in sequenza

    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};
