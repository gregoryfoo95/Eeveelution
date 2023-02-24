let assert = chai.assert;
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
        assert.equal(arrTwoFour, arrAddTwoFourFull,"To check no changes were done to original array");
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