const assert = chai.assert;
const BOARD_WIDTH =4;
let emptyState;

describe("Transpose function", function () {
    let arr = [
        [1,2,2,1],
        [2,1,1,2],
        [1,2,2,1],
        [0,0,0,0]
    ];

    let arrAns = [
        [1,2,1,0],
        [2,1,2,0],
        [2,1,2,0],
        [1,2,1,0]
    ];

    it("Transposes a matrix", function () {
        arr = transpose(arr);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j =0; j < BOARD_WIDTH; j++) {
                assert.strictEqual(arr[i][j], arrAns[i][j],"The array elements are not equal");
            };
        };
    });
});

describe("Check if board is empty", function () {
    const arrFull = [
        [1,2,2,1],
        [2,1,1,2],
        [1,2,2,1],
        [0,0,0,0]
    ];

    const arrNotFull = [
        [1,2,2,""],
        [2,"",1,2],
        [1,2,"",1],
        [0,0,0,0]
    ];

    it("Unfilled array" , function () {
        checkFullBoard(arrNotFull);
        assert.strictEqual(emptyState, true,"To check if board has an empty position");
    });

    it("filled array" , function () {
        checkFullBoard(arrFull);
        assert.strictEqual(emptyState, false,"To check if board is full");
    });
})

describe("Check if addTwoFour is working for full and unfilled array", function () {

    let arrAddTwoFour = [
        ["","","",""],
        ["",4,"",2],
        ["","","",""],
        ["","","",""]
    ];

    let arrAddTwoFourFull = [
        [1,2,1,0],
        [2,1,2,0],
        [2,1,2,0],
        [1,2,1,0]
    ];

    it("Unfilled array" , function () {
        let filledCountA = 0;
        let filledCountB = 0;
        const prevArray = JSON.parse(JSON.stringify(arrAddTwoFour)); // deep copy instead of pass by reference
        const nextArray = addTwoFour(arrAddTwoFour);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                if (nextArray[i][j] !== "") {
                    filledCountA += 1;
                }
                if (prevArray[i][j] !== "") {
                    filledCountB += 1;
                }
            };
        };
        assert.strictEqual(filledCountA, filledCountB + 1,"To check if unfilled array was added with a 2/4 tile");
    });

    it("filled array" , function () {
        const arrTwoFour = addTwoFour(arrAddTwoFourFull);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                assert.equal(arrTwoFour[i][j], arrAddTwoFourFull[i][j],"To check no changes were done to original array");
            };
        };
    });
})

describe("Check if checkWinner() is able to detect different tiered winners", function () {
    it("Check for 2048", function() {
        let gameStatus;
        let winnerTier;
        const arr = [
            ["","","",""],
            ["","","",""],
            ["",4,2,2048],
            [16,"",32,""]
        ];
        [winnerTier, gameStatus] = checkWinner(arr);
        console.log(winnerTier,gameStatus);
        assert.equal(winnerTier, 1);
        assert.equal(gameStatus,1);
    });

    it("Check for 4096", function() {
        let gameStatus;
        let winnerTier;
        const arr = [
            ["","","",""],
            [2048,4096,"",""],
            ["",4,2,2048],
            [16,4096,32,""]
        ];
        [winnerTier, gameStatus] = checkWinner(arr);
        console.log(winnerTier,gameStatus);
        assert.equal(winnerTier, 2);
        assert.equal(gameStatus,1);
    });

    it("Check for 8192", function() {
        let gameStatus;
        let winnerTier;
        const arr = [
            ["","","",""],
            [2048,4096,"",""],
            ["",4,2,2048],
            [16,4096,32,8192]
        ];
        [winnerTier, gameStatus] = checkWinner(arr);
        console.log(winnerTier,gameStatus);
        assert.equal(winnerTier, 3);
        assert.equal(gameStatus,1);
    });

    it("Check for 16384", function() {
        let gameStatus;
        let winnerTier;
        const arr = [
            ["","","",""],
            [2048,4096,16384,""],
            ["",4,2,2048],
            [16,4096,32,""]
        ];
        [winnerTier, gameStatus] = checkWinner(arr);
        console.log(winnerTier,gameStatus);
        assert.equal(winnerTier, 4);
        assert.equal(gameStatus,1);
    });
})

describe("Check if checkLose() is able to detect different array combinations provided to it", function () {
    it("Check if a board which has empty slots will not be deemed as loss", function (){
    const arr = [
        ["",2,"",""],
        ["","",4,""],
        ["","","",""],
        ["",8,"",""]
    ];

    assert.equal(checkLose(arr), false);
    });

    it("Check if a board which has vertical combinations left will not be deemed as loss", function (){
    const arr = [
        [16,2,16,8],
        [2,32,4,16],
        [4,16,2,256],
        [2,8,16,256]
    ];

    assert.equal(checkLose(arr), false);
    });

    it("Check if a board which has horizontal combinations left will not be deemed as loss", function (){
    const arr = [
        [16,2,16,8],
        [2,32,4,16],
        [4,16,256,256],
        [2,8,16,2]
    ];

    assert.equal(checkLose(arr), false);
    });

    it("Check if a board which has no combinations left will be deemed as loss", function (){
    const arr = [
        [16,2,16,8],
        [2,32,4,16],
        [4,16,256,4],
        [2,8,16,2]
    ];

    assert.equal(checkLose(arr), true);
    });

});

describe("Check if checkForMove() is able to effectively detect possible combination", function () {
    const HOR = "hor";
    const VERT = "vert";
    const prevArray = [
        ["","","",""],
        ["","","",""],
        [2,4,2,8],
        ["","","",""]
    ];

    const currArray = [
        [2,4,2,8],
        ["","","",""],
        ["","","",""],
        ["","","",""]
    ];
    it("Check if checkForMove() is able to effectively detect for no possible combination vertically upwards", function () {
        assert.equal(checkForMove(prevArray,currArray,VERT), 1, "Nothing was added")
    });
});

describe("Check if flushLeft() is functional", function () {
    it("Check if all tiles which are supposed to move left, indeed moved", function () {
        let prevArr = [
            ["","","",4],
            ["",2,"",4],
            ["",4,4,""],
            [2,"",8,""]
        ];

        const currArr = [
            [4,"","",""],
            [2,4,"",""],
            [4,4,"",""],
            [2,8,"",""]
        ];

        prevArr = flushLeft(prevArr);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                assert.equal(prevArr[i][j],currArr[i][j],"The resulting array was not flushed properly");
            };
        };
    });
});

describe("Check if mergeLeft() is functional", function () {
    it("Check if score summation is performed correctly", function () {
        let prevArr = [
            ["","",4,4],
            ["",2,4,4],
            ["",8,4,""],
            [2,8,8,""]
        ];

        let score = 0;
        const correctScore = 32;

        [score, arr] = mergeLeft(score, prevArr);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                assert.equal(score, correctScore,"Score does not tally");
            };
        };
    });

    it("Check if all tiles which are supposed to merge left, indeed merged", function () {
        let prevArr = [
            ["","",4,4],
            ["",2,4,4],
            ["",8,4,""],
            [2,8,8,""]
        ];

        const currArr = [
            ["","",8,""],
            ["",2,8,""],
            ["",8,4,""],
            [2,16,"",""]
        ];

        let score = 0;

        [score, arr] = mergeLeft(score, prevArr);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                assert.equal(arr[i][j], currArr[i][j],"Array does not tally");
            };
        };
    });
});

describe("Check if flushRight() is functional", function () {
    it("Check if all tiles which are supposed to move right, indeed moved", function () {
        let prevArr = [
            ["","","",4],
            ["",2,"",4],
            ["",4,4,""],
            [2,"",8,""]
        ];

        const currArr = [
            ["","","",4],
            ["","",2,4],
            ["","",4,4],
            ["","",2,8]
        ];

        prevArr = flushRight(prevArr);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                assert.equal(prevArr[i][j],currArr[i][j],"The resulting array was not flushed properly");
            };
        };
    });
});

describe("Check if mergeRight() is functional", function () {
    it("Check if score summation is performed correctly", function () {
        let prevArr = [
            ["","",4,4],
            [2,2,4,4],
            ["",4,4,""],
            [2,"",8,""]
        ];

        let score = 0;
        const correctScore = 28;

        [score, arr] = mergeLeft(score, prevArr);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                assert.equal(score, correctScore,"Score does not tally");
            };
        };
    });

    it("Check if all tiles which are supposed to merge right, indeed merged", function () {
        let prevArr = [
            ["","",4,4],
            [2,2,4,4],
            ["",4,4,""],
            [2,"",8,""]
        ];

        const currArr = [
            ["","","",8],
            ["",4,"",8],
            ["","",8,""],
            [2,"",8,""]
        ];

        let score = 0;

        [score, arr] = mergeRight(score, prevArr);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                assert.equal(arr[i][j], currArr[i][j],"Array does not tally");
            };
        };
    });
});

describe("Check if flushUp() is functional", function () {
    it("Check if all tiles which are supposed to move up, indeed moved", function () {
        let prevArr = [
            ["","","",4],
            ["",2,"",4],
            ["",4,4,""],
            [2,"",8,""]
        ];

        const currArr = [
            [2,2,4,4],
            ["",4,8,4],
            ["","","",""],
            ["","","",""]
        ];

        prevArr = flushUp(prevArr);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                assert.equal(prevArr[i][j],currArr[i][j],"The resulting array was not flushed properly");
            };
        };
    });
});

describe("Check if mergeUp() is functional", function () {
    it("Check if score summation is performed correctly", function () {
        let prevArr = [
            ["","","",4],
            ["",2,"",4],
            ["",4,4,""],
            [2,"",8,""]
        ];

        let score = 0;
        const correctScore = 8;

        [score, arr] = mergeUp(score, prevArr);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                assert.equal(score, correctScore,"Score does not tally");
            };
        };
    });

    it("Check if all tiles which are supposed to merge up, indeed merged", function () {
        let prevArr = [
            ["","","",4],
            ["",2,"",4],
            ["",4,4,""],
            [2,"",8,""]
        ];

        const currArr = [
            ["","","",8],
            ["",2,"",""],
            ["",4,4,""],
            [2,"",8,""]
        ];

        let score = 0;

        [score, arr] = mergeUp(score, prevArr);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                assert.equal(arr[i][j], currArr[i][j],"Array does not tally");
            };
        };
    });
});

describe("Check if flushDown() is functional", function () {
    it("Check if all tiles which are supposed to move down, indeed moved", function () {
        let prevArr = [
            ["","","",4],
            ["",2,"",4],
            ["",4,4,""],
            [2,"",8,""]
        ];

        const currArr = [
            ["","","",""],
            ["","","",""],
            ["",2,4,4],
            [2,4,8,4]
        ];

        prevArr = flushDown(prevArr);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                assert.equal(prevArr[i][j],currArr[i][j],"The resulting array was not flushed properly");
            };
        };
    });
});

describe("Check if mergeDown() is functional", function () {
    it("Check if score summation is performed correctly", function () {
        let prevArr = [
            ["","","",4],
            ["",2,"",4],
            ["",4,4,""],
            [2,"",8,""]
        ];

        let score = 0;
        const correctScore = 8;

        [score, arr] = mergeDown(score, prevArr);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                assert.equal(score, correctScore, "Score does not tally");
            };
        };
    });

    it("Check if all tiles which are supposed to merge down, indeed merged", function () {
        let prevArr = [
            ["","","",4],
            ["",2,"",4],
            ["",4,4,""],
            [2,"",8,""]
        ];

        const currArr = [
            ["","","",""],
            ["",2,"",8],
            ["",4,4,""],
            [2,"",8,""]
        ];

        let score = 0;

        [score, arr] = mergeDown(score, prevArr);
        for (let i = 0; i < BOARD_WIDTH; i++) {
            for (let j = 0; j < BOARD_WIDTH; j++) {
                assert.equal(arr[i][j], currArr[i][j], "Array does not tally");
            };
        };
    });
});