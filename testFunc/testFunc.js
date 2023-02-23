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