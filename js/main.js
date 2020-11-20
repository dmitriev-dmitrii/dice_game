



let whoChoice = Math.floor(Math.random() * 2);

let player1 = [document.querySelector('.player1__name'),
document.querySelector('.player1__score'),
document.querySelector('.player1__score-raund')];

let player2 = [document.querySelector('.player2__name'),
document.querySelector('.player2__score'),
document.querySelector('.player2__score-raund')] ;


let players = [player1,player2];


const startBtn = document.querySelector('.start__new-game');

const continueBtn = document.querySelector('.continue-game');

const rollDiceScore = document.querySelector('.roll__score');
const rollDiceBtn =document.querySelector('.roll__dice-btn');




let player1Name = 'hero';
let player2Name = 'Illidan';

let player1Score = 0;
let player2Score = 0;

let player1ScoreRaund = 0;
let player2ScoreRaund = 0;


let player1Local;
let player2Local;


startBtn.addEventListener('click',startNewGame);

function startNewGame ()

{
localStorage.clear();
rollDiceScore.classList.remove('hide');
rollDiceBtn.classList.remove('hide');
startBtn.classList.add('hide');
continueBtn.classList.add('hide');
}







rollDiceBtn.addEventListener('click',rollDice);

function rollDice ()

{


let rolledScore = Math.ceil(Math.random() * 6);
rollDiceScore.innerHTML = rolledScore;



if(whoChoice == 0) 
{
	player1Score = player1Score + rolledScore;
	
	players[0].forEach(e => {
		e.classList.add('active__player');
		});

		players[1].forEach(e => {

			e.classList.remove('active__player');

		});
whoChoice = 1;
}
else 
{
	player2Score = player2Score + rolledScore;
	players[1].forEach(e => {
		e.classList.add('active__player');
		});

		players[0].forEach(e => {
			e.classList.remove('active__player');
		});
		whoChoice = 0;
}

if ( player1Score >= 20 )
{
player1ScoreRaund = player1ScoreRaund + 1;
player2Score = 0
player1Score = 0
}
if ( player2Score >= 20 )
{
player2ScoreRaund = player2ScoreRaund + 1;
player2Score = 0
player1Score = 0
}

 player1Local = {
	name: player1Name,
	score: player1Score,
	scoreRaund: player1ScoreRaund
};

 player2Local = {
	name: player2Name,
	score: player2Score,
	scoreRaund: player2ScoreRaund
};

localStorage.setItem ('player1Local', JSON.stringify(player1Local));
player1Local = JSON.parse (localStorage.getItem ('player1Local')); 

localStorage.setItem ('player2Local', JSON.stringify(player2Local));
player2Local = JSON.parse (localStorage.getItem ('player2Local'));

player1[0].innerHTML = player1Local.name;
player2[0].innerHTML = player2Local.name;

player1[1].innerHTML = player1Local.score;
player2[1].innerHTML = player2Local.score;

player1[2].innerHTML = player1Local.scoreRaund;
player2[2].innerHTML = player2Local.scoreRaund;

console.log(player1Local,player2Local);

}



continueBtn.addEventListener('click',continueGame);

function continueGame ()
{
	console.log(player1Local,player2Local);
	player1[0].innerHTML = player1Local.name;
	player2[0].innerHTML = player2Local.name;

	player1[1].innerHTML = player1Local.score;
	player2[1].innerHTML = player2Local.score;
	
	player1[2].innerHTML = player1Local.scoreRaund;
	player2[2].innerHTML = player2Local.scoreRaund;

}


function abc (a , b)
{

return a + b

}

gg = abc ( 5 , 7)

console.log(gg);

