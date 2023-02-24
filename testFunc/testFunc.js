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
