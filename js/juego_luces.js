// Obtener referencias a elementos HTML
const board = document.querySelector('.board');
const attemptsSpan = document.getElementById('attempts');
const timerSpan = document.getElementById('timer');
const selectButton = document.getElementById('select');
const customRowsInput = document.getElementById('customRows');
const customColsInput = document.getElementById('customcols');
const customLightsInput = document.getElementById('customlights');

// Variables para el juego
let numRows = 5;
let numCols = 6;
let numLights = 10;
let attempts = 0;
let timer;
let lightsRemaining = numLights;

// Función para inicializar el juego
function initGame() {
  // Generar el tablero
  generateBoard();
  
  // Iniciar el temporizador
  startTimer();
  
  // Actualizar el contador de intentos
  attemptsSpan.textContent = attempts;
}

// Función para generar el tablero con celdas
function generateBoard() {
  board.innerHTML = '';
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener('click', handleCellClick);
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
  // Lógica para encender celdas aleatorias
  for (let i = 0; i < numLights; i++) {
    const randomRow = Math.floor(Math.random() * numRows);
    const randomCol = Math.floor(Math.random() * numCols);
    const cell = document.querySelector(`.cell[data-row="${randomRow}"][data-col="${randomCol}"]`);
    cell.classList.add('active');
  }
}

// Función para empezar el temporizador
function startTimer() {
  let seconds = 0;
  timer = setInterval(function() {
    seconds++;
    timerSpan.textContent = seconds;
  }, 1000);
}

// Función para manejar el clic en una celda
function handleCellClick(event) {
  const cell = event.target;
  // Si la celda está encendida, apágala; si está apagada, enciéndela
  if (cell.classList.contains('active')) {
    cell.classList.remove('active');
    lightsRemaining--;
  } else {
    cell.classList.add('active');
    lightsRemaining++;
  }
  // Incrementar el contador de intentos
  attempts++;
  attemptsSpan.textContent = attempts;
  // Verificar si todas las luces están encendidas
  if (lightsRemaining === 0) {
    clearInterval(timer);
    alert('¡Ganaste!');
  }
}

// Función para configurar el juego personalizado
function setCustomGame() {
  const customRows = parseInt(customRowsInput.value);
  const customCols = parseInt(customColsInput.value);
  const customLights = parseInt(customLightsInput.value);

  // Verificar que los valores sean válidos
  if (Number.isInteger(customRows) && Number.isInteger(customCols) && Number.isInteger(customLights) && customLights < customRows * customCols) {
    numRows = customRows;
    numCols = customCols;
    numLights = customLights;
    lightsRemaining = numLights;
    attempts = 0;
    clearInterval(timer);
    timerSpan.textContent = 0;
    attemptsSpan.textContent = 0;
    generateBoard();
  } else {
    alert('Por favor, ingresa valores válidos para Filas, Columnas y Luces.');
  }
}

// Eventos para el clic en el botón Seleccionar y el radio button Personalizado
selectButton.addEventListener('click', initGame);
document.querySelector('input[name="difficulty"][value="custom"]').addEventListener('click', setCustomGame);

// Iniciar el juego cuando se cargue la página
window.addEventListener('load', initGame);
