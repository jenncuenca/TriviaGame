$(document).ready(function() {

//QUESTIONS
var examQuestions= [{
        question:"Identify the charm used to levitate an object.",
        answerOptions: ["Alohomora","Wingardium Leviosa", "Levicorpus", "Protego"],
        answer: 1,
        gif:"assets/imgs/gifs/wingardiumleviosa.gif",
    },{
        question:"Name the spell that summons an object to it's caster?",
        answerOptions: ["Alohomora","Levicorpus","Accio","Crucio"],
        answer: 2,
        gif:"assets/imgs/gifs/accio.gif",
    },{
        question:"Lumos creates a small light at the end of your want. Identify the counterspell used to extinguish it.",
        answerOptions:["Noir","Delumos","Evanesco","Nox"],
        answer: 3,
        gif:"assets/imgs/gifs/nox.gif",
        },{
        question:"A muggle has witnessed you doing Magic! What spell could be used to modify and/or erase their memory?",
        answerOptions: ["Obliviate", "Aguamenti", "Accio", "Levicorpus"],
        answer: 0,
        gif:"assets/imgs/gifs/obliviate.gif",
    },{
        question:"What spell would you use to protect yourself against an attack from a Dementor?",
        answerOptions:["Incendio","Protego","Expecto Patronum","Evanesco"],
        answer: 1,
        gif:"assets/imgs/gifs/expectopatronum.gif",
    },{
        question:"When dueling, which spell can be used knock your opponent's wand from their grasp?",
        answerOptions:["Protego","Expulso","Expelliarmus","Imperio"],
        answer: 2,
        gif:"assets/imgs/gifs/expelliarmus.gif",
        },{
        question:"Which of these is NOT one of the 3 Unforgivavle Curses?",
        answerOptions: ["Imperio","Avada Kedavra", "Sectumsempra","Crucio"],
        answer: 2,
        gif:"assets/imgs/gifs/sectumsempra.gif",
        }
    ]; // end of questions

    
var resultMessages = {
    right: "OUTSTANDING! You're correct",
	wrong: "DREADFUL!You're incorrect",
	timeOut: "Times Up!",
	done: "Ordinary Wizarding Level Results"
}

var currentQuestion; // Holds current question
var userChoice;// Holds user's choice
var correctAnswer;
var wrongAnswer;
var answered;
var unanswered;
var seconds;
var time;

// Start Button
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

// Reset Button
$('#restartBtn').on('click', function(){
	$(this).hide();
	newGame();
});

//Everything is cleared for new game to start
function newGame(){
	$('#finalMessage').empty();
	$('#rightAnswers').empty();
	$('#wrongAnswers').empty();
	$('#notAnswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	wrongAnswer = 0;
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
	$('#question').html('<h2>' + examQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(examQuestions[currentQuestion].answerOptions[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('#answerChoices').append(choices);
    }
    
    timer();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userChoice = $(this).data('index');
		clearInterval(time);
		resultsPage();
	});
}

//TIMER
function timer(){
	seconds = 10;
	$('#timer').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//countdown
	time = setInterval(showTimer, 1000);
}

function showTimer(){
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
	$('#question').empty();

	var rightAnswerText = examQuestions[currentQuestion].answerOptions[examQuestions[currentQuestion].answer];
	var rightAnswerIndex = examQuestions[currentQuestion].answer;
	$('#gif').html('<img src="' + examQuestions[currentQuestion].gif + '"/>');
	//checks to see correct, incorrect, or unanswered
	if((userChoice == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(resultMessages.right);
	} else if((userChoice != rightAnswerIndex) && (answered == true)){
		wrongAnswer++;
		$('#message').html(resultMessages.wrong);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(resultMessages.timeOut);
		$('#correctAnswer').html('The correct answer was: ' + rightAnswerText);
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

	$('#finalMessage').html(resultMessages.done);
	$('#rightAnswers').html("Answers Correct: " + correctAnswer);
	$('#wrongAnswers').html("Answers Incorrect: " + wrongAnswer);
	$('#notanswered').html("Not Answered: " + unanswered);
	$('#restartBtn').addClass('reset');
	$('#restartBtn').show();
    $('#restartBtn').html('Retry?');
}

});