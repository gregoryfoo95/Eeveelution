//* Constants *//
const BOARD_WIDTH = 4;
const DIRECTIONS = ["left", "right", "up", "down"];
const DIRSYMBOLS = ["←","→","↑","↓"];
const TESTING = false;
const NUMTILECOLOR = {
        "" : "white",
        "2": "lightblue",
        "4": "lightyellow",
        "8": "red",
        "16": "yellow",
        "32": "dodgerblue",
        "64": "#1c1c1c",
        "128": "lightpurple",
        "256": "cyan",
        "512": "greenyellow",
        "1024": "peachpuff",
        "2048": "blanchedalmond"
    };
const EEVEEIMAGES = {
        "" : "",
        "2": "https://i.ibb.co/1rGW0yL/Pokeball.jpg",
        "4": "https://i.ibb.co/1fMk8dt/Eevee.png",
        "8": "https://i.ibb.co/ZhyGRCf/Flareon.png",
        "16": "https://i.ibb.co/7knyw4V/Jolteon.png",
        "32": "https://i.ibb.co/cbRNFp8/Vaporeon.png",
        "64": "https://i.ibb.co/4W1Rg55/Umbreon.png",
        "128": "https://i.ibb.co/HVYGJ3Q/Espeon.png",
        "256": "https://i.ibb.co/7J7K7D8/Glaceon.png",
        "512": "https://i.ibb.co/Hh4HkNs/Leafeon.png",
        "1024": "https://i.ibb.co/xMYW6Cw/Faryeon.png",
        "2048": "https://i.ibb.co/bLxLGmG/Team-Eevee.png"
    };

//* Game Variables *//
let gameVars = {
    boardArray: [],
    gameStatus: "", // Progress - "", Win - "1", Loss - "0";
    emptyState: true,
    score: 0,
    swipeDirections: {
        touchStartX: 0,
        touchEndX: 0,
        touchStartY: 0,
        touchEndY: 0,
    },
};


//* Cached Variables *//
let displayScreen = document.querySelector(".screen");
let tiles = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let scoreBoard = document.querySelector(".score");
let gameBoard = document.querySelector(".board");
let startBtn = document.querySelector(".start");
let banner = document.querySelector(".banner");
let form = document.querySelector("form");

init();

//* Event Listeners *//
startBtn.addEventListener("click", handleStartPress);
document.addEventListener("keydown", handleKeyPress);
resetBtn.addEventListener("click", handleResetPress);
/* document.addEventListener('touchstart', e => {
    gameVars.swipeDirections.touchStartX = e.changedTouches[0].screenX;
    gameVars.swipeDirections.touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
  gameVars.swipeDirections.touchEndX = e.changedTouches[0].screenX;
  gameVars.swipeDirections.touchEndY = e.changedTouches[0].screenY;
  checkDirection();
}); */

//* Functions *//

const render = {
    board() {
        for (let i=0;i<BOARD_WIDTH;i++) {
            for (let j=0;j<BOARD_WIDTH;j++) {
                const targetBox = document.getElementById(i + " " + j);
                targetBox.textContent = gameVars.boardArray[i][j];
                targetBox.style.backgroundColor = NUMTILECOLOR[gameVars.boardArray[i][j]]
                if (gameVars.boardArray[i][j] !== "") {
                    targetBox.innerHTML = "<img src =" + EEVEEIMAGES[gameVars.boardArray[i][j]] + " width=\"120px\" height=\"120px\"" + ">";
                    scoreBoard.innerHTML = parseInt(gameVars.score);
                };
            };
        };
    },
}
function init() {
    createBoard();
    if (TESTING) {
        boardTesting();
    } else {
        randomTwo();
    };
    renderBoard();
};

/* function checkDirection() {
  if (gameVars.swipeDirections.touchEndX < gameVars.swipeDirections.touchStartX) {
    swipeLeft();
  };
  if (gameVars.swipeDirections.touchEndX > gameVars.swipeDirections.touchStartX) {
    swipeRight();
  };
  if (gameVars.swipeDirections.touchEndY < gameVars.swipeDirections.touchStartY) {
    swipeDown();
  };
  if (gameVars.swipeDirections.touchEndY > gameVars.swipeDirections.touchStartY) {
    swipeUp();
  };
}; */
function handleStartPress(e) {
    e.preventDefault();
    if (gameBoard.style.display === "none") {
        gameBoard.style.display = "grid";
        banner.style.display = "flex";
        form.style.display = "none";
        
    } else {
        gameBoard.style.display = "none";
    };
};

function handleResetPress(e) {
    e.preventDefault();
    gameVars = {
    boardArray: [
        ["","","",""],
        ["","","",""],
        ["","","",""],
        ["","","",""],
    ],
    gameStatus: "", // Progress - "", Win - "1", Loss - "0";
    emptyState: true,
    score: 0,
    };
    randomTwo();
    renderBoard();
};


function handleKeyPress(e) {
    e.preventDefault();
    const clicked = e.keyCode;
    switch(clicked) {
        case 37:
            swipeLeft();
            break;
        case 39:
            swipeRight();
            break;
        case 38:
            swipeUp();
            break;
        case 40:
            swipeDown();
            break;
    };
    renderBoard();
};

function swipeLeft() {
    flushLeft();
    mergeLeft();
    flushLeft();
    addTwo();
};

function flushLeft() {
    let bigArray = [];
    for (let i=0;i<BOARD_WIDTH;i++) {
        let subArray = [];
        let empty = 0;
        for (let j=0;j<BOARD_WIDTH;j++) {
            if (gameVars.boardArray[i][j] !== "") {
                subArray.push(gameVars.boardArray[i][j]);
            } else {
                empty += 1;
            };
        };

        for (let k = 0; k < empty; k++) {
            subArray.push("");
        };
        bigArray.push(subArray);
    };
    gameVars.boardArray = bigArray;
};

function mergeLeft() {
    for (let i=0;i<BOARD_WIDTH;i++) {
        for (let j=0;j<BOARD_WIDTH-1;j++) {
            if (gameVars.boardArray[i][j] === gameVars.boardArray[i][j+1]) {
                gameVars.boardArray[i][j] += gameVars.boardArray[i][j+1];
                gameVars.boardArray[i][j+1] = "";
                if (gameVars.boardArray[i][j] === "") {
                    gameVars.score += 0;
                } else {
                    gameVars.score += parseInt(gameVars.boardArray[i][j]);
                };
            };
        };
    };
    checkWinner();
};

function swipeRight() {
    console.log("First Step: ", gameVars.boardArray);
    flushRight();
    console.log("Post-Flush: ", gameVars.boardArray);
    mergeRight();
    console.log("Post-Merge: ", gameVars.boardArray);
    flushRight();
    console.log("Post-Flush: ", gameVars.boardArray);
    addTwo();
};

function flushRight() {
       let bigArray = [];
    for (let i=0;i<BOARD_WIDTH;i++) {
        let subArray = [];
        let empty = 0;
        for (let j=BOARD_WIDTH-1;j>=0;j--) {
            if (gameVars.boardArray[i][j] !== "") {
                subArray.unshift(gameVars.boardArray[i][j]);
            } else {
                empty += 1;
            };
        };
        for (let k = 0; k < empty; k++) {
            subArray.unshift("");
        };
        bigArray.push(subArray);
    };   

    gameVars.boardArray = bigArray;
};

function mergeRight() {
    for (let i=0;i<BOARD_WIDTH;i++) {
        for (let j=BOARD_WIDTH-1;j>0;j--) {
            if (gameVars.boardArray[i][j] === gameVars.boardArray[i][j-1]) {
                gameVars.boardArray[i][j] += gameVars.boardArray[i][j-1];
                gameVars.boardArray[i][j-1] = "";
                if (gameVars.boardArray[i][j] === "") {
                    gameVars.score += 0;
                } else {
                    gameVars.score += parseInt(gameVars.boardArray[i][j]);
                };
            };
        };
    };
    checkWinner();
};

function swipeUp() {
    flushUp();
    mergeUp();
    flushUp();
    addTwo();
};

function flushUp() {
    let newArray = transpose(gameVars.boardArray);
          let bigArray = [];
    for (let i=0;i<BOARD_WIDTH;i++) {
        let subArray = [];
        let empty = 0;
        for (let j=0;j<BOARD_WIDTH;j++) {
            if (newArray[i][j] !== "") {
                subArray.push(newArray[i][j]);
            } else {
                empty += 1;
            };
        };
        for (let k = 0; k < empty; k++) {
            subArray.push("");
        };
        bigArray.push(subArray);
    };
    gameVars.boardArray = transpose(bigArray);
};

function mergeUp() {
    let newArray = transpose(gameVars.boardArray);
    for (let i=0;i<BOARD_WIDTH;i++) {
        for (let j=0;j<BOARD_WIDTH;j++) {
            if (newArray[i][j] === newArray[i][j+1]) {
                newArray[i][j] += newArray[i][j+1];
                newArray[i][j+1] = "";
                if (newArray[i][j] === "") {
                    gameVars.score += 0;
                } else {
                    gameVars.score += parseInt(newArray[i][j]);
                };
            };
        };
    };
    gameVars.boardArray = transpose(newArray);
    checkWinner();
};

function swipeDown() {
 flushDown();
 mergeDown();
 flushDown();
 addTwo();
};

function flushDown() {
    let newArray = transpose(gameVars.boardArray);
    let bigArray = [];
    for (let i=0;i<BOARD_WIDTH;i++) {
        let subArray = [];
        let empty = 0;
        for (let j=BOARD_WIDTH-1;j>=0;j--) {
            if (newArray[i][j] !== "") {
                subArray.unshift(newArray[i][j]);
            } else {
                empty += 1;
            };
        };
        for (let k = 0; k < empty; k++) {
            subArray.unshift("");
        };
        bigArray.push(subArray);
    };   
    gameVars.boardArray = transpose(bigArray);
};

function mergeDown() {
    let newArray = transpose(gameVars.boardArray);
    for (let i=0;i<BOARD_WIDTH;i++) {
        for (let j=BOARD_WIDTH-1;j>0;j--) {
            if (newArray[i][j] === newArray[i][j-1]) {
                newArray[i][j] += newArray[i][j-1];
                newArray[i][j-1] = "";
                if (newArray[i][j] === "") {
                    gameVars.score += 0;
                } else {
                    gameVars.score += parseInt(newArray[i][j]);
                };
            };
        };
    };
    gameVars.boardArray = transpose(newArray);
    checkWinner();
};

function renderBoard() {
    for (let i=0;i<BOARD_WIDTH;i++) {
        for (let j=0;j<BOARD_WIDTH;j++) {
            const targetBox = document.getElementById(i + " " + j);
            targetBox.textContent = gameVars.boardArray[i][j];
            targetBox.style.backgroundColor = NUMTILECOLOR[gameVars.boardArray[i][j]]
            if (gameVars.boardArray[i][j] !== "") {
                targetBox.innerHTML = "<img src =" + EEVEEIMAGES[gameVars.boardArray[i][j]] + " width=\"120px\" height=\"120px\"" + ">";
                scoreBoard.innerHTML = `${document.querySelector(".name").textContent}'s Score: ${parseInt(gameVars.score)}`;
            };
        };
    };
};

function welcome() {

}

function createBoard(e) {
    //Main Board
    for (let i=0;i<BOARD_WIDTH;i++) {
        gameVars.boardArray[i] = [];
        for (let j=0;j<BOARD_WIDTH;j++) {
            //Create Board DOM element
            gameVars.boardArray[i][j] = "";
            const newBox = document.createElement("span");
            newBox.classList.add("box");
            newBox.id = i + " " + j;
            gameBoard.appendChild(newBox);
        };
    };
};

function transpose(matrix) {
    for (let i=0; i<matrix.length;i++) {
        for (let j=0; j<i; j++) {
            const temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        };
    };
    return matrix;
};

function generateRandomIndex() {
    return Math.floor(Math.random()*BOARD_WIDTH); 
};

//* Generate random values to be assigned to id of boxes
function identifyID() {
    let initIndex = [];
    initIndex.push(generateRandomIndex());
    initIndex.push(generateRandomIndex());
    return [initIndex[0],initIndex[1]];
};

//Function for testing, delete later
function boardTesting() {
    gameVars.boardArray = [
        ["",2,"",2],
        [2,"","",2],
        [2,8,"",32],
        [2,8,"",2]
    ];
}

//* Initialize Two random boxes of "2"
function randomTwo() {
    let initIndexOne = identifyID();
    let initIndexTwo = identifyID();
    while (initIndexOne[0] === initIndexTwo[0] && initIndexOne[1] === initIndexTwo[1] 
        && gameVars.boardArray[initIndexOne[0]][initIndexOne[1]] !== "" 
        && gameVars.boardArray[initIndexTwo[0]][initIndexTwo[1]] !== "") {
        initIndexOne = identifyID();
        initIndexTwo = identifyID();
    };
    gameVars.boardArray[initIndexOne[0]][initIndexOne[1]] = 2;
    gameVars.boardArray[initIndexTwo[0]][initIndexTwo[1]] = 2;
};

function checkFullBoard() {
    gameVars.emptyState = false;
    rowLoop: for (let i = 0; i < BOARD_WIDTH; i++) {
        columnLoop: for (let j = 0; j < BOARD_WIDTH; j++) {
            if (gameVars.boardArray[i][j] === "") {
                gameVars.emptyState = true;
                break rowLoop;
            };
        };
    };

    if (gameVars.emptyState === false) {
        checkLose();
    };
};

function addTwo() {
    let initIndex = identifyID();
    while (gameVars.boardArray[initIndex[0]][initIndex[1]] !== "") {
        checkFullBoard();
        console.log(gameVars.gameStatus);
        if (gameVars.emptyState === false) {
            break;
        } else {
            initIndex = identifyID();
        };
    };

    if (gameVars.gameStatus === "" && gameVars.emptyState === true) {
        gameVars.boardArray[initIndex[0]][initIndex[1]] = 2;
    };
};

function checkWinner() {
    rowLoop: for (let i = 0; i < BOARD_WIDTH; i++) {
        columnLoop: for (let j = 0; j < BOARD_WIDTH;j++) {
            if (gameVars.boardArray[i][j] === 2048) {
                displayScreen.textContent = "You Won!";
                console.log("You won!");
                gameVars.gameStatus = 1;
                break rowLoop;
            };
        };
    };
};

function checkLose() {
    let gameOver = true;
    //Check from left to right for possible winning configurations
    rowLoop: for (let i = 0; i < BOARD_WIDTH; i++) {
        columnLoop: for (let j = 0; j < BOARD_WIDTH-1; j++) {
            if (gameVars.boardArray[i][j] === gameVars.boardArray[i][j+1]) {
                gameOver = false;
                break rowLoop;
            };
        };
    };
    //Check from Top to bottom for possible winning configurations
    if (gameOver) {
        rowLoop: for (let j = 0; j < BOARD_WIDTH; j++) {
            columnLoop: for (let i = 0; i < BOARD_WIDTH-1; i++) {
                if (gameVars.boardArray[i][j] === gameVars.boardArray[i+1][j]) {
                    gameOver = false;
                    break rowLoop;
                };
            };
        };
    };

    if (gameOver) {
        displayScreen.innerText = "Good luck next time! Eevee has decided to look for a better pokemon trainer...";
        console.log("You lost!");
        gameVars.gameStatus = 0;
    };
};