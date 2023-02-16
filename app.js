//* Constants *//
const board_width = 4;
const directions = ["left", "right", "top", "bottom"];
const dirSymbols = ["←","→","↑","↓"];
const fixedInputs = [2,4,8,16,32,64,128,256,512,1024,2048];

//* State Variables *//
let gameVars = {
    boardArray: [],
    gameStatus: "", // Progress - "", Win - "1", Loss - "-1";
};

//* Initialization *//

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
    randomTwo();
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
            break;
        case "top":
            break;
        case "bottom":
            break;
    };
    renderBoard();
};

function flushLeft() {
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
    
    gameVars.boardArray = bigArray;
};

function mergeLeft() {
    for (let i=0;i<board_width;i++) {
            for (let j=0;j<board_width;j++) {
                if (gameVars.boardArray[i][j] === gameVars.boardArray[i][j+1]) {
                    gameVars.boardArray[i][j] += gameVars.boardArray[i][j+1];
                    gameVars.boardArray[i][j+1] = "";
                };
            };
        };
};

function swipeLeft() {
    flushLeft();
    mergeLeft();
};


function renderBoard() {
    for (let i=0;i<board_width;i++) {
        for (let j=0;j<board_width;j++) {
            const targetBox = document.getElementById(i + " " + j);
            targetBox.textContent = gameVars.boardArray[i][j];
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

//* Create Two random boxes for initialization
function randomTwo() {
    let initIndexOne = identifyID();
    let initIndexTwo = identifyID();
    while (initIndexOne[0] === initIndexTwo[0] && initIndexOne[1] === initIndexTwo[1]) {
        initIndexTwo = identifyID();
    };
    gameVars.boardArray[initIndexOne[0]][initIndexOne[1]] = 2;
    gameVars.boardArray[initIndexTwo[0]][initIndexTwo[1]] = 2;
};

function checkPresence() {

}
function update() {
};
