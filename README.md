# **_EEVEELUTION (2048 Spin-off)_**

# **Game Background**

The 2048 is a single-player sliding tile puzzle game that was previously developed by Italian Web Developer Gabriele Cirulli and published on GitHub. Likewise, as a budding software developer, I have a strong desire to create a game that I can call my own. This game was originally developed in Javascript and CSS over a weekend and it is the exact same scenario for myself personally. How apt can that be!

# **Project Description**
The objective of the game is to slide tiles on a grid to merge them together to achieve the ultimate goal of the cutest Eevee evolution form. 

# **Timeframe**

4 Working Days

# **Deployment** 

The game is deployed on Github pages and you can access the game here:
https://gregoryfoo95.github.io/2048_Game/

# **Technologies Utilized**

- HTML
- Javascript
- CSS
- Git for Version Control
- Window Powershell for Command Line Prompt

# **Gameplay!**

The goal of the game is to attain the "Team Eevee" badge, with a scoreboard attached as well with the summation of the inherent values of all merged tiles. The player must utilise the keyboard directional keys to dictate the movement of the tiles.

# **Wireframe Sketch & User Story**
## Initial Sketch
![Initial Sketch](https://github.com/gregoryfoo95/2048_Game/blob/main/Ideation/Initial%20Wireframe.png?raw=true)

| As a User, I ...                              |                 and this happens!    
| :---------------------------------------      |:-----------------------------------------------|
| type my pokemon trainer usernames             |  fills in the input field with the desired name
| click start game                              |  renders the gameboard and observe two filled tiles
| press a keyboard arrow key (PC)               |  observe all tiles flush/merge towards select direction
| swipe in a direction (Mobile)                 |  observe all tiles flush/merge towards select direction
| see a change in images                        |  similar neighbouring tiles merged and summed together
|                                               |  score increases by summed value (points start from 2 till 2048 for respective tiles)
| see a random addition of "Pokeball/Eevee" tile|  a new "Pokeball/Eevee" tile is generated because a physical flush/merge of tiles occurred
| do not see a random addition of tiles         |  no physical move is possible with the chosen direction
| see a "Team Eevee" tile generated             |  sees congratulatory message on the display board at the top
| see zero available moves left                 |  sees message notifying on the loss on the display board at the top 
| restart the game                              |  starts a new game

# **Development Timeline and Approach**

The game was designed using the Model-View-Controller (MVC) architectural framework. A summarised developmental timeline is as shown below:

| Achievables | Duration |
| :--- | :----------- |
| Generate and Render Board, Display Screen, Scoreboard and Tiles | 1 Day |
| Generate random "Pokeball" Tile, flush and merge action | 1 Day |
| Add peripheral logic to compute score and display messages to User | 0.5 Day |
| Perform CSS styling and User Experience | 0.5 Day |
| Stress-test for edge cases and subsequent troubleshooting | 1 Day |

## **Model:**

The **Model** refers to the game's data that is required to be tracked and hereby referred to as the "states". In Eeveelution, the states are tracked under the Javascript object, _gameVars_. The state variables include the tile positions on the board, game status (In progress/Win/Loss), tracker for empty positions on board, player's accumulated score, player's username, tracker for reset button pressed, tracker for form's rendering and a tracker for horizontal/vertical directions of player's movement. These state variables in _gameVars_ would be updated by the **Controller** during the game. Below illustrates the intialized values of the state variables after _init()_ is executed.

```js
let gameVars = {
    boardArray: [],
    gameStatus: "",
    emptyState: true,
    score: 0,
    playerName: "",
    resetStatus: 0,
    checkHorOrVert: ""
};
```

## **View:**
The **View** is essentially what the user interacts with on the web browser. This is accomplished by using two rendering functions that were designed to cater for two scenarios: (1) Initial Render and (2) Post-User-Action Render. This is seen from _render.createBoard()_ and _render.updateBoard()_. 

_render.createBoard()_ depicts a fresh new board whenever the user initiates the game/resets the game while in play.

<details><summary>render.createBoard()</summary>

```js
const render = {
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
```
</details>
<br>

_render.updateBoard()_ serves to update the latest tile positions on the board after the user's action. The individual tiles are cached by their _id_, which was assigned during _render.createBoard(). Each respective tile's _backgroundColor_ and _innerHTML_ are updated with the updated state variables within _gameVars_. 

<details><summary>render.updateBoard()</summary>

```javascript
const render = {
    updateBoard() {
        for (let i=0;i<BOARD_WIDTH;i++) {
            for (let j=0;j<BOARD_WIDTH;j++) {
                const targetBox = document.getElementById(i + " " + j);
                targetBox.textContent = gameVars.boardArray[i][j];
                targetBox.style.backgroundColor = NUMTILECOLOR[gameVars.boardArray[i][j]]
                if (gameVars.boardArray[i][j] !== "") {
                    if (gameVars.boardArray[i][j] <= 2048) {
                        targetBox.innerHTML = "<img src =" + EEVEEIMAGES[gameVars.boardArray[i][j]] + ">";
                    }
                    scoreBoard.innerHTML = `${inputField.value}'s Score: ${parseInt(gameVars.score)}`;
                };
            };
        };
    },
};
```
</details>
<br>

The **View** is equipped to listen to user interactions through _keyboard_ and _swipe_ events on PC and Mobile devices respectively with the help of _event-listeners_ to DOM elements.

## **Controller:**

The **Controller** is the main brain of EEVEELUTION, which contains bulk of the app's Javascript logic, excluding the state variables (**Model**). In an MVC architecture, the controller would provide the linkage between the **Model** and the **View** to update the state variables and render a new illustration to the user.

A sequence of event flow is documented here to appreciate the linkages between **Controllers** and **View/Model**.

1. User clicks on "Start" button to intialize the game board. This triggers the event-listener in _handlers_ to create the game board with two random "2"/"4" tiles. The **Model** (_gameVars.boardArray_) is first altered before rendering to the **View** (game board).

2. User swipes on the game board/clicks on keyboard directional buttons to trigger event-listeners in _handlers_ to flush/merge/add random tile to the game board. At every tile merge, _gameAction.checkWinner() is executed to check for "2048"/"Sylveon". At the end of flush/merge, _boardAction.checkForMove() is executed to check for physical alterations to the game board before the addition of a random "2"/"4" tile. No random tile should be added if no movements are identified. 

3. While every _boardAction.addTwoFour()_ is executed, a _boardAction.checkFullBoard_ is executed to identify a fully populated game board. If this is true, a _gameAction.checkLose()_ is executed to ensure no possible moves are available before declaring a loss to the user.

4. User clicks on "Reset" button to re-initialize the game state variables and re-renders the game board.

A summary of EEVEELUTION's controllers:
| Controllers                               |                 Functionality   
| :---------------------------------------  |:-----------------------------------------------|
| **_handlers_**                            |
| .handleStartPress(e)                      | handles user's start button press to initiate the game
| .handleResetPress(e)                      | handles user's reset button press to reset the board 
| .handleArrowPress(e)                      | handles user's keyboard directional arrow press (PC)
| .handleSwipe (e)                          | handles user's finger directional swipes (Mobile)
| **_boardAction_**                         |
| .addTwoFour()                             | adds "2"/"4" tiles to the board if board has empty slots
| .checkFullBoard()                         | checks if board is not full, else check for loss 
| .checkForMove(prevArray)                  | checks if board altered after user action, if altered, add "2"/"4" tile as empty space created
| .initBoard()                              | initializes the board with empty "" tiles
| **_gameAction_**                          | 
| .checkWinner()                            | checks through the array for a "2048" tile
| .checkLose                                | checks through the array both horizontally and vertically for no similar neighbouring tiles to identify loss
| **_tileAction_**: _Only "Left" direction is documented below_ 
| .flushLeft()                              | pushes all tiles towards left to cover empty slots
| .mergeLeft()                              | merges similar neighbouring tiles towards left
| .swipeLeft()                              | combination of _.flushLeft()_, _.mergeLeft()_ and _boardAction.checkForMove()_ to process tile movements, and add "2"/"4" tile only if there are empty spaces present/generated by the movement

<details><summary>handlers</summary>

```js
const handlers = {
    handleStartPress(e) {
        e.preventDefault();
        if (gameBoard.style.display === "none") {
            gameBoard.style.display = "grid";
            banner.style.display = "grid";
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
                console.log(JSON.parse(JSON.stringify(gameVars.boardArray)));
                break;
            case "ArrowRight":
                tileAction.swipeRight();
                console.log(JSON.parse(JSON.stringify(gameVars.boardArray)));
                break;
            case "ArrowUp":
                tileAction.swipeUp();
                console.log(JSON.parse(JSON.stringify(gameVars.boardArray)));
                break;
            case "ArrowDown":
                tileAction.swipeDown();
                console.log(JSON.parse(JSON.stringify(gameVars.boardArray)));
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
```
</details>

<details><summary>boardAction</summary>

```js
const boardAction = {
    addTwoFour() {
        let emptyTiles = [];
        let indices;
        let newTiles = [2,4];

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
```
</details>

<details><summary>gameAction</summary>

```js
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
```
</details>
<details><summary>tileAction</summary>

```js
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
        const prevArray = gameVars.boardArray;
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
        const prevArray = gameVars.boardArray;
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
        const prevArray = gameVars.boardArray;
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
        const prevArray = gameVars.boardArray;
        this.flushDown();
        this.mergeDown();
        this.flushDown();
        boardAction.checkForMove(prevArray);
        gameVars.checkHorOrVert = "";
    }
}
```

</details>
# **Key Takeaways**

The MVC architectural framework had provided me a fundamental approach which I can abide to, allowing my code to be more testable, reusable and extendable. This would serve to be an extremely paramount takeaway as I venture into large scale products after graduation from General Assembly's Software Engineering Immersive Course. I have wired my programming brain to adopt a Data-Centric mindset, in which the Data (state) is the single source of truth and the DOM is secondary to data manipulation. 

# **Future Works**

- Allow the rendered gameboard to cater for scalable size increment/reduction on HTML and CSS
- Include timer function to increase difficulty for user
- Link up with backend and database for scoreboard tracking
- Perform animations for flush/merge and addition of new "Pokeball" tile.
- Writing cleaner code logic using Functional Programming

