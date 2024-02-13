const gameElement = document.getElementById('game');
const youScoreElement = document.getElementById('you');
const cpuScoreElement = document.getElementById('cpu');
const attemptsElement = document.getElementById('attempts');
const returnButtonElement = document.getElementById('return-button');
const popUpElement = document.getElementById('pop-up');
const winnerElement = document.getElementById('winner')

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'cross';
let youScore = 0;
let cpuScore = 0;
let attempts = 0;

const checkWinner = () => {
	const winConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (const condition of winConditions) {
		const [a, b, c] = condition;
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			return true;
		}
	}
	return false;
};

const makeMove = index => {
	if (board[index] === '') {
		board[index] = currentPlayer;
		const cell = gameElement.children[index];
		cell.innerHTML = `<img src="../assets/images/${currentPlayer}.svg" alt="${currentPlayer}">`;
		if (checkWinner()) {
			if (currentPlayer === 'cross') {
				youScore++;
				youScoreElement.innerText = youScore;
			} else {
				cpuScore++;
				cpuScoreElement.innerText = cpuScore;
			}
			console.log(currentPlayer + ' wins!');
			popUpElement.classList.add('pop-up-show');
			winnerElement.textContent= `${currentPlayer} wins!`
			endGame();
		} else if (board.every(cell => cell !== '')) {
			attemptsElement.innerText = attempts;
			console.log("It's a tie!");
			popUpElement.classList.add('pop-up-show');
			winnerElement.textContent= `It's a tie!`
			endGame();
		} else {
			currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
			if (currentPlayer === 'circle') {
				setTimeout(() => {
					makeCPUMove();
				}, 500); // Ajustar el tiempo según sea necesario
			}
		}
	}
};

const makeCPUMove = () => {
	const availableMoves = [];
	for (let i = 0; i < board.length; i++) {
		if (board[i] === '') {
			availableMoves.push(i);
		}
	}
	const randomIndex = Math.floor(Math.random() * availableMoves.length);
	const selectedMove = availableMoves[randomIndex];
	makeMove(selectedMove);
};

const endGame = () => {
	attempts++; // Incrementar el número de intentos al finalizar el juego
};

const restart = () => {
	board = ['', '', '', '', '', '', '', '', ''];
	currentPlayer = 'cross';
	for (const cell of gameElement.getElementsByClassName('cell')) {
		cell.innerHTML = '';
	}
};

const handleCellClick = index => {
	return () => {
		makeMove(index);
	};
};

const assignClickEventsToCells = () => {
	for (let i = 0; i < gameElement.children.length; i++) {
		gameElement.children[i].addEventListener('click', handleCellClick(i));
	}
};

const handleReturnButtonClick = () => {
	restart();
	updateAttemptsDisplay(); // Actualizar el número de intentos
	popUpElement.classList.remove('pop-up-show')

};

// Función para actualizar el marcador de intentos
const updateAttemptsDisplay = () => {
	attemptsElement.textContent = attempts;
};
// Llamar a las funciones para asignar los eventos
assignClickEventsToCells();

returnButtonElement.addEventListener('click', handleReturnButtonClick);
