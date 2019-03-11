var triviaQuestions = [{
	question: "Who is the NFL all-time leader in receiving yards?",
	answerList: ["Steve Largent", "Jerry Rice", "Larry Fitzgerald", "Tony Gonzalez"],
	answer: 1
},{
	question: "Who is the all-time scoring leader in NBA history?",
	answerList: ["Kareem Abdul-Jabbar", "Micheal Jordan", "Kobe Bryant", "Wilt Chamberlain"],
	answer: 0
},{
	question: "Which NFL team is the only team to finish a season undefeated(post-season included)?",
    answerList: ["Miami Dolphins", "New England Patriots", "Pittsburgh Steelers", "Dallas Cowboys"],
	answer: 0
},{
	question: "Which NFL player coined the term 'sack'?" ,
	answerList: ["Bruce Smith", "Reggie 'Minister of Defense' White", "Deacon 'the Secretary of Defense' Jones", "Micheal Strahan"],
	answer: 2
},{
	question: "What MLB pitcher has the most career strikeouts?",
	answerList: ["Randy Johnson", "Greg Maddux", "Gaylord Perry", "Nolan Ryan"],
	answer: 3
},{
	question: "As of the end of the 2018 season who was the last pitcher to pitch a perfect game?",
	answerList: ["Felix Hernandez", "Matt Cain", "Max Scherzer", "Clayton Kershsaw"],
	answer: 0
},{
	question: "Who was the first team to a Super Bowl in 1967",
	answerList: ["Kansas City Chiefs", "Green Bay Packers", "Pittsburgh Steelers", "Oakland Raiders"],
	answer: 1
},{
    question: "Which current Hall of Famer and former Chicago Bear was know as the 'Kansas Comet'?",
	answerList: ["Matt Forte", "Walter Payton", "Gale Sayers", "Matt Suhey"],
	answer: 2
},{
	question: "3 of the following players have struck out at least 20 players in a single game, which one has not struck out aleast 20 players?",
	answerList: ["Max Scherzer", "Nolan Ryan", "Kerry Wood", "Roder Clemens"],
	answer: 1
},{
	question: "Which of the following players has the most rushing yards in a single game?",
	answerList: ["Jamal Lewis", "Walter Payton", "OJ Simpson", "Adrian Peterson"],
	answer: 3
},{
	question: "Which NBA has the most Championships?",
	answerList: ["Boston Celtics", "Los Angeles Lakers", "Chicago Bulls", "San Antonio Spurs"],
	answer: 0
},{
	question: "Which former NBA player is the NBA logo designed after",
	answerList: ["'Pisol' Pete Maravich", "Jerry West", "Michael Jordan", "Bob Cousy"],
	answer: 1
},{
	question: "What former college football player was the oldest player to win the Heisman Trophy?",
	answerList: ["Tim Tebow", "Archie Griffin", "Bill Sims", "Chris Weinke"],
	answer: 3
},{
	question: "Who was the first player to hit 70 home runs in a single season?",
	answerList: ["Mark McGwire", "Barry Bonds", "Babe Ruth", "Hank Aaron"],
	answer: 0
},{
	question: "Who was the first the college team to win a Basketball and Football national championship in the same season?",
	answerList: ["Ohio State", "Oklahoma", "Florida", "UCLA"],
	answer: 2
}];

var gifArray = ['question1', 'question2' , 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Yeah... I think thats right.",
	incorrect: "Nah thats just plain wrong",
	endTime: "To Slow!",
	finished: "The results are in!"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}