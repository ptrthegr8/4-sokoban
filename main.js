let gameBoard = document.getElementById("gameBoard");
let playerDiv = document.getElementById("player");

let posX = 2;
let posY = 2;
let tempVar = ""
// const map = [
//     "  WWWWW ",
//     "WWW   W ",
//     "WOSB  W ",
//     "WWW BOW ",
//     "WOWWB W ",
//     "W W O WW",
//     "WB XBBOW",
//     "W   O  W",
//     "WWWWWWWW"
// ];
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
console.log(mapAltered);
//LEGEND
// "W" is a wall.
// "S" is the player's starting position and the player character.
// " " spaces are open floor.
// "O" is an initially empty storage location.
// "B" is the starting position of a box/crate.
// "X" is a storage location that starts with a box already on it.
//DRAWS BOARD
function drawBoard() {
    document.getElementById("gameBoard").innerHTML = "";
    for (let r = 0; r < mapAltered.length; r++) {
        let row = document.createElement("div");
        row.classList.add("row");
        for (let c = 0; c < mapAltered[r].length; c++) {
            switch (mapAltered[r][c]) {
                case "W":
                    let wall = document.createElement("div");
                    wall.classList.add("wall", "cell", "column");
                    row.appendChild(wall);
                    break;
                case "O":
                    let finish = document.createElement("div");
                    finish.classList.add("finish", "cell", "column");
                    row.appendChild(finish);
                    break;
                case "S":
                    let playerDiv = document.createElement("div");
                    playerDiv.classList.add("cell", "column");
                    playerDiv.setAttribute("id", "player");
                    row.appendChild(playerDiv);
                    break;
                case "X":
                    let alreadyBoxed = document.createElement("div");
                    alreadyBoxed.classList.add("cell", "column", "already-boxed");
                    row.appendChild(alreadyBoxed);
                    break;
                case "B":
                    let box = document.createElement("div");
                    box.classList.add("cell", "column", "box-class");
                    row.appendChild(box);
                    break;
                case " ":
                    let empty = document.createElement("div");
                    empty.classList.add("cell", "column");
                    row.appendChild(empty);
            }
        }
        gameBoard.appendChild(row);
    }
}
//

drawBoard()
//KEYBOARD LOGIC 
document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    console.log(mapAltered);
    console.log('key: ' + keyName);
    // RIGHT ARROW
    if (keyName === "ArrowRight") {
        if (mapAltered[posY][posX] === "S") {
            // moves box if next space is empty
            if (mapAltered[posY][posX + 1] === "B" && mapAltered[posY][posX + 2] === " ") {
                mapAltered[posY][posX] = " ";
                mapAltered[posY][posX + 1] = "S";
                mapAltered[posY][posX + 2] = "B";
                posX++;
                drawBoard();
            } else if (mapAltered[posY][posX + 1] === " ") {
                //moves player to empty space
                mapAltered[posY][posX] = " ";
                mapAltered[posY][posX + 1] = "S";
                posX++;
                drawBoard();
            } else if (mapAltered[posY][posX + 1] === "B" && mapAltered[posY][posX + 2] === "O") {
                //moves box to empty storage location
                mapAltered[posY][posX] = " ";
                mapAltered[posY][posX + 1] = "S"
                mapAltered[posY][posX + 2] = "X";
                posX++;
                drawBoard();
            }
        }
    }
    // LEFT ARROW
    if (keyName === "ArrowLeft") {
        if (mapAltered[posY][posX] === "S") {
            //moves player to empty space
            if (mapAltered[posY][posX - 1] === " ") {
                mapAltered[posY][posX] = " ";
                mapAltered[posY][posX - 1] = "S";
                posX--;
                drawBoard();
            } else if (mapAltered[posY][posX - 1] === "B" && mapAltered[posY][posX - 2] === " ") {
                //moves box if next cell is empty
                mapAltered[posY][posX] = " ";
                mapAltered[posY][posX - 1] = "S";
                mapAltered[posY][posX - 2] = "B";
                posX--;
                drawBoard();
            } else if (mapAltered[posY][posX - 1] === "B" && mapAltered[posY][posX - 2] === "O") {
                //moves box to empty storage location
                mapAltered[posY][posX] = " ";
                mapAltered[posY][posX - 1] = "S"
                mapAltered[posY][posX - 2] = "X";
                posX--;
                drawBoard();

            }
        }
    }
    // DOWN ARROW
    if (keyName === "ArrowDown") {
        if (mapAltered[posY][posX] === "S") {
            // moves player down to empty space
            if (mapAltered[posY + 1][posX] === " ") {
                mapAltered[posY + 1][posX] = "S";
                mapAltered[posY][posX] = " ";
                posY++;
                drawBoard();
            } else if (mapAltered[posY + 1][posX] === "O") { //moves player to empty storage location ***
                tempVar = "O";
                mapAltered[posY][posX] = " ";
                mapAltered[posY + 1][posX] = "S";
                posY++;
                drawBoard();
            } else if (mapAltered[posY + 1][posX] === "B" && mapAltered[posY + 2][posX] === " ") {
                //moves box if next cell is empty
                mapAltered[posY][posX] = " ";
                mapAltered[posY + 1][posX] = "S";
                mapAltered[posY + 2][posX] = "B";
                posY++;
                drawBoard();
            } else if (mapAltered[posY + 1][posX] === "B" && mapAltered[posY + 2][posX] === "O") {
                //moves player to empty storage location
                mapAltered[posY][posX] = " ";
                mapAltered[posY + 1][posX] = "S";
                mapAltered[posY + 2][posX] = "X";
                posY++;
                drawBoard();
            }
        }
    }
    // UP ARROW
    if (keyName === "ArrowUp") {
        if (mapAltered[posY][posX] === "S") {
            //moves player to empty space
            if (mapAltered[posY - 1][posX] === " ") {
                mapAltered[posY - 1][posX] = "S";
                mapAltered[posY][posX] = " ";
                posY--;
                drawBoard();
            } else if (mapAltered[posY - 1][posX] === "B" && mapAltered[posY - 2][posX] === " ") {
                //moves box if next cell is empty
                mapAltered[posY][posX] = " ";
                mapAltered[posY - 1][posX] = "S";
                mapAltered[posY - 2][posX] = "B";
                posY--;
                drawBoard();
            } else if (mapAltered[posY - 1][posX] === "B" && mapAltered[posY - 2][posX] === "O") {
                //moves player to empty storage location
                mapAltered[posY][posX] = " ";
                mapAltered[posY - 1][posX] = "S";
                mapAltered[posY - 2][posX] = "X";
                posY--;
                drawBoard();
            }
        }
    }
    //
});