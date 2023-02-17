//* Constants *//
const board_width = 4;
const directions = ["left", "right", "up", "down"];
const dirSymbols = ["←","→","↑","↓"];
const fixedInputs = [2,4,8,16,32,64,128,256,512,1024,2048];
const testing = false;
//* State Variables *//
let gameVars = {
    boardArray: [],
    gameStatus: "", // Progress - "", Win - "1", Loss - "-1";
    emptyState: {},
    numColor: {
        "" : "white",
        "2": "lightblue",
        "4": "lightyellow",
        "8": "lightgreen",
        "16": "orange"
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
    console.log("First Step: ", gameVars.boardArray);
    flushLeft();
    console.log("Post-Flush: ", gameVars.boardArray);
    mergeLeft();
    console.log("Post-Merge: ", gameVars.boardArray);
    flushLeft();
    console.log("Post-Flush: ", gameVars.boardArray);
    addTwo();
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
            }
        };
    };
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
            };
        };
    };
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
            };
        };
    };
    gameVars.boardArray = transpose(newArray);
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
            };
        };
    };
    gameVars.boardArray = transpose(newArray);
};

function renderBoard() {
    for (let i=0;i<board_width;i++) {
        for (let j=0;j<board_width;j++) {
            const targetBox = document.getElementById(i + " " + j);
            targetBox.textContent = gameVars.boardArray[i][j];
            targetBox.style.backgroundColor = gameVars.numColor[gameVars.boardArray[i][j]]
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
            //Initiate emptyState of Board Array
            gameVars.emptyState[i + " " + j] = 0;
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
        [2,"",2,""],
        [2,2,2,4],
        [2,"","",2],
        [2,2,"",2]
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

function addTwo() {
    let initIndex = identifyID();
    while (gameVars.boardArray[initIndex[0]][initIndex[1]] !== "") {
        initIndex = identifyID();
    
        //Need to cater for break when board is fully populated
    }
    gameVars.boardArray[initIndex[0]][initIndex[1]] = 2;
}

