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
    playerName: "",
    resetStatus: 0,
    formStatus: 1,
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
let inputField  = document.querySelector(".playerName");



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

function init() {
    render.createBoard();
    if (TESTING) {
        boardTesting();
    } else {
        boardAction.randomTwo();
    };
    render.updateBoard();
    document.addEventListener("keydown", handlers.handleArrowPress);
};

const render = {
    updateBoard() {
        for (let i=0;i<BOARD_WIDTH;i++) {
            for (let j=0;j<BOARD_WIDTH;j++) {
                const targetBox = document.getElementById(i + " " + j);
                targetBox.textContent = gameVars.boardArray[i][j];
                targetBox.style.backgroundColor = NUMTILECOLOR[gameVars.boardArray[i][j]]
                if (gameVars.boardArray[i][j] !== "") {
                    targetBox.innerHTML = "<img src =" + EEVEEIMAGES[gameVars.boardArray[i][j]] + ">";
                    scoreBoard.innerHTML = `${inputField.value}'s Score: ${parseInt(gameVars.score)}`;
                };
            };
        };
    },

    createBoard() {
        for (let i=0;i<BOARD_WIDTH;i++) {
            gameVars.boardArray[i] = [];
            for (let j=0;j<BOARD_WIDTH;j++) {
                //Create Board DOM element
                gameVars.boardArray[i][j] = "";
                if (gameVars.resetStatus === 0) {
                    const newBox = document.createElement("span");
                    newBox.classList.add("box");
                    newBox.id = i + " " + j;
                    gameBoard.appendChild(newBox);
                };
            };
        };
    },


};

const gameAction = {
    checkWinner() {
        rowLoop: for (let i = 0; i < BOARD_WIDTH; i++) {
        columnLoop: for (let j = 0; j < BOARD_WIDTH;j++) {
            if (gameVars.boardArray[i][j] === 2048) {
                displayScreen.textContent = "You won the Team Eevee Badge!";
                gameVars.gameStatus = 1;
                break rowLoop;
            };
        };
        }
    },

    checkLose() {
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
    },

};

const tileAction = {
    flushLeft() {
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
    },

    mergeLeft() {
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
        gameAction.checkWinner();
    },

    swipeLeft() {
        this.flushLeft();
        this.mergeLeft();
        this.flushLeft();
        boardAction.addTwo();
    },

    flushRight() {
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
    },

    mergeRight() {
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
        gameAction.checkWinner();
    },

    swipeRight() {
        this.flushRight();
        this.mergeRight();
        this.flushRight();
        boardAction.addTwo();
    },

    flushUp() {
        let newArray = mathFunc.transpose(gameVars.boardArray);
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
        gameVars.boardArray = mathFunc.transpose(bigArray);
    },

    mergeUp() {
        let newArray = mathFunc.transpose(gameVars.boardArray);
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
        gameVars.boardArray = mathFunc.transpose(newArray);
        gameAction.checkWinner();
    },

    swipeUp() {
        this.flushUp();
        this.mergeUp();
        this.flushUp();
        boardAction.addTwo();
    },

    flushDown() {
        let newArray = mathFunc.transpose(gameVars.boardArray);
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
        gameVars.boardArray = mathFunc.transpose(bigArray);
    },

    mergeDown() {
        let newArray = mathFunc.transpose(gameVars.boardArray);
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
        gameVars.boardArray = mathFunc.transpose(newArray);
        gameAction.checkWinner();
    },

    swipeDown() {
        this.flushDown();
        this.mergeDown();
        this.flushDown();
        boardAction.addTwo();
    }
}

const boardAction = {
    randomTwo() {
        let initIndexOne = mathFunc.generateRandomIndices();
        let initIndexTwo = mathFunc.generateRandomIndices();
        while (initIndexOne[0] === initIndexTwo[0] && initIndexOne[1] === initIndexTwo[1] 
            && gameVars.boardArray[initIndexOne[0]][initIndexOne[1]] !== "" 
            && gameVars.boardArray[initIndexTwo[0]][initIndexTwo[1]] !== "") {
            initIndexOne = mathFunc.generateRandomIndices();
            initIndexTwo = mathFunc.generateRandomIndices();
        };
        gameVars.boardArray[initIndexOne[0]][initIndexOne[1]] = 2;
        gameVars.boardArray[initIndexTwo[0]][initIndexTwo[1]] = 2;
    },

    addTwo() {
        let initIndex = mathFunc.generateRandomIndices();
        while (gameVars.boardArray[initIndex[0]][initIndex[1]] !== "") {
            this.checkFullBoard();
            if (gameVars.emptyState === false) {
                break;
            } else {
                initIndex = mathFunc.generateRandomIndices();
            };
        };

        if (gameVars.gameStatus === "" && gameVars.emptyState === true) {
            gameVars.boardArray[initIndex[0]][initIndex[1]] = 2;
        };
    },

    checkFullBoard() {
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
            gameAction.checkLose();
        };
    }
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

const handlers = {
    handleStartPress(e) {
        e.preventDefault();
        if (gameBoard.style.display === "none") {
            gameBoard.style.display = "grid";
            banner.style.display = "flex";
            form.style.display = "none";
            gameVars.formStatus = 1;
        
        } else {
            gameBoard.style.display = "none";
        };
        init();
    },

    handleResetPress(e) {
        e.preventDefault();
        gameVars = {
        boardArray: [],
        gameStatus: "", // Progress - "", Win - "1", Loss - "0";
        emptyState: true,
        score: 0,
        resetStatus: 1
        };
        render.createBoard();
        boardAction.randomTwo();
        render.updateBoard();
        gameVars.resetStatus = 0;

    },

    handleArrowPress(e) {
        e.preventDefault();
        const clicked = e.code;
        switch(clicked) {
            case "ArrowLeft":
                tileAction.swipeLeft();
                break;
            case "ArrowRight":
                tileAction.swipeRight();
                break;
            case "ArrowUp":
                tileAction.swipeUp();
                break;
            case "ArrowDown":
                tileAction.swipeDown();
                break;
        };
        render.updateBoard();
    }
};

const mathFunc = {
    transpose(matrix) {
        for (let i=0; i<matrix.length;i++) {
            for (let j=0; j<i; j++) {
                const temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            };
        };
        return matrix;
    },

    generateRandomIndices() {
        return [Math.floor(Math.random()*BOARD_WIDTH), Math.floor(Math.random()*BOARD_WIDTH)];
    }
}


//Function for testing, delete later
function boardTesting() {
    gameVars.boardArray = [
        ["",2,"",2],
        [2,"","",2],
        [2,8,"",32],
        [2,8,"",2]
    ];
}

//* Event Listeners *//
startBtn.addEventListener("click", handlers.handleStartPress);
resetBtn.addEventListener("click", handlers.handleResetPress);


swipedetect(document, function(swipedir){
    if (swipedir =='left') {
        tileAction.swipeLeft();
    }

    }
);

function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}