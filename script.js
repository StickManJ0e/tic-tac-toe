function createElementWithClass(elementType, className) {
    let element = document.createElement(elementType);
    element.classList.add(className);
    return element;
}

function createElementWithClassText(elementType, className, text) {
    let element = document.createElement(elementType);
    element.classList.add(className);
    element.textContent = text;
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

    return { getName, getMark, gridMarkArray, createPlayerTiles};
};

//Selects the current player based off class
function selectCurrentPlayer(currentPlayer, player1, player2) {
let player1DOM = document.querySelector('.player-1');
let player2DOM = document.querySelector('.player-2');
    if (currentPlayer === player1) {
        player1DOM.classList.remove("inactive-player");
        player1DOM.classList.add("current-player");
        player2DOM.classList.remove("current-player");
        player2DOM.classList.add("inactive-player");
        return;
    };

    player2DOM.classList.add("inactive-player");
    player2DOM.classList.add("current-player");
    player1DOM.classList.remove("current-player");
    player1DOM.classList.add("inactive-player");
};

//Checks if a player has a winning combination set
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

function removeChild(parent) {
    let firstChild = parent.firstElementChild;
    while (firstChild) {
        firstChild.remove();
        firstChild = parent.firstElementChild;
    };
};

function playGame(startMenu, opponent) {
    //Create Game Board at game start
    removeChild(startMenu);
    startMenu.remove();
    let gameBoard = gameBoardModule();
    gameBoard.create();

    let player1 = Player("Player 1", "x", "player-1");
    // let player2 = Player("Player 2", "o");

    let player2 = ((opponent === "player2") ? Player("Player 2", "o") : console.log("Ai chosen"));
    player1.createPlayerTiles();
    player2.createPlayerTiles();
    let currentPlayer = player1;
    selectCurrentPlayer(currentPlayer, player1, player2);
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
            selectCurrentPlayer(currentPlayer, player1, player2);
        });
    });
};

function restartGame(gameBoard, winScreen) {
    let restartButton = document.querySelector('.restart-button');
    let playerTiles = document.querySelectorAll('.player-tile');
    restartButton.addEventListener('click', () => {
        removeChild(gameBoard);
        gameBoard.remove();
        playerTiles.forEach((playerTile) => {
            removeChild(playerTile);
            playerTile.remove();
        })
        removeChild(winScreen);
        winScreen.remove();
        startMenuInLoad();
    });
};

function disableGame() {
    let gameBoard = document.querySelector('.game-board');
    let playerTiles = document.querySelectorAll('.player-tile');

    gameBoard.classList.add('disabled');
    gameBoard.classList.add('blurred');
    playerTiles.forEach((playerTile) => {
        playerTile.classList.add('blurred');
    });
;}

//Declare a winner function and display a end game pop up
function declareWinner(player) {
    disableGame();
    let body = document.querySelector('body');
    let gameBoard = document.querySelector('.game-board')

    body.appendChild(createElementWithClass("div", "win-screen"));
    let winScreen = document.querySelector('.win-screen');
    let winText = `${player} Won!`
    winScreen.appendChild(createElementWithClassText("div", "win-declaration", winText));
    winScreen.appendChild(createElementWithClassText("button", "restart-button", "Restart Game"));
    restartGame(gameBoard, winScreen);
};

//Returns which opponent has been selected in the start menu based on class
function getSelectedOpponent(player2Selection, aiSelection) {
    if (player2Selection.classList.contains("selectedOpponent")) {
        return selected = "player2";
    }
    return selected = "ai";
};

//Creates all the start menu elements
function createStartMenu() {
    let body = document.querySelector('body');
    body.appendChild(createElementWithClass("div", "start-menu"));
    let startMenu = document.querySelector('.start-menu');
    startMenu.appendChild(createElementWithClassText("div", "menu-heading", "Tic Tac Toe"));
    startMenu.appendChild(createElementWithClassText("div", "player1-details", "Player 1"));
    startMenu.appendChild(createElementWithClassText("div", "vs-symbol", "vs"));
    startMenu.appendChild(createElementWithClass("div", "player2-details"));
    let player2Details = document.querySelector('.player2-details');
    player2Details.appendChild(createElementWithClassText("button", "player2-selection", "Player 2"));
    player2Details.appendChild(createElementWithClassText("button", "ai-selection", "AI"));
    startMenu.appendChild(createElementWithClassText("button", "start-game", "Start Game"));
};

//Function that creates a start menu
function startMenuInLoad() {

    createStartMenu();
    let startMenu = document.querySelector('.start-menu');

    let player2Selection = document.querySelector('.player2-selection');
    player2Selection.classList.add('selectedOpponent')
    let aiSelection = document.querySelector('.ai-selection');
    let startGameButton = document.querySelector('.start-game')

    player2Selection.addEventListener('click', () => {
        aiSelection.classList.remove("selectedOpponent");
        player2Selection.classList.add("selectedOpponent");
    });

    aiSelection.addEventListener('click', () => {
        player2Selection.classList.remove("selectedOpponent");
        aiSelection.classList.add("selectedOpponent");
    });

    startGameButton.addEventListener('click', () => {
        playGame(startMenu, getSelectedOpponent(player2Selection, aiSelection));
    });

};

startMenuInLoad();