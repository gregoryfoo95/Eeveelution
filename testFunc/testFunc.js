function transpose(matrix) {
        for (let i=0; i<matrix.length;i++) {
            for (let j=0; j<i; j++) {
                const temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            };
        };
        return matrix;
}

function checkFullBoard(arr) {
        emptyState = false;
        rowLoop: for (let i = 0; i < BOARD_WIDTH; i++) {
            columnLoop: for (let j = 0; j < BOARD_WIDTH; j++) {
                if (arr[i][j] === "") {
                    emptyState = true;
                    break rowLoop;
                }
            };
        };

        if (emptyState === false) {
            console.log("checkLose()");
        };
}

function addTwoFour(arr) {
        let emptyTiles = [];
        let indices;
        let newTiles = [2,4];

        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                
                if (arr[i][j] === "") {
                    emptyTiles.push(i + " " + j);
                };
            };
        };

        if (emptyTiles.length > 0) {
            indices = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            arr[indices.split(" ")[0]][indices.split(" ")[1]] = newTiles[Math.floor(Math.random() * newTiles.length)];
        };
        console.log("runs checkFullBoard()");

        return arr;
}

function checkWinner(arr) {
    let winnerTier = 0;
    let gameStatus = 0;
    rowLoop: for (let i = 0; i < BOARD_WIDTH; i++) {
    columnLoop: for (let j = 0; j < BOARD_WIDTH;j++) {
                    if (arr[i][j] === 2048 && winnerTier === 0) {
                        winnerTier = 1;
                        gameStatus = 1;
                        //break rowLoop;
                    };
                    
                    if (arr[i][j] === 4096 && winnerTier < 2) {
                        winnerTier = 2;
                        gameStatus = 1;
                        //break rowLoop;
                    };
                    
                    if (arr[i][j] === 8192 && winnerTier < 3) {
                        winnerTier = 3;
                        gameStatus = 1;
                        //break rowLoop;
                    };

                    if (arr[i][j] === 16384 && winnerTier < 4) {
                        winnerTier = 4;
                        gameStatus = 1;
                        //break rowLoop;
                    };
                };
            };

    switch (winnerTier) {
        case 1:
            winnerTier = 1;
            gameStatus = 1;
            break;
        case 2:
            winnerTier = 2;
            gameStatus = 1;
            break;
        case 3:
            winnerTier = 3;
            gameStatus = 1;
            break;
        case 4:
            winnerTier = 4;
            gameStatus = 1;
            break;
    };
    return [winnerTier, gameStatus];
};

function checkLose(arr) {
        let gameOver = true;
        rowLoop: for (let i = 0; i < BOARD_WIDTH; i++) {
            columnLoop: for (let j = 0; j < BOARD_WIDTH-1; j++) {
                if (arr[i][j] === arr[i][j+1]) {
                    gameOver = false;
                    break rowLoop;
                };
            };
        };

        if (gameOver) {
            rowLoop: for (let j = 0; j < BOARD_WIDTH; j++) {
                columnLoop: for (let i = 0; i < BOARD_WIDTH-1; i++) {
                    if (arr[i][j] === arr[i+1][j]) {
                        gameOver = false;
                        break rowLoop;
                    };
                };
            };
        };

        if (gameOver) {
            console.log("Good luck next time! Eevee has decided to look for a better pokemon trainer...");
        };

        return gameOver;
}

function checkForMove(currArray, prevArray, direction) {
        let addStatus = 0;
        const VERT = "vert";
        const HOR = "hor";
        if (direction === VERT) {
            columnLoop: for (let j = 0; j < BOARD_WIDTH; j++) {
                rowLoop:    for (let i = 0; i < BOARD_WIDTH; i++) {
                                if (currArray[i][j] !== prevArray[i][j]) {
                                    addStatus = 1;
                                    direction = "";
                                    break columnLoop;
                                };
                            };
                        };
        } else if (direction === HOR) {
            rowLoop: for (let i = 0; i < BOARD_WIDTH; i++) {
                columnLoop: for (let j = 0; j < BOARD_WIDTH; j++) {
                    if (currArray[i][j] !== prevArray[i][j]) {
                        addStatus = 1;
                        direction = "";
                        break rowLoop;
                    };
                };
            };
        }
        return addStatus;
};

function flushLeft(arr) {
        let bigArray = [];
        for (let i=0;i<BOARD_WIDTH;i++) {
            let subArray = [];
            let empty = 0;
            for (let j=0;j<BOARD_WIDTH;j++) {
                if (arr[i][j] !== "") {
                    subArray.push(arr[i][j]);
                } else {
                    empty += 1;
                };
            };

            for (let k = 0; k < empty; k++) {
                subArray.push("");
            };
            
            bigArray.push(subArray);
        };
        arr = bigArray;

        return arr;
};

function mergeLeft(score, arr) {
        for (let i=0;i<BOARD_WIDTH;i++) {
            for (let j=0;j<BOARD_WIDTH-1;j++) {
                if (arr[i][j] === arr[i][j+1]) {
                    arr[i][j] += arr[i][j+1];
                    arr[i][j+1] = "";
                    if (arr[i][j] === "") {
                        score += 0;
                    } else {
                        score += parseInt(arr[i][j]);
                    };
                };
            };
        };
        console.log("Execute checkWinner()");
        return [score, arr];
}

function flushRight(arr) {
        let bigArray = [];
        for (let i=0;i<BOARD_WIDTH;i++) {
            let subArray = [];
            let empty = 0;
            for (let j=BOARD_WIDTH-1;j>=0;j--) {
                if (arr[i][j] !== "") {
                    subArray.unshift(arr[i][j]);
                } else {
                    empty += 1;
                };
            };
            for (let k = 0; k < empty; k++) {
                subArray.unshift("");
            };
            bigArray.push(subArray);
        };   

        arr = bigArray;
        return arr;
};

function mergeRight(score, arr) {
        for (let i=0;i<BOARD_WIDTH;i++) {
            for (let j=BOARD_WIDTH-1;j>0;j--) {
                if (arr[i][j] === arr[i][j-1]) {
                    arr[i][j] += arr[i][j-1];
                    arr[i][j-1] = "";
                    if (arr[i][j] === "") {
                        score += 0;
                    } else {
                        score += parseInt(arr[i][j]);
                    };
                };
            };
        };
        console.log("Execute checkWinner()");

        return [score, arr];
    }

function flushUp(arr) {
        let newArray = transpose(arr);
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
        arr = transpose(bigArray);
        return arr;
    }

   function mergeUp(score, arr) {
        let newArray = transpose(arr);
        for (let i=0;i<BOARD_WIDTH;i++) {
            for (let j=0;j<BOARD_WIDTH;j++) {
                if (arr[i][j] === arr[i][j+1]) {
                    arr[i][j] += arr[i][j+1];
                    arr[i][j+1] = "";
                    if (arr[i][j] === "") {
                        score += 0;
                    } else {
                        score += parseInt(arr[i][j]);
                    };
                };
            };
        };
        arr = transpose(newArray);
        console.log("Execute checkWinner()");
        return [score,arr];
    }

function flushDown(arr) {
        let newArray = transpose(arr);
        let bigArray = [];
        for (let i=0;i<BOARD_WIDTH;i++) {
            let subArray = [];
            let empty = 0;
            for (let j=BOARD_WIDTH-1;j>=0;j--) {
                if (arr[i][j] !== "") {
                    subArray.unshift(arr[i][j]);
                } else {
                    empty += 1;
                };
            };
            for (let k = 0; k < empty; k++) {
                subArray.unshift("");
            };
            bigArray.push(subArray);
        };   
        arr = transpose(bigArray);

        return arr;
    }

function mergeDown(score, arr) {
        let newArray = transpose(arr);
        for (let i=0;i<BOARD_WIDTH;i++) {
            for (let j=BOARD_WIDTH-1;j>0;j--) {
                if (arr[i][j] === arr[i][j-1]) {
                    arr[i][j] += arr[i][j-1];
                    arr[i][j-1] = "";
                    if (arr[i][j] === "") {
                        score += 0;
                    } else {
                        score += parseInt(arr[i][j]);
                    };
                };
            };
        };
        arr = transpose(newArray);
        console.log("Execute checkWinner()");
        return [score, arr];
    }