const statusDisplay = document.querySelector('.gameStatus');
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Congrats, Player ${currentPlayer}`;
const tieMessage = () => `It's a tie!`;
const currentPlayerTurn = () => `it's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
document.querySelector('.newGame').addEventListener('click', restartGame);

function cellClick(clickedCellEvent) {

    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(clickedCell.getAttribute('cell'));
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    cellPlayed(clickedCell, clickedCellIndex);
    resultValidation();

}
function cellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function resultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            let x = gameState[winCondition[0]];
            let y = gameState[winCondition[1]];
            let z = gameState[winCondition[2]];
            if (x === '' || y === '' || z === '') {
                continue;
            }
            if (x === y && y === z) {
                roundWon = true;
                break
            }
        }
    if (roundWon) {
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }
    let roundTie = !gameState.includes("");
    if (roundTie) {
       statusDisplay.innerHTML = tieMessage();
       gameActive = false;
       return;
    }
    playerChange();
}
function playerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
                .forEach(cell => cell.innerHTML = "");
}

