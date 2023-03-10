//Create an element with class and return element
function createElementWithClass(elementType, className) {
    let element = document.createElement(elementType);
    element.classList.add(className);
    return element;
}

//Create an element with class and textContext and return element
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

//Gameboard Module that creates and appends a gameboard
let gameBoardModule = () => {
    let create = (() => {
        let body = document.querySelector('body');

        //Create the board
        body.appendChild(createElementWithClass('div', 'game-board'));
        let board = document.querySelector('.game-board');

        //Create the squares in the board
        for (let i = 0; i < (3 ** 2); i++) {
            let square = new Squares(i + 1);
            board.appendChild(square.createSquare());
        };
    });

    return { create };
};

//Turns something in a class that's properly formatted
function turnToClass(name) {
    name = String(name).toLowerCase().split(" ").join("-");
    return name;
}

//Create Player Objects
let Player = (name, mark) => {
    let getName = () => name;
    let getMark = () => mark;
    let gridMarkArray = [];
    let domClassName = turnToClass(name);
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
function selectCurrentPlayer(currentPlayer, player1) {
    let player1DOM = document.querySelector('.player-1.player-tile');
    let player2DOM = document.querySelector('.player-2.player-tile');

    if (currentPlayer === player1) {
        player1DOM.classList.remove("inactive-player");
        player1DOM.classList.add("current-player");
        player2DOM.classList.remove("current-player");
        player2DOM.classList.add("inactive-player");
        return;
    }

    player2DOM.classList.remove("inactive-player");
    player2DOM.classList.add("current-player");
    player1DOM.classList.remove("current-player");
    player1DOM.classList.add("inactive-player");
};

//Checks if all squares on a board are selected
function checkAllSelected(squares) {
    let gameBoard = document.querySelector('.game-board');
    let selectedResults = false;
    if (gameBoard.children.length === gameBoard.querySelectorAll('.selected-square').length) {
        selectedResults = true;
        return selectedResults;
    }
    return selectedResults;
};

//Checks if a player has a winning combination set
function checkWin(array) {
    let gameState = false;
    let squares = document.querySelectorAll('.squares');

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

    function checkIfWin() {
        let winState = false;
        winningCombinations.some((set) => {
            if (set.every(num => array.includes(num))) {
                winState = true;
                return winState;
            }
            return;
        })
        return winState;
    };

    if  (checkIfWin() === true) {
        gameState = true;
        return gameState;
    }

    else if (checkAllSelected(squares) === true && checkIfWin() === false) {
        gameState = "tie";
        return gameState;
    }

    return gameState;
};

//Remove the children of a parent element
function removeChild(parent) {
    let firstChild = parent.firstElementChild;
    while (firstChild) {
        firstChild.remove();
        firstChild = parent.firstElementChild;
    };
};

function disableGame() {
    let gameBoard = document.querySelector('.game-board');
    let playerTiles = document.querySelectorAll('.player-tile');

    gameBoard.classList.add('disabled');
    gameBoard.classList.add('blurred');
    playerTiles.forEach((playerTile) => {
        playerTile.classList.add('blurred');
    });
};

function declareTie() {
    disableGame();
    let body = document.querySelector('body');
    let gameBoard = document.querySelector('.game-board')

    body.appendChild(createElementWithClass("div", "win-screen"));
    let winScreen = document.querySelector('.win-screen');
    let winText = `You tied`;
    winScreen.appendChild(createElementWithClassText("div", "win-declaration", winText));
    winScreen.appendChild(createElementWithClassText("button", "restart-button", "Restart Game"));
    restartGame(gameBoard, winScreen);
}

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

function humanPlayersGame() {
    let player1 = Player("Player 1", "x");
    let player2 = Player("Player 2", "o");
    player1.createPlayerTiles();
    player2.createPlayerTiles();
    let currentPlayer = player1;
    selectCurrentPlayer(currentPlayer, player1);
    let squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener('click', () => {
            let squareID = Number(square.id);

            square.textContent = currentPlayer.getMark();
            square.classList.add(String(turnToClass(currentPlayer.getName())));
            square.classList.add('selected-square');
            (currentPlayer.gridMarkArray).push(squareID);

            let winState = checkWin(currentPlayer.gridMarkArray);
            if (winState === "tie") {
                declareTie();
                return;
            }
            
            else if (winState === true) {
                declareWinner(currentPlayer.getName());
                return;
            }

            let changeCurrentPlayer = (currentPlayer === player1) ? (currentPlayer = player2) : (currentPlayer = player1);
            selectCurrentPlayer(currentPlayer, player1);
            return;
        });
    });
};

function aiGame() {
    let player1 = Player("Player 1", "x");
    let player2 = aiPlayer("Player 2", "o");
    player1.createPlayerTiles();
    player2.createPlayerTiles();
    let currentPlayer = player1;
    selectCurrentPlayer(currentPlayer, player1);
    let squares = document.querySelectorAll('.square');

    squares.forEach((square) => {
        square.addEventListener('click', () => {
            let squareID = Number(square.id);
    
            square.textContent = currentPlayer.getMark();
            square.classList.add(String(turnToClass(currentPlayer.getName())));
            square.classList.add('selected-square');
            (currentPlayer.gridMarkArray).push(squareID);
    
            let winState = checkWin(currentPlayer.gridMarkArray);
            if (winState === "tie") {
                declareTie();
                return;
            }
                
            else if (winState === true) {
                declareWinner(currentPlayer.getName());
                return;
            }
    
            currentPlayer = player2;
            selectCurrentPlayer(currentPlayer, player1);
            makeRandomMove(currentPlayer, player1);
            currentPlayer = player1;
            selectCurrentPlayer(currentPlayer, player1);
        });
    });
};

function playGame(startMenu, opponent) {
    //Create Game Board at game start
    removeChild(startMenu);
    startMenu.remove();
    let gameBoard = gameBoardModule();
    gameBoard.create();

    //Enable which gamemode based on player2 input
    let gametype = ((opponent === "player2") ? humanPlayersGame() : aiGame());
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

let aiPlayer = (name, mark) => {
    let getName = () => name;
    let getMark = () => mark;
    let gridMarkArray = [];
    let domClassName = turnToClass(name);
    let createPlayerTiles = (() => {
        let body = document.querySelector('body');
        let playerTile = createElementWithClass("div", "player-tile");
        playerTile.classList.add(domClassName);
        playerTile.textContent = name;
        body.appendChild(playerTile);
    });

    return { getName, getMark, gridMarkArray, createPlayerTiles };
};

function makeRandomMove(currentPlayer, player1) {
    let availableMoves = document.querySelectorAll('.square:not(.selected-square)');
    let availableMovesArray = Array.from(availableMoves);
    let randomArrayValue = Math.floor(Math.random() * availableMovesArray.length);
    let selectedSquare = availableMovesArray[randomArrayValue];

    selectedSquare.textContent = currentPlayer.getMark();
    selectedSquare.classList.add(String(turnToClass(currentPlayer.getName())));
    selectedSquare.classList.add('selected-square');
    (currentPlayer.gridMarkArray).push(Number(selectedSquare.id));
    console.log(currentPlayer.gridMarkArray);
    let winState = checkWin(currentPlayer.gridMarkArray);
    if (winState === "tie") {
            declareTie();
            return;
    }
        
    else if (winState === true) {
        declareWinner(currentPlayer.getName());
         return;
    }
};



startMenuInLoad();