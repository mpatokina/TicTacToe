const statusDisplay = document.querySelector('.gameStatus'); //stores game status
let gameActive = true;

let currentPlayer = "X"; // stores current player

let board = []; // sets the board as an empty array 
for (let i = 0; i <= 8; i++) { // pushes nine elements each = "" into array
    board.push("");
}

winningMessage = function() { // declares winning message
    return `Congrats, Player ${currentPlayer} !`;
}
tieMessage = function() { // declares tie message
    return `It's a Tie!`;
}
currentPlayerTurn = function() { // declares whose turn message
    return `It's ${currentPlayer}'s turn`;
}

statusDisplay.innerHTML = currentPlayerTurn(); // initial message to show whose turn it is 

 
function cellClick(clickedCellEvent) {

    const clickedCell = clickedCellEvent.target; // saves clicked html in a variable for future use

    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index')); // grabs the 'data-cell-index' attribute from clicked cell
    if (board[clickedCellIndex] !== "" || !gameActive) { //checks if the cell has been clicked before or if the game has been paused. If true will ignore the click
        return;
    }
    cellPlayed(clickedCell, clickedCellIndex);
    resultValidation();
}

function cellPlayed(clickedCell, clickedCellIndex) {
    board[clickedCellIndex] = currentPlayer; // updates the board
    clickedCell.innerHTML = currentPlayer; // updates user interface (what players see on the board)
}

function playerChange() {// changes players turns
    if (currentPlayer === "X"){
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    statusDisplay.innerHTML = currentPlayerTurn(); // dispays player turn
}

const winningConditions = [ // stores all winning conditions
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];

function resultValidation() { // checks for winning conditions or tie
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let x = board[winCondition[0]];
        let y = board[winCondition[1]];
        let z = board[winCondition[2]];
        if (x === '' || y === '' || z === '') {
            continue;
            }
        if (x === y && y === z) {
            roundWon = true;
            break
            }
        }
    if (roundWon) {
            statusDisplay.innerHTML = winningMessage(); // displays winning message
            gameActive = false;
            return;
        }
    let roundTie = !board.includes("");
    if (roundTie) {
       statusDisplay.innerHTML = tieMessage(); // displays tie message
       gameActive = false;
       return;
    }
    playerChange();
}


function restartGame() { // restarts game
    gameActive = true;
    currentPlayer = "X";
    board = []; // resets the board to ""
    for (let i = 0; i <= 8; i++) {
    board.push("");
    }
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(function(cell) { // updates user interface (what players see on the board)
    cell.innerHTML = "";
    })
}

document.querySelectorAll('.cell').forEach(function(cell) { //  event listener to game cells
    cell.addEventListener('click', cellClick);
})


document.querySelector('.newGame').addEventListener('click', restartGame); // event listener to restart button