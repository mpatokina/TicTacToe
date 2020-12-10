const statusDisplay = document.querySelector('.gameStatus');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => 'Congrats, Player ${currentPlayer}';
const tieMessage = () => "It's a tie!";
const currentPlayerTurn = () => "it's ${currentPlayer}'s turn";

statusDisplay.innerHTML = currentPlayerTurn();

function cellPlayed() {

}
function resultValidation() {

}
function cellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clikedCellIndex = parseInt(clickedCell.getAttribute('cell'));
    if (gameState[clickedCellIndes] !== "" || !gameActive) {
        return;
    }
    cellPlayed(clickedCell, clickedCellIndex);
    resultValidation();

}

function restartGame() {

}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
document.querySelector('.newGame').addEventListener('click', restartGame);