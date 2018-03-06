let gameBoard = document.getElementById("gameBoard");
var playerTop = 100;
var playerLeft = 100;
let boxLeft = 200;
let posX = 2;
let posY = 2;
winningPos = 0;
const map = [
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
// "W" is a wall.
// "S" is the player's starting position, and 
// " " spaces are open floor. 
//This map also uses three new characters:
// "O" is an initially empty storage location.
// "B" is the starting position of a box/crate.
// "X" is a storage location that starts with a box already on it.
for (var r = 0; r < map.length; r++) {
    var row = document.createElement("div");
    row.classList.add("row");
    for (var c = 0; c < map[r].length; c++) {
        switch (map[r][c]) {
            case "W":
                var wall = document.createElement("div");
                wall.classList.add("wall", "cell", "column");
                row.appendChild(wall);
                break;
            case "O":
                var finish = document.createElement("div");
                finish.classList.add("finish", "cell", "column");
                row.appendChild(finish);
                break;
            case "S":
                var start = document.createElement("div");
                start.classList.add("start", "cell", "column");
                row.appendChild(start);
                break;
            case "X":
                var alreadyBoxed = document.createElement("div");
                alreadyBoxed.classList.add("cell", "column", "already-boxed");
                row.appendChild(alreadyBoxed);
                break;
            case "B":
                var box = document.createElement("div");
                box.classList.add("cell", "column", "box-class");
                row.appendChild(box);
                break;
            case " ":
                var empty = document.createElement("div");
                empty.classList.add("cell", "column");
                row.appendChild(empty);

        }
    }
    gameBoard.appendChild(row);
}


'use strict';

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    console.log('keydown event\n\n' + 'key: ' + keyName);
    if (keyName === "ArrowDown") {
        if (posY < 9 && posY > 0) {
            if (map[posY + 1][posX] !== "W") {
                playerTop += 50;
                posY += 1;
                document.getElementById("player").style.top = playerTop + "px";
            }
        }
    }
    //
    if (keyName === "ArrowUp") {
        if (posY < 9 && posY > 0) {
            if (map[posY - 1][posX] !== "W" ) {
                playerTop -= 50;
                posY -= 1;
                document.getElementById("player").style.top = playerTop + "px";
            }
        }

    }
    //
    if (keyName === "ArrowRight") {
        if (posX < 8 && posX >= 0) {
            if (map[posY][posX + 1] !== "W") {
                posX += 1;
                playerLeft += 50;
                document.getElementById("player").style.left = playerLeft + "px";
                // if (map[posY][posX + 1] === "B") {
                //     boxLeft += 50;
                //     document.getElementsByClassName("box-class").style.left = boxLeft + "px";
                //     console.log(boxLeft);
                // }
            }
        }
    }
    //
    if (keyName === "ArrowLeft") {
        if (posX < 8 && posX >= 0) {
            if (map[posY][posX - 1] !== "W") {
                posX -= 1;
                playerLeft -= 50;
                document.getElementById("player").style.left = playerLeft + "px";
            }
        }
    }
    //
    if (winningPos === 7) {
        alert("You win!");
    }
});