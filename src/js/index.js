const cells = document.querySelectorAll('.cell');
const tiesElement = document.getElementById('ties');
const youElement = document.getElementById('you');
const pcElement = document.getElementById('pc');
let currentPlayer = 'X';
const gameState = ['', '', '', '', '', '', '', '', ''];
let counter = 0;
let youPoints = 0;
let pcPoints = 0;


// Función para manejar el clic en una celda
const handleCellClick = index => {
	if (gameState[index] === '' && !checkWinner()) {
		makeMove(index);
		setTimeout(handleCPUMove, 500);
	}
};

// Función para que el jugador o la CPU realice un movimiento
const makeMove = index => {
	gameState[index] = currentPlayer;
	renderBoard();
	checkWinner();
	togglePlayer();
};

// Función para cambiar el jugador actual
const togglePlayer = () => {
	currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

// Función para que la CPU realice su movimiento
const handleCPUMove = () => {
	const emptyCells = gameState.reduce((acc, val, index) => {
		if (val === '') acc.push(index);
		return acc;
	}, []);

	if (emptyCells.length > 0) {
		const randomIndex = Math.floor(Math.random() * emptyCells.length);
		makeMove(emptyCells[randomIndex]);
	}
};

// Función para pintar el tablero
const renderBoard = () => {
	cells.forEach((cell, index) => {
		const imgSrc =
			gameState[index] === 'X'
				? 'assets/images/cross.svg'
				: gameState[index] === 'O'
					? 'assets/images/circle.svg'
					: '';
		cell.innerHTML = imgSrc
			? `<img src="${imgSrc}" alt="${gameState[index]}">`
			: '';
	});
};

const addTies = () => {
	counter++;
	tiesElement.textContent = counter;
};

// Función para verificar si hay un ganador
const checkWinner = () => {
	const winPatterns = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8], // Filas
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8], // Columnas
		[0, 4, 8],
		[2, 4, 6] // Diagonales
	];

	for (const pattern of winPatterns) {
		const [a, b, c] = pattern;
		if (
			gameState[a] &&
			gameState[a] === gameState[b] &&
			gameState[a] === gameState[c]
		) {
			if (gameState[a] === 'X') {
				alert('You win!');
                youPoints++
				youElement.textContent = youPoints;
			} else if (gameState[a] === 'O') {
				alert('PC wins!');
                pcPoints++
                pcElement.textContent = pcPoints;

			}
			resetGame();
			addTies(); // Reiniciar el juego después de mostrar el mensaje de ganador
			return true;
		}
	}

	if (!gameState.includes('')) {
		alert("It's a tie!");
		resetGame();
		addTies(); // Reiniciar el juego después de mostrar el mensaje de empate
		return true;
	}

	return false;
};

// Función para limpiar el tablero y restablecer el juego
const resetGame = () => {
	currentPlayer = 'X'; // Reiniciar el jugador actual
	gameState.fill(''); // Limpiar el estado del juego
	renderBoard(); // Renderizar el tablero limpio
};

// Añadir evento clic a cada celda
cells.forEach((cell, index) => {
	cell.addEventListener('click', () => handleCellClick(index));
});

// Renderizar el tablero inicial
renderBoard();
