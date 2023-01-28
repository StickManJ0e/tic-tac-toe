function createElementWithClass(elementType, className) {
    let element = document.createElement(elementType);
    element.classList.add(className);
    return element;
}

//Create a squares object
function Squares(number) {
    this.gridNumber = number;
    this.createSquare = function () {
        let squareDiv = (createElementWithClass('div', 'square'));
        squareDiv.setAttribute('id', `${number}`);
        return (squareDiv);
    };
};

let gameBoardModule = () => {
    let create = (() => {
        let body = document.querySelector('body');

        //Create the board
        body.appendChild(createElementWithClass('div', 'game-board'));
        let board = document.querySelector('.game-board');

        //Create the squares in the board
        for (let i = 0; i < (3 ** 2); i++) {
            let square = new Squares(i + 1);
            console.log(square);
            board.appendChild(square.createSquare());
        };
    });

    return { create };
};

//Create Player Objects
let Player = (name, mark) => {
    let getName = () => name;
    let getMark = () => mark;
    let gridMarkArray = [];
    let domClassName = String(name).toLowerCase().split(" ").join("-");
    let createPlayerTiles = (() => {
        let body = document.querySelector('body');
        let playerTile = createElementWithClass("div", "player-tile");
        playerTile.classList.add(domClassName);
        playerTile.textContent = name;
        body.appendChild(playerTile);
    });
    let playerDOM = document.querySelector(`.${domClassName}`);

    return { getName, getMark, gridMarkArray, createPlayerTiles };
};

function selectCurrentPlayer(currentPlayer) {

}

function checkWin(array, player) {

    //Create all possible winning combinations into an array
    let winningCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];

    winningCombinations.some((set) => {
        if (set.every(num => array.includes(num))) {
            declareWinner(player);
            return;
        }
        return;
    });
};

function playGame() {
    //Create Game Board at game start
    let gameBoard = gameBoardModule();
    gameBoard.create();

    let player1 = Player("Player 1", "x", "player-1");
    let player2 = Player("Player 2", "o");
    player1.createPlayerTiles();
    player2.createPlayerTiles();
    let currentPlayer = player1;
    let squares = document.querySelectorAll('.square');

    //Create eventlisteners for each grid square
    squares.forEach((square) => {
        square.addEventListener('click', () => {
            let squareID = Number(square.id);

            square.textContent = currentPlayer.getMark();
            square.classList.add('disabled');
            (currentPlayer.gridMarkArray).push(squareID);
            console.log(currentPlayer.gridMarkArray);
            checkWin(currentPlayer.gridMarkArray ,currentPlayer.getName());
            let changeCurrentPlayer = currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
        });
    });
};

//Declare a winner function and display a end game pop up
function declareWinner(player) {
    let gameBoard = document.querySelector('.game-board');
    gameBoard.classList.add('disabled');
    alert(`${player} Won!`)
};

playGame();