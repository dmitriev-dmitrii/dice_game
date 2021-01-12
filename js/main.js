"use strict";

let player1 = {    
	name: "", 
	score: 0,
	raundScore: 0,
};

let player2 = {    
	name: "", 
	score: 0,
	raundScore: 0,
};

let players = [player1,player2]

let grid =  document.querySelector('.grid-container');


let dicesHtml = 
[
	document.querySelector('.dice1'),document.querySelector('.dice2')
]

let comments =  document.querySelector('.comments');

let player1Html = [
	document.querySelector('.player1__name'),
	document.querySelector('.player1__score'),
	document.querySelector('.player1__raund-score'),
	document.querySelector('.player1__roll'),
];
let player2Html = [
	document.querySelector('.player2__name'),
	document.querySelector('.player2__score'),
	document.querySelector('.player2__raund-score'),
	document.querySelector('.player2__roll'),
];

let whoChoiceMessage = document.querySelector('.who-choice__message');
let whoChoice;

function updateHtmllInfo() {
	player1Html[0].innerHTML=players[0].name;
	player2Html[0].innerHTML=players[1].name;


	setTimeout(() => {


		player1Html[1].innerHTML=players[0].score + '/24';
		player1Html[2].innerHTML=' '+ players[0].raundScore;
	

		player2Html[1].innerHTML=players[1].score + '/24';
		player2Html[2].innerHTML=' '+ players[1].raundScore;

	}, 3000);




}




function getMinMaxRandom(min, max)
{
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min)) + min;
} 

const rollDiceBtn = document.querySelector('.roll-dice__btn');
rollDiceBtn.addEventListener('click',rollDice );

const  saveGameBtn = document.getElementById('save__game');
saveGameBtn.setAttribute("disabled", true);

saveGameBtn.addEventListener('click',(saveLocalInfo,checkLocalInfo,stopGame));

function stopGame() {
	rollDiceBtn.setAttribute("disabled", true);
	saveGameBtn.setAttribute("disabled", true);
	resumeGameBtn.removeAttribute("disabled");
}

function saveLocalInfo() {

localStorage.setItem("player1Name",players[0].name);
localStorage.setItem("player1Score",players[0].score);
localStorage.setItem("player1ScoreRaund",players[0].raundScore);

localStorage.setItem("player2Name",players[1].name);
localStorage.setItem("player2Score",players[1].score);
localStorage.setItem("player2ScoreRaund",players[1].raundScore);

localStorage.setItem("whoChoiceLocal",whoChoice);
}



const resumeGameBtn = document.getElementById('resume__game');

function checkLocalInfo() {
	if (localStorage.length > 0) 
{
resumeGameBtn.removeAttribute("disabled");

}
else{

resumeGameBtn.setAttribute("disabled", true);
};
}
checkLocalInfo();

resumeGameBtn.addEventListener('click',resumeGame );


function resumeGame() 
{

players[0].name = localStorage.getItem("player1Name");
players[0].score = Number(localStorage.getItem("player1Score"));
players[0].raundScore = Number(localStorage.getItem("player1ScoreRaund"));

players[1].name = localStorage.getItem("player2Name");
players[1].score = Number(localStorage.getItem("player2Score"));
players[1].raundScore = Number(localStorage.getItem("player2ScoreRaund"));

whoChoice = Number(localStorage.getItem("whoChoiceLocal"));

rollDiceBtn.removeAttribute("disabled");
resumeGameBtn.setAttribute("disabled", true);


	if (whoChoice == 0) {
		whoChoiceMessage.innerHTML = players[1].name;
	} 
	else {
		whoChoiceMessage.innerHTML = players[0].name;
	} 
	
	updateHtmllInfo();


}




function randomNames() {
	let names1 = [
		'секси','золотой','mr.','опасный','четкий','(не спать)','уже можно','мне пора','не сегодня','красавчик','красавелла','Чебоксарский','гордый','(не пою)','supeRRR','умный ','The best','злой','мудрый','картавый'
	]
	let names2 = [
		'терминатор','везунчик','вонючка','убийца','кукиш','петрович','владимир','гоншык','шпунтик','кукиш'+getMinMaxRandom(2 , 99),'мурзик','крокодил99','поршень','кукиш'+getMinMaxRandom(2 , 99),'саня','фараон','незнайка','эдуард','коммунист','цветочек'
	]

	let name =names1[getMinMaxRandom(0 , names1.length)] +' '+ names2[getMinMaxRandom(0 , names2.length)];

	function capitalize(str) {

		return str.replace(/(^|\s)\S/g, function(a) {return a.toUpperCase()})
	   
	   }

	return capitalize(name);
}

const newGameBtn = document.getElementById('new__game');
newGameBtn.addEventListener('click',newGame);

function newGame() 
{
	localStorage.clear();

	resumeGameBtn.setAttribute("disabled", true);
saveGameBtn.setAttribute("disabled", true);
	rollDiceBtn.removeAttribute("disabled");

players.forEach(e => {
	e.score=0;
	e.raundScore=0;
});



	player1.name = randomNames();
	player2.name = randomNames();


	whoChoice = getMinMaxRandom(0,players.length);
	updateHtmllInfo();

}


function raundScores(whoWin) 
{
if (players[whoChoice].score  >= 24) 
{

whoWin = whoWin + 1;

players[whoChoice].raundScore=whoWin;



players.forEach(e => {
	e.score=0;
});
} 
}

function buildComment(player,dice1,dice2) 
{
setTimeout(() => {
	comments.innerHTML =(' "'+ player.name + '" выбрасывает ' + (dice1+dice2) +' !' );
},3000);


}

function rollDice() 
{
	
if (whoChoice == 0) {
	whoChoiceMessage.innerHTML = players[whoChoice].name;
	whoChoice = 1;
} 
else {
	whoChoiceMessage.innerHTML = players[whoChoice].name;
	whoChoice = 0;
} 

let dice1= getMinMaxRandom( 1,7);
let dice2= getMinMaxRandom( 1,7);



	switch (dice1) {
		case 1:
			dicesHtml[0].style.cssText = `
		transform: rotateX(36`+(getMinMaxRandom( 1,8))+`deg) rotateZ(350deg);
		animation: rolled_`+(getMinMaxRandom( 1,7))+` linear 3s;
		`;
			break;

		case 2:
			dicesHtml[0].style.cssText = `
			transform: rotateX(90deg) rotateY(18`+(getMinMaxRandom( 1,8))+`deg) rotateX(9`+(getMinMaxRandom( 1,8))+`deg);
			animation: rolled_`+(getMinMaxRandom( 1,7))+` linear 3s;
			`;
			break;
		case 3:
			dicesHtml[0].style.cssText = `
			transform: rotateY(110deg) rotateZ(-1`+(getMinMaxRandom( 1,8))+`deg);
			animation: rolled_`+(getMinMaxRandom( 1,7))+` linear 3s;
				`;
			break;
		case 4:
			dicesHtml[0].style.cssText = `
			transform: rotateX(160deg) rotateY(80deg) rotateX(180deg);
			animation: rolled_`+(getMinMaxRandom( 1,7))+` linear 3s;
					`;
			break;
		case 5:
			dicesHtml[0].style.cssText = `
			transform: rotateX(17`+(getMinMaxRandom( 1,8))+`deg) rotateY(`+(getMinMaxRandom( 1,8))+`deg) rotateX(100deg);
			animation: rolled_`+(getMinMaxRandom( 1,7))+` linear 3s;
						`;
			break;
		case 6:
			dicesHtml[0].style.cssText = `
			transform: rotateX(80deg) rotateY(1`+(getMinMaxRandom( 1,5))+`deg) ;
			animation: rolled_`+(getMinMaxRandom( 1,7))+` linear 3s;
							`;
			break;
	}

	switch (dice2) {
		case 1:
			dicesHtml[1].style.cssText = `
		transform: rotateX(350deg) rotateZ(35`+(getMinMaxRandom( 1,8))+`deg);
		animation: rolled_`+(getMinMaxRandom( 1,7))+` linear 3s;
		`;
			break;

		case 2:
			dicesHtml[1].style.cssText = `
			transform: rotateX(90deg) rotateY(18`+(getMinMaxRandom( 1,8))+`deg) rotateX(9`+(getMinMaxRandom( 1,8))+`deg);
			animation: rolled_`+(getMinMaxRandom( 1,7))+` linear 3s;
			`;
			break;
		case 3:
			dicesHtml[1].style.cssText = `
			transform: rotateY(11`+(getMinMaxRandom( 1,8))+`deg) rotateZ(-10deg);
			animation: rolled_`+(getMinMaxRandom( 1,7))+` linear 3s;
				`;
			break;
		case 4:
			dicesHtml[1].style.cssText = `
			transform: rotateX(16`+(getMinMaxRandom( 1,8))+`deg) rotateY(7`+(getMinMaxRandom( 1,8))+`deg) rotateX(18`+(getMinMaxRandom( 1,8))+`deg);
			animation: rolled_`+(getMinMaxRandom( 1,7))+` linear 3s;
					`;
			break;
		case 5:
			dicesHtml[1].style.cssText = `
			transform: rotateX(17`+(getMinMaxRandom( 1,8))+`deg) rotateY(1`+(getMinMaxRandom( 1,8))+`deg) rotateX(10`+(getMinMaxRandom( 1,8))+`deg);
			animation: rolled_`+(getMinMaxRandom( 1,7))+` linear 3s;
						`;
			break;
		case 6:
			dicesHtml[1].style.cssText = `
			transform: rotateX(6`+(getMinMaxRandom( 1,8))+`deg) rotateY(1`+(getMinMaxRandom( 1,8))+`deg) ;
			animation: rolled_`+(getMinMaxRandom( 1,7))+` linear 3s;
							`;
			break;
		default:
			break;
	}


players[whoChoice].score = players[whoChoice].score + dice1 + dice2;

buildComment(players[whoChoice],dice1,dice2 );

raundScores(players[whoChoice].raundScore);

saveGameBtn.removeAttribute("disabled");
saveLocalInfo();
updateHtmllInfo();

rollDiceBtn.setAttribute("disabled", true);


grid.classList.add('shake')
setTimeout(() => {

	rollDiceBtn.removeAttribute("disabled");
	grid.classList.remove('shake');

},3000);
}