# EEVEELUTION (2048 Spin-off)

## Project Background

The 2048 is a single-player sliding tile puzzle game that was previously developed by Italian Web Developer Gabriele Cirulli and published on GitHub. Likewise, as a budding software developer, I have a strong desire to create a game that I can call my own. This game was originally developed in Javascript and CSS over a weekend and it is the exact same scenario for myself personally. How apt can that be!

## Project Description
The objective of the game is to slide tiles on a grid to merge them together to achieve the ultimate goal of the cutest Eevee evolution form. 

## Timeframe

4 Working Days

## Deployment 

The game is deployed on Github pages and you can access the game here:
https://gregoryfoo95.github.io/2048_Game/

## Technologies Utilized

- HTML
- Javascript
- CSS
- Git for Version Control
- Window Powershell for Command Line Prompt

## Gameplay!

The goal of the game is to attain the "Team Eevee" badge, with a scoreboard attached as well with the summation of the inherent values of all merged tiles. The player must utilise the keyboard directional keys to dictate the movement of the tiles.

## Wireframe Sketch & User Story
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

## Development Timeline and Approach

The game was designed using the Model-View-Controller (MVC) architectural framework. A summarised developmental timeline is as shown below:

| Achievables | Duration |
| :--- | :----------- |
| Generate and Render Board, Display Screen, Scoreboard and Tiles | 1 Day |
| Generate random "Pokeball" Tile, flush and merge action | 1 Day |
| Add peripheral logic to compute score and display messages to User | 0.5 Day |
| Perform CSS styling and User Experience | 0.5 Day |
| Stress-test for edge cases and subsequent troubleshooting | 1 Day |

### Model

The **Model** refers to the game's data that is required to be tracked and hereby referred to as the "states". In Eeveelution, the states are tracked under the Javascript object, _gameVars_. The state variables include the tile positions on the board, game status (In progress/Win/Loss), tracker for empty positions on board, player's accumulated score, player's username, tracker for reset button pressed, tracker for form's rendering and a tracker for horizontal/vertical directions of player's movement. These state variables in _gameVars_ would be updated by the **Controller** during the game.

```javascript
//* Game Variables (Model)*//
let gameVars = {
    boardArray: [],
    gameStatus: "",
    emptyState: true,
    score: 0,
    playerName: "",
    resetStatus: 0,
    formStatus: 1,
    checkHorOrVert: ""
};
```

### View
The **View** is essentially what the user interacts with on the web browser. This is accomplished by using two rendering functions that were designed to cater for two scenarios: (1) Initial Render and (2) Post-User-Action Render. This is seen from _render.createBoard()_ and _render.updateBoard()_. _render.createBoard()_ depicts a fresh new board whenever the user initiates the game/resets the game while in play. _render.updateBoard()_ serves to update the tiles' position on the board after every user's turn.

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

### Controller

## Key Takeaways

The MVC architectural framework had provided me a fundamental approach which I can abide to, allowing my code to be more testable, reusable and extendable. This would serve to be an extremely paramount takeaway as I venture into large scale products after graduation from General Assembly's Software Engineering Immersive Course. I have wired my programming brain to adopt a Data-Centric mindset, in which the Data (state) is the single source of truth and the DOM is secondary to data manipulation. 

## Future Works

- Allow the rendered gameboard to cater for scalable size increment/reduction on HTML and CSS
- Include timer function to increase difficulty for user
- Link up with database for scoreboard tracking
- Perform animated movements for flush/merge and addition of new "Pokeball" tile.
- Cater for Mobile Phone Styling and Touch Screen Swipe
- Writing cleaner code logic

