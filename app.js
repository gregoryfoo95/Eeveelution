//* Constants *//
const board_width = 4;
const directions = ["left", "right","top", "bottom"];
const fixedInputs = [2,4,8,16,32,64,128,256,512,1024,2048];

//* State Variables *//
let gameVars = {
    boardArray: [],
    gameStatus: "", // Progress - "", Win - "1", Loss - "-1";
};

//* Initialization *//

//* Initialization + Cached Variables *//
let displayScore = document.querySelector(".score");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let board = document.querySelector(".board");
let boardDirections = document.querySelector(".direction");
let arrowDir = document.querySelectorAll(".arrow");

//* Initialization *//
init();

//* Event Listeners *//
arrowDir.forEach((arrow) => {
    arrow.addEventListener("click", handleArrowClick);
});

//* Functions *//

function init() {
    createBoard();
}

function handleArrowClick() {

};

function generateRandomIndex() {
    return Math.floor(Math.random()*board_width); 
};

function renderBoard() {

}

function renderMessage() {

}

function createBoard() {
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

    for (let i=0; i<directions.length;i++) {
        const newDirection = document.createElement("span");
        newDirection.classList.add("arrow");
        newDirection.id = directions[i];
        boardDirections.appendChild(newDirection);
    };

    const initBoxOne = document.getElementById(identifyID());
    let initBoxTwo = document.getElementById(identifyID());
    while (initBoxOne.id === initBoxTwo.id) {
        initBoxTwo = document.getElementById(identifyID());;
    };

    initBoxOne.innerText = fixedInputs[0];
    initBoxTwo.innerText = fixedInputs[0];
};

//* Random selection of initial 2 boxes
function identifyID() {
    const value1 = generateRandomIndex();
    const value2 = generateRandomIndex();
    return value1 + " " + value2;
}

function compute() {
    
};
