let gameBoard = document.getElementById("gameBoard");
let playerGoesThroughGoal = false;
var map = [
    "  WWWWW ",
    "WWW   W ",
    "WOSB  W ",
    "WWW BOW ",
    "WOWWB W ",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
];
//MAKES NESTED ARRAY 
let mapAltered = [];
for (let i = 0; i < map.length; i++) {
    mapAltered.push(map[i].split(""));
}
let playerPosition = [];
let boxPositions = [];
let targetPositions = [];
//DRAWS BOARD
    function drawBoard() {
        document.getElementById("gameBoard").innerHTML = "";
        for (let r = 0; r < mapAltered.length; r++) {
            let row = document.createElement("div");
            row.classList.add("row");
            for (let c = 0; c < mapAltered[r].length; c++) {
                switch (mapAltered[r][c]) {
                    // "W" is a wall.
                    case "W":
                    let wall = document.createElement("div");
                    wall.classList.add("wall", "cell");
                    row.appendChild(wall);
                    break;
                    // "O" is an initially empty storage location.
                    case "O":
                    let finish = document.createElement("div");
                    finish.classList.add("finish", "cell");
                    row.appendChild(finish);
                    break;
                    // "S" is the player's starting position and the player character.
                    case "S":
                    let playerDiv = document.createElement("div");
                    playerDiv.classList.add("cell");
                    playerDiv.setAttribute("id", "player");
                    row.appendChild(playerDiv);
                    break;
                    // "X" is a storage location that starts with a box already on it.
                    case "X":
                    let alreadyBoxed = document.createElement("div");
                    alreadyBoxed.classList.add("cell", "already-boxed");
                    row.appendChild(alreadyBoxed);
                    break;
                    // "B" is the starting position of a box/crate.
                    case "B":
                    let box = document.createElement("div");
                    box.classList.add("cell", "box-class");
                    row.appendChild(box);
                    break;
                    // " " spaces are open floor.
                    case " ":
                    let empty = document.createElement("div");
                    empty.classList.add("cell");
                    row.appendChild(empty);
            }
        }
        gameBoard.appendChild(row);
    }
}
//calls function to initialize board
drawBoard();
//checks for winner
function winnerChickenDinner() {
    let isThereAWinner = false;
    for (let i = 0; i < mapAltered.length; i++) {
        if (mapAltered[i].indexOf("B") > -1) {
            isThereAWinner = true;
        }
    }
    return isThereAWinner;
}
//function to determine if can move and where 
function move(destRow, destCol, keyDirection) {
    let playerRow = playerPosition[0];
    let playerCol = playerPosition[1];
    let rowAheadOne = playerRow + destRow;
    let rowAheadTwo = playerRow + (destRow + destRow);
    let columnAheadOne = playerCol + destCol;
    let columnAheadTwo = playerCol + (destCol + destCol);
    // right and left arrows
    switch (keyDirection) {
        case "rightLeft":
            if (playerGoesThroughGoal === false) {
                // moves box if next space is empty
                if (mapAltered[playerRow][columnAheadOne] === "B" && mapAltered[playerRow][columnAheadTwo] === " ") {
                    mapAltered[playerRow][playerCol] = " ";
                    mapAltered[playerRow][columnAheadOne] = "S";
                    mapAltered[playerRow][columnAheadTwo] = "B";
                    drawBoard();
                } else if (mapAltered[playerRow][columnAheadOne] === " ") {
                    //moves player to empty space
                    mapAltered[playerRow][playerCol] = " ";
                    mapAltered[playerRow][columnAheadOne] = "S";
                    drawBoard();
                } else if (mapAltered[playerRow][columnAheadOne] === "B" && mapAltered[playerRow][columnAheadTwo] === "O") {
                    //moves box to empty storage location
                    mapAltered[playerRow][playerCol] = " ";
                    mapAltered[playerRow][columnAheadOne] = "S"
                    mapAltered[playerRow][columnAheadTwo] = "X";
                    drawBoard();
                } else if (mapAltered[playerRow][columnAheadOne] === "O") { //moves player to empty storage location ***
                    playerGoesThroughGoal = true;
                    mapAltered[playerRow][playerCol] = " ";
                    mapAltered[playerRow][columnAheadOne] = "S";
                    drawBoard();
                } else if (mapAltered[playerRow][columnAheadOne] === "X" && mapAltered[playerRow][columnAheadTwo] === " ") {
                    //moves box from filled storage location ***
                    playerGoesThroughGoal = true;
                    mapAltered[playerRow][playerCol] = " ";
                    mapAltered[playerRow][columnAheadOne] = "S";
                    mapAltered[playerRow][columnAheadTwo] = "B";
                    drawBoard();
                }
                // IF PLAYER COMES FROM EMPTY STORAGE
            } else if (playerGoesThroughGoal === true) {
                if (mapAltered[playerRow][columnAheadOne] === "B" && mapAltered[playerRow][columnAheadTwo] === " ") {
                    mapAltered[playerRow][columnAheadTwo] = "B";
                    mapAltered[playerRow][columnAheadOne] = "S";
                    mapAltered[playerRow][playerCol] = "O";
                    playerGoesThroughGoal = false;
                    drawBoard();
                } else if (mapAltered[playerRow][columnAheadOne] === "B" && mapAltered[playerRow][columnAheadTwo] === "O") {
                    // move box from storage
                    mapAltered[playerRow][columnAheadTwo] = "X";
                    mapAltered[playerRow][columnAheadOne] = "S";
                    mapAltered[playerRow][playerCol] = "O";
                    playerGoesThroughGoal = false;
                    drawBoard();
                } else if (mapAltered[playerRow][columnAheadOne] === " ") {
                    // move to empty floor
                    mapAltered[playerRow][columnAheadOne] = "S";
                    mapAltered[playerRow][playerCol] = "O";
                    playerGoesThroughGoal = false;
                    drawBoard();
                } else if (mapAltered[playerRow][columnAheadOne] === "O") {
                    // move player from empty storage
                    mapAltered[playerRow][columnAheadOne] = "S";
                    mapAltered[playerRow][playerCol] = "O";
                    playerGoesThroughGoal = false;
                    drawBoard();
                }
            }
            break;
        case "upDown":
            // up and down arrows
            if (playerGoesThroughGoal === false) {
                //moves player to empty space
                if (mapAltered[rowAheadOne][playerCol] === " ") {
                    mapAltered[rowAheadOne][playerCol] = "S";
                    mapAltered[playerRow][playerCol] = " ";
                    drawBoard();
                } else if (mapAltered[rowAheadOne][playerCol] === "B" && mapAltered[rowAheadTwo][playerCol] === " ") {
                    //moves box if next cell is empty
                    mapAltered[playerRow][playerCol] = " ";
                    mapAltered[rowAheadOne][playerCol] = "S";
                    mapAltered[rowAheadTwo][playerCol] = "B";
                    drawBoard();
                } else if (mapAltered[rowAheadOne][playerCol] === "B" && mapAltered[rowAheadTwo][playerCol] === "O") {
                    //moves box to empty storage location
                    mapAltered[playerRow][playerCol] = " ";
                    mapAltered[rowAheadOne][playerCol] = "S";
                    mapAltered[rowAheadTwo][playerCol] = "X";
                    drawBoard();
                } else if (mapAltered[rowAheadOne][playerCol] === "O") { //moves player to empty storage location ***
                    playerGoesThroughGoal = true;
                    mapAltered[playerRow][playerCol] = " ";
                    mapAltered[rowAheadOne][playerCol] = "S";
                    drawBoard();
                } else if (mapAltered[rowAheadOne][playerCol] === "X" && mapAltered[rowAheadTwo][playerCol] === " ") {
                    //moves box from filled storage location ***
                    playerGoesThroughGoal = true;
                    mapAltered[playerRow][playerCol] = " ";
                    mapAltered[rowAheadOne][playerCol] = "S";
                    mapAltered[rowAheadTwo][playerCol] = "B";
                    drawBoard();
                }
                // IF PLAYER COMES FROM EMPTY STORAGE
            } else if (playerGoesThroughGoal === true) {
                if (mapAltered[rowAheadOne][playerCol] === "B" && mapAltered[rowAheadTwo][playerCol] === " ") {
                    mapAltered[rowAheadTwo][playerCol] = "B";
                    mapAltered[rowAheadOne][playerCol] = "S";
                    mapAltered[playerRow][playerCol] = "O";
                    playerGoesThroughGoal = false;
                    drawBoard();
                } else if (mapAltered[rowAheadOne][playerCol] === "B" && mapAltered[rowAheadTwo][playerCol] === "O") {
                    // move box from storage
                    mapAltered[rowAheadTwo][playerCol] = "X";
                    mapAltered[rowAheadOne][playerCol] = "S";
                    mapAltered[playerRow][playerCol] = "O";
                    playerGoesThroughGoal = false;
                    drawBoard();
                } else if (mapAltered[rowAheadOne][playerCol] === " ") {
                    // move to empty floor
                    mapAltered[rowAheadOne][playerCol] = "S";
                    mapAltered[playerRow][playerCol] = "O";
                    playerGoesThroughGoal = false;
                    drawBoard();
                } else if (mapAltered[rowAheadOne][playerCol] === "O") {
                    // move player from empty storage
                    mapAltered[rowAheadOne][playerCol] = "S";
                    mapAltered[playerRow][playerCol] = "O";
                    playerGoesThroughGoal = false;
                    drawBoard();
                }
            }
    }
    if (winnerChickenDinner() === false) {
        setTimeout(function () {
            alert("You are the Soko-man!");
            mapAltered = [];
            for (let i = 0; i < map.length; i++) {
                mapAltered.push(map[i].split(""));
            }
            drawBoard();
        }, 100);
    }
}
// event handler for key presses
document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    playerPosition = [];
    boxPositions = [];
    targetPositions = [];
    // finds player row and column and pushes to array 
    for (let i = 0; i < mapAltered.length; i++) {
        if (mapAltered[i].indexOf("S") > -1) {
            playerPosition.push(i, mapAltered[i].indexOf("S"))
        }
    };
    console.log(playerPosition);
    for (let i = 0; i < mapAltered.length; i++) {
        for (let j = 0; j < mapAltered[i].length; j++) {
            // finds box row and column --> pushes to array
            if (mapAltered[i][j] === "B") {
                boxPositions.push(i, j)
            // finds target row and column --> pushes to array
            } else if ((mapAltered[i][j] === "O")) {
                targetPositions.push(i, j)
            }
        }
    };
    // executes move according to key pressed
    switch (keyName) {
        case "ArrowRight":
            move(0, 1, "rightLeft");
            break;
        case "ArrowLeft":
            move(0, -1, "rightLeft");
            break;
        case "ArrowDown":
            move(1, 0, "upDown");
            break;
        case "ArrowUp":
            move(-1, 0, "upDown");
    }
});
//