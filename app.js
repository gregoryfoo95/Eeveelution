"use strict";
//* Constants *//
const board_width = 4;
const directions = ["left", "right", "up", "down"];
const dirSymbols = ["←","→","↑","↓"];
const testing = false;
//* Game Variables *//
let gameVars = {
    boardArray: [],
    gameStatus: "", // Progress - "", Win - "1", Loss - "0";
    emptyState: false,
    score: 0,
    numColor: {
        "" : "white",
        "2": "lightblue",
        "4": "lightyellow",
        "8": "lightgreen",
        "16": "orange",
        "32": "cyan",
        "64": "turquoise",
        "128": "lightcyan",
        "256": "lightgoldenrod",
        "512": "lightgray",
        "1024": "teal",
        "2048": "blanchedalmond"
    },
    eeveeImages: {
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
    }
};


//* Initial Cached Variables *//
let displayScore = document.querySelector(".score");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let board = document.querySelector(".board");
let boardDirections = document.querySelector(".direction");

//* Initialization *//
init();
//* Event Listeners *//
let arrowDir = document.querySelectorAll(".arrow");
arrowDir.forEach((arrow) => {
    arrow.addEventListener("click", handleArrowClick);
});

//* Functions *//

function init() {
    createBoard();
    if (testing) {
        boardTesting();
    } else {
        randomTwo();
    };
    renderBoard();
};

function handleArrowClick(e) {
    e.preventDefault();
    let clicked = e.currentTarget.id;
    switch(clicked) {
        case "left":
            swipeLeft();
            break;
        case "right":
            swipeRight();
            break;
        case "up":
            swipeUp();
            break;
        case "down":
            swipeDown();
            break;
    };
    renderBoard();
};

function swipeLeft() {
    const preArray = gameVars.boardArray;
    //console.log(JSON.parse(JSON.stringify(preArray)));
    flushLeft();
    //console.log("Post-Flush", JSON.parse(JSON.stringify(gameVars.boardArray))); //To ask: need to use this to show current state of an object, else it will show last state of execution
    //console.log("Post-First-Flush: ", gameVars.boardArray);
    mergeLeft();
    //console.log("Post-Merge: ", JSON.parse(JSON.stringify(gameVars.boardArray)));
    flushLeft();
    //console.log("Post-Flush", JSON.parse(JSON.stringify(gameVars.boardArray)));
    addTwo();
    //console.log("Final ", JSON.parse(JSON.stringify(gameVars.boardArray)));
};


function equals(a,b) {
    if (a === b) return true;

    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
        return a === b;

    if (a.prototype !== b.prototype) return false;

    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;

    return keys.every(k => equals(a[k], b[k]));

};

/* function flushLeft() {
    let bigArray = [];
    for (let i=0;i<board_width;i++) {
        let subArray = [];
        let empty = 0;
        for (let j=0;j<board_width;j++) {
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
    console.log("From within flushleft:", bigArray);
    gameVars.boardArray = bigArray;
};
 */


function flushLeft() {
    for (let i=0;i<board_width;i++) {
        for (let j=0;j<board_width-1;j++) {
            if (gameVars.boardArray[i][j] !== "") {
                continue;
            } else if (gameVars.boardArray[i][j] === "") {
                gameVars.boardArray[i][j] = gameVars.boardArray[i][j+1];
                gameVars.boardArray[i][j+1] = "";
            };
        };
    };
};

function mergeLeft() {
    for (let i=0;i<board_width;i++) {
        for (let j=0;j<board_width-1;j++) {
            if (gameVars.boardArray[i][j] === gameVars.boardArray[i][j+1]) {
                gameVars.boardArray[i][j] += gameVars.boardArray[i][j+1];
                gameVars.boardArray[i][j+1] = "";
                gameVars.score += gameVars.boardArray[i][j];
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
    for (let i=0;i<board_width;i++) {
        let subArray = [];
        let empty = 0;
        for (let j=board_width-1;j>=0;j--) {
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
    for (let i=0;i<board_width;i++) {
        for (let j=board_width-1;j>0;j--) {
            if (gameVars.boardArray[i][j] === gameVars.boardArray[i][j-1]) {
                gameVars.boardArray[i][j] += gameVars.boardArray[i][j-1];
                gameVars.boardArray[i][j-1] = "";
                gameVars.score += gameVars.boardArray[i][j];
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
    for (let i=0;i<board_width;i++) {
        let subArray = [];
        let empty = 0;
        for (let j=0;j<board_width;j++) {
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
    for (let i=0;i<board_width;i++) {
        for (let j=0;j<board_width;j++) {
            if (newArray[i][j] === newArray[i][j+1]) {
                newArray[i][j] += newArray[i][j+1];
                newArray[i][j+1] = "";
                gameVars.score += newArray[i][j];
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
    for (let i=0;i<board_width;i++) {
        let subArray = [];
        let empty = 0;
        for (let j=board_width-1;j>=0;j--) {
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
    for (let i=0;i<board_width;i++) {
        for (let j=board_width-1;j>0;j--) {
            if (newArray[i][j] === newArray[i][j-1]) {
                newArray[i][j] += newArray[i][j-1];
                newArray[i][j-1] = "";
                gameVars.score += newArray[i][j];
            };
        };
    };
    gameVars.boardArray = transpose(newArray);
    checkWinner();
};

function renderBoard() {
    for (let i=0;i<board_width;i++) {
        for (let j=0;j<board_width;j++) {
            const targetBox = document.getElementById(i + " " + j);
            targetBox.textContent = gameVars.boardArray[i][j];
            targetBox.style.backgroundColor = gameVars.numColor[gameVars.boardArray[i][j]]
            if (gameVars.boardArray[i][j] !== "") {
            targetBox.innerHTML = "<img src =" + gameVars.eeveeImages[gameVars.boardArray[i][j]] + " width=\"120px\" height=\"120px\"" + ">";
            };
        };
    };
};

function renderMessage() {

}

function createBoard() {
    //Main Board
    for (let i=0;i<board_width;i++) {
        gameVars.boardArray[i] = [];
        for (let j=0;j<board_width;j++) {
            //Create Board DOM element
            gameVars.boardArray[i][j] = "";
            const newBox = document.createElement("span");
            newBox.classList.add("box");
            newBox.id = i + " " + j;
            board.appendChild(newBox);
        };
    };
    //Directional Buttons
    for (let i=0; i<directions.length;i++) {
        const newDirection = document.createElement("span");
        newDirection.classList.add("arrow");
        newDirection.id = directions[i];
        newDirection.textContent = dirSymbols[i];
        boardDirections.appendChild(newDirection);
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
    return Math.floor(Math.random()*board_width); 
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
    gameVars.emptyState[initIndexOne[0] + " " + initIndexOne[1]] = 1;
    gameVars.emptyState[initIndexTwo[0] + " " + initIndexTwo[1]] = 1;
};

function checkFullBoard() {
    gameVars.emptyState = false;
    rowLoop: for (let i = 0; i < board_width; i++) {
        columnLoop: for (let j = 0; j < board_width; j++) {
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
    rowLoop: for (let i = 0; i < board_width; i++) {
        columnLoop: for (let j = 0; j < board_width;j++) {
            if (gameVars.boardArray[i][j] === 2048) {
                displayScore.textContent = "You Won!";
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
    rowLoop: for (let i = 0; i < board_width; i++) {
        columnLoop: for (let j = 0; j < board_width-1; j++) {
            if (gameVars.boardArray[i][j] === gameVars.boardArray[i][j+1]) {
                gameOver = false;
                break rowLoop;
            };
        };
    };
    //Check from Top to bottom for possible winning configurations
    if (gameOver) {
        rowLoop: for (let j = 0; j < board_width; j++) {
            columnLoop: for (let i = 0; i < board_width-1; i++) {
                if (gameVars.boardArray[i][j] === gameVars.boardArray[i+1][j]) {
                    gameOver = false;
                    break rowLoop;
                };
            };
        };
    };

    if (gameOver) {
        displayScore.innerText = "Good luck next time! Eevee has decided to look for a better pokemon trainer...";
        console.log("You lost!");
        gameVars.gameStatus = 0;
    };
};