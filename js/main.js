const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winning-message');
const winningMessageTextElement = document.querySelector('[data-winning-message]');
const restartButton =document.getElementById('restart-btn');
const X_CLASS = 'x';
const O_CLASS = 'o';

const WINNING_COMBO = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let oTurn;

startGame();
    function startGame(){
        oTurn = false;
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS);
            cell.classList.remove(O_CLASS);
            cell.removeEventListener('click', selected)
            cell.addEventListener('click', selected, { once: true });
        });
        boardHover();
        winningMessageElement.classList.remove('show')
    };

restartButton.addEventListener('click', startGame);

function selected(e) {
    const cell = e.target;
    const currentTurn = oTurn ? O_CLASS : X_CLASS;

    placeMark(cell, currentTurn);

    if (checkWin(currentTurn)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurn();
        boardHover();
    }
};

function endGame(draw){
    if (draw) {
        winningMessageTextElement.innerText = `Draw`
    } else {
        winningMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    });
}

function placeMark(cell, currentTurn){
    cell.classList.add(currentTurn)
};

function checkWin(currentTurn) {
    return WINNING_COMBO.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentTurn)
        });
    });
};

function swapTurn(){
    oTurn = !oTurn
};

function boardHover(){
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    oTurn ? board.classList.add(O_CLASS) : board.classList.add(X_CLASS)
};