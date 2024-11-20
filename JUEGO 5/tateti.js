const grid = document.querySelectorAll('.cuadrado');
const restartButton = document.getElementById('reiniciar');
const confirmButton = document.getElementById('comfirmar');
const cancelButton = document.getElementById('cancelar');
const gameOverDialog = document.getElementById('juegoTerminado');
const player1Score = document.getElementById('contador1');
const player2Score = document.getElementById('contador2');
const winnerImage1 = document.getElementById('imagen1');
const winnerImage2 = document.getElementById('imagen2');
const drawImage = document.getElementById('imagen3');

let board = Array(9).fill(null);
let currentPlayer = 'X'; // Alterna entre 'X' y 'O'
let gameActive = true;
let player1Wins = 0;
let player2Wins = 0;

// Líneas ganadoras
const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Maneja los clics en las casillas
grid.forEach((square, index) => {
  square.addEventListener('click', () => handleSquareClick(index, square));
});

function handleSquareClick(index, square) {
  if (!gameActive || board[index] !== null) return;

  board[index] = currentPlayer;
  square.textContent = currentPlayer;

  if (checkWin()) {
    handleWin();
  } else if (board.every(cell => cell !== null)) {
    handleDraw();
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Comprueba si hay un ganador
function checkWin() {
  return winningLines.some(line => 
    line.every(index => board[index] === currentPlayer)
  );
}

// Maneja la lógica cuando hay un ganador
function handleWin() {
  gameActive = false;
  showWinner(currentPlayer);
  updateScores();
}

// Maneja el empate
function handleDraw() {
  gameActive = false;
  drawImage.style.display = 'block';
  gameOverDialog.style.display = 'flex';
}

// Actualiza el marcador
function updateScores() {
  if (currentPlayer === 'X') {
    player1Wins++;
    player1Score.textContent = player1Wins;
    winnerImage1.style.display = 'block';
  } else {
    player2Wins++;
    player2Score.textContent = player2Wins;
    winnerImage2.style.display = 'block';
  }
  gameOverDialog.style.display = 'flex';
}

// Reinicia la partida
restartButton.addEventListener('click', resetGame);
confirmButton.addEventListener('click', () => {
  resetGame();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // El perdedor empieza
});
cancelButton.addEventListener('click', () => {
  window.location.href = '../index.html'; // Vuelve al inicio
});

function resetGame() {
  board = Array(9).fill(null);
  gameActive = true;
  currentPlayer = 'X'; // Reinicia con el jugador 1
  grid.forEach(square => (square.textContent = ''));
  gameOverDialog.style.display = 'none';
  winnerImage1.style.display = 'none';
  winnerImage2.style.display = 'none';
  drawImage.style.display = 'none';
}

