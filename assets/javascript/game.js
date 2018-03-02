$(document).ready(function() {

//game variables
var examQuestions= [{
        question:"What spell is used to levitate objects?",
        answerOptions: ["Alohomora","Wingardium Leviosa", "Levicorpus", "Protego"],
        answer: 1
    },{
        question:"What spell would you use to summon an object to you?",
        answerOptions: ["Alohomora","Levicorpus","Accio","Crucio"],
        answer: 2
    },{
        question:"What is the counterspell for Lumos?",
        answerOptions:["Noir","Delumos","Evanesco","Nox"],
        answer: 3
        },{
        question:"What spell could be used to erase memories from an individual's mind?",
        answerOptions: ["Obliviate", "Aguamenti", "Accio", "Levicorpus"],
        answer: 0
    },{
        question:"What spell would you use to protect yourself against Dementors?",
        answerOptions:["Incendio","Protego","Expecto Patronum","Evanesco"],
        answer: 1
    },{
        question:"What spell can be used to disarm an attacker?",
        answerOptions:["Protego","Expulso","Expelliarmus","Imperio"],
        answer: 2
        },{
        question:"What spell is not one of the 3 Unforgivavle Curses?",
        answerOptions: ["Imperio","Avada Kedavra", "Sectumsempra","Crucio"],
        answer: 2
        }
    ]; // end of questions array

var gifs=[];

var resultMessages = {
    right: "OUTSTANDING! You're correct",
	wrong: "WRONG!",
	timeOut: "Times Up!",
	done: "See Your Score"
}

var currentQuestion; // Holds current question
var answered;
var userChoice;// Holds user's choice
var correctAnswers;
var wrongAnswers;
var unanswered;
var seconds;
var time;

// Start Button
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

// Reset Button
$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

//New Game is Generated
function newGame(){
	$('#finalMessage').empty();
	$('#rightAnswers').empty();
	$('#wrongAnswers').empty();
	$('#notAnswered').empty();
	currentQuestion = 0;
	correctAnswers = 0;
	wrongAnswers = 0;
	unanswered = 0;
	newQuestion();
}

//Question is generated
function newQuestion(){
	$('#message').empty();
	$('#correctAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+examQuestions.length);
	$('.question').html('<h2>' + examQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(examQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
    }
    
	timer();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		resultsPage();
	});
}

//TIMER
function timer(){
	seconds = 15;
	$('#timer').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//countdown
	time = setInterval(showTimer, 1000);
}

function displayTimer(){
	seconds--;
	$('#timer').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		resultsPage(); //switch to answer page
	}
}

//Quiz Results
function resultsPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = examQuestions[currentQuestion].answerList[examQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userChoice == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userChoice != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (examQuestions.length-1)){
		setTimeout(scores, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scores(){
	$('#timer').empty();
	$('#message').empty();
	$('#correctAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#rightAnswers').html("Answers Corect: " + correctAnswer);
	$('#incorrectAnswers').html("Answers Incorrect: " + incorrectAnswer);
	$('#notanswered').html("Not Answered: " + unanswered);
	$('#restartBtn').addClass('reset');
	$('#restartBtn').show();
	$('#restartBtn').html('Retry?');
}

});