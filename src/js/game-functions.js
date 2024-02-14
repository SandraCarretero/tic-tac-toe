import crossImage from '../assets/images/cross.svg';
import circleImage from '../assets/images/circle.svg';

import { attemptsElement, cpuScoreElement, gameElement, popUpElement, winnerElement, youScoreElement } from "./dom";

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
		cell.innerHTML =
			currentPlayer === 'cross'
				? `<img src="${crossImage}" alt="cross">`
				: `<img src="${circleImage}" alt="circle">`;

		if (checkWinner()) {
			if (currentPlayer === 'cross') {
				youScore++;
				youScoreElement.innerText = youScore;
			} else {
				cpuScore++;
				cpuScoreElement.innerText = cpuScore;
			}
			popUpElement.classList.add('pop-up-show');
			winnerElement.textContent = `${currentPlayer} wins!`;
			endGame();
		} else if (board.every(cell => cell !== '')) {
			attemptsElement.innerText = attempts;
			popUpElement.classList.add('pop-up-show');
			winnerElement.textContent = `It's a tie!`;
			endGame();
		} else {
			currentPlayer = currentPlayer === 'cross' ? 'circle' : 'cross';
			if (currentPlayer === 'circle') {
				setTimeout(() => {
					makeCPUMove();
				}, 500);
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
	attempts++;
};

const restart = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'cross';
    const cells = gameElement.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
};

const handleGameClick = event => {
	const clickedCell = event.target;
	if (clickedCell.classList.contains('cell')) {
		const cellIndex = clickedCell.dataset.index;
		makeMove(cellIndex);
	}
};

const handleReturnButtonClick = () => {
	restart();
	updateAttemptsDisplay();
	popUpElement.classList.remove('pop-up-show');
};

const updateAttemptsDisplay = () => {
	attemptsElement.textContent = attempts;
};

export {handleGameClick,
	handleReturnButtonClick}