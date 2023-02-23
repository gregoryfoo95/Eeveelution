//* Constants *//
const BOARD_WIDTH = 4;
const DIRECTIONS = ["left", "right", "up", "down"];
const DIRSYMBOLS = ["←","→","↑","↓"];
const NUMTILECOLOR = {
        "" : "white",
        "2": "lightblue",
        "4": "lightyellow",
        "8": "red",
        "16": "yellow",
        "32": "dodgerblue",
        "64": "#1c1c1c",
        "128": "violet",
        "256": "cyan",
        "512": "greenyellow",
        "1024": "peachpuff",
        "2048": "blanchedalmond",
        "4096": "black",
        "8192": "black",
        "16384": "azure",
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
        "512": "https://i.ibb.co/LhvX9fQ/Leafeon.png",
        "1024": "https://i.ibb.co/xMYW6Cw/Faryeon.png",
        "2048": "https://i.ibb.co/bLxLGmG/Team-Eevee.png",
        "4096": "https://i.ibb.co/XkTBbJq/gengar.jpg",
        "8192": "https://i.ibb.co/dsvLxSN/Gengar2.png",
        "16384": "https://i.ibb.co/XpSrXzs/Ditto.png"
    };

//* Game Variables (Model)*//
let gameVars = {
    boardArray: [],
    gameStatus: "",
    emptyState: "",
    score: "",
    playerName: "",
    resetStatus: "",
    checkHorOrVert: ""
};


//* Cached Variables *//
let body = document.querySelector('body');
let displayScreen = document.querySelector(".screen");
let tiles = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let scoreBoard = document.querySelector(".score");
let gameBoard = document.querySelector(".board");
let startBtn = document.querySelector(".start");
let banner = document.querySelector(".banner");
let form = document.querySelector("form");
let inputField  = document.querySelector(".playerName");

//* Functions *//

function init() {
    gameVars = {
        boardArray: [],
        gameStatus: "", // Progress - "", Win - "1", Loss - "0";
        emptyState: true,
        score: 0,
        playerName: "",
        resetStatus: 0,
        checkHorOrVert: ""
    };
    render.createBoard();
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
                    if (gameVars.boardArray[i][j] <= 16384) {
                        targetBox.innerHTML = "<img src =" + EEVEEIMAGES[gameVars.boardArray[i][j]] + ">" + "<div class=\"nums\">" + gameVars.boardArray[i][j] + "</div>" ;
                    }
                    scoreBoard.innerHTML = `${inputField.value}'s Score: ${parseInt(gameVars.score)}`;
                };
            };
        };
    },

    createBoard() {
        boardAction.initBoard();
        for (let i=0;i<BOARD_WIDTH;i++) {
            for (let j=0;j<BOARD_WIDTH;j++) {
                if (gameVars.resetStatus === 0) {
                    const newBox = document.createElement("span");
                    newBox.classList.add("box");
                    newBox.id = i + " " + j;
                    gameBoard.appendChild(newBox);
                };
            };
        };
    }
};

const gameAction = {
    checkWinner() {
        let winnerTier = 0;
        rowLoop: for (let i = 0; i < BOARD_WIDTH; i++) {
        columnLoop: for (let j = 0; j < BOARD_WIDTH;j++) {
            if (gameVars.boardArray[i][j] === 2048 && winnerTier === 0) {
                winnerTier = 1;
                gameVars.gameStatus = 1;
                //break rowLoop;
            };
            
            if (gameVars.boardArray[i][j] === 4096 && winnerTier < 2) {
                winnerTier = 2;
                gameVars.gameStatus = 1;
                //break rowLoop;
            };
            
            if (gameVars.boardArray[i][j] === 8192 && winnerTier < 3) {
                winnerTier = 3;
                gameVars.gameStatus = 1;
                //break rowLoop;
            };

            if (gameVars.boardArray[i][j] === 16384 && winnerTier < 4) {
                winnerTier = 4;
                gameVars.gameStatus = 1;
                //break rowLoop;
            };
        };
        };

        switch (winnerTier) {
            case 1:
                displayScreen.textContent = "You won the Team Eevee Badge!";
                break;
            case 2:
                displayScreen.textContent = "Hey, stop it. You shouldn't go further...";
                break;
            case 3:
                displayScreen.textContent = "Gengarr..... D.ii.eeee...";
                break;
            case 4:
                displayScreen.textContent = "Close call, it's just a ditto. Well, there's no other pokemon here. Escape or continue? Your call.";
                break;
        };
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
        gameVars.checkHorOrVert = "hor";
        const prevArray = JSON.parse(JSON.stringify(gameVars.boardArray));
        this.flushLeft();
        this.mergeLeft();
        this.flushLeft();
        boardAction.checkForMove(prevArray);
        gameVars.checkHorOrVert = "";
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
        gameVars.checkHorOrVert = "hor";
        const prevArray = JSON.parse(JSON.stringify(gameVars.boardArray))
        this.flushRight();
        this.mergeRight();
        this.flushRight();
        boardAction.checkForMove(prevArray);
        gameVars.checkHorOrVert = "";
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
        gameVars.checkHorOrVert = "vert";
        const prevArray = JSON.parse(JSON.stringify(gameVars.boardArray))
        this.flushUp();
        this.mergeUp();
        this.flushUp();
        boardAction.checkForMove(prevArray);
        gameVars.checkHorOrVert = "";
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
        gameVars.checkHorOrVert = "vert";
        const prevArray = JSON.parse(JSON.stringify(gameVars.boardArray))
        this.flushDown();
        this.mergeDown();
        this.flushDown();
        boardAction.checkForMove(prevArray);
        gameVars.checkHorOrVert = "";
    }
};

const boardAction = {
    addTwoFour() {
        let emptyTiles = [];
        let indices;
        const newTiles = [2,4];

        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                
                if (gameVars.boardArray[i][j] === "") {
                    emptyTiles.push(i + " " + j);
                };
            };
        };

        if (emptyTiles.length > 0) {
            indices = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            gameVars.boardArray[indices.split(" ")[0]][indices.split(" ")[1]] = newTiles[Math.floor(Math.random() * newTiles.length)];
        };

        this.checkFullBoard();
    },

    checkFullBoard() {
        gameVars.emptyState = false;
        rowLoop: for (let i = 0; i < BOARD_WIDTH; i++) {
            columnLoop: for (let j = 0; j < BOARD_WIDTH; j++) {
                if (gameVars.boardArray[i][j] === "") {
                    gameVars.emptyState = true;
                    break rowLoop;
                }
            };
        };

        if (gameVars.emptyState === false) {
            gameAction.checkLose();
        };
    },

    checkForMove(prevArray) {
        if (gameVars.checkHorOrVert === "vert") {
            prevArray = mathFunc.transpose(prevArray);
        };
    
        rowLoop: for (let i = 0; i < BOARD_WIDTH; i++) {
            columnLoop: for (let j = 0; j < BOARD_WIDTH; j++) {
                if (gameVars.boardArray[i][j] !== prevArray[i][j]) {
                    this.addTwoFour();
                    break rowLoop;
                };
            };
        };
    },

    initBoard() {
        for (let i=0;i<BOARD_WIDTH;i++) {
            gameVars.boardArray[i] = [];
            for (let j=0;j<BOARD_WIDTH;j++) {
                gameVars.boardArray[i][j] = "";
            };
        };
        this.addTwoFour()
        this.addTwoFour();
    }
};


const handlers = {
    handleStartPress(e) {
        e.preventDefault();
        if (gameBoard.style.display === "none") {
            gameBoard.style.display = "grid";
            banner.style.display = "grid";
            form.style.display = "none";
        
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
        render.updateBoard();
        gameVars.resetStatus = 0;
        displayScreen.innerHTML = "EEVEELUTION";

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
    },

    handleSwipe(e) {
        let direction = e.offsetDirection;
        console.log(direction);
        switch (direction) {
            case 4:
                tileAction.swipeRight();
                break;
            case 2:
                tileAction.swipeLeft();
                break;
            case 8:
                tileAction.swipeUp();
                break;
            case 16:
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
    }
}

//* Event Listeners *//
startBtn.addEventListener("click", handlers.handleStartPress);
resetBtn.addEventListener("click", handlers.handleResetPress);
const manager = new Hammer.Manager(gameBoard);
const Swipe = new Hammer.Swipe();
manager.add(Swipe);
manager.on('swipe', handlers.handleSwipe);