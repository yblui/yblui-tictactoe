const RANDOM_DRAW = ["Draw game!", "Nobody wins...", "It's a tie!"];
Game.prototype.crossTurn = true;
Game.prototype.crossScore = 0;
Game.prototype.circleScore = 0;
Game.prototype.crossWinStreak = 0;
Game.prototype.circleWinStreak = 0;
Game.prototype.crossTime = 5;
Game.prototype.circleTime = 5;
Game.prototype.board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
Game.prototype.boardKiller = [];
for (let i = 0; i < 3; i++) {
    Game.prototype.boardKiller[Game.prototype.boardKiller.length] = [
        [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ],
        [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ],
        [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    ]
}
Game.prototype.clickable = 0;
Game.prototype.setCount = 1;
Game.prototype.arrCross = [2, 2, 2];
Game.prototype.arrCircle = [2, 2, 2];
let game = new Game({
    "id": "game",
    "width": 1000,
    "height": 700,
    "scene": "menu",
    "bg": "white"
});
//functions
function win(array) {
    if ((array[0][0] == array[0][1] && array[0][1] == array[0][2] && array[0][0]) || (array[1][0] == array[1][1] && array[1][1] == array[1][2] && array[1][0]) || (array[2][0] == array[2][1] && array[2][1] == array[2][2] && array[2][0])
        || (array[0][0] == array[1][0] && array[1][0] == array[2][0] && array[0][0]) || (array[0][1] == array[1][1] && array[1][1] == array[2][1] && array[0][1]) || (array[0][2] == array[1][2] && array[1][2] == array[2][2] && array[0][2])
        || (array[0][0] == array[1][1] && array[1][1] == array[2][2] && array[0][0]) || (array[0][2] == array[1][1] && array[1][1] == array[2][0] && array[0][2])) {
        if ((array[0][0] == array[0][1] && array[0][1] == array[0][2] && array[0][0]) || (array[0][0] == array[1][0] && array[1][0] == array[2][0] && array[0][0])
            || (array[0][0] == array[1][1] && array[1][1] == array[2][2] && array[0][0])) {
            return array[0][0];
        } else if (array[1][0] == array[1][1] && array[1][1] == array[1][2] && array[1][0]) {
            return array[1][0];
        } else if (array[2][0] == array[2][1] && array[2][1] == array[2][2] && array[2][0]) {
            return array[2][0];
        } else if (array[0][1] == array[1][1] && array[1][1] == array[2][1] && array[0][1]) {
            return array[0][1];
        } else if ((array[0][2] == array[1][2] && array[1][2] == array[2][2] && array[0][2]) || (array[0][2] == array[1][1] && array[1][1] == array[2][0] && array[0][2])) {
            return array[0][2];
        }
    } else if (array[0][0] && array[0][1] && array[0][2] && array[1][0] && array[1][1] && array[1][2] && array[2][0] && array[2][1] && array[2][2]) {
        return "draw";
    } else {
        return null;
    }
}
function updateScore() {
    for (let i = 1; i <= 3; i++) {
        game.setText("xscore" + i, game.crossScore);
        game.setText("oscore" + i, game.circleScore);
    }
}
function winn() {
    let board2 = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            board2[i][j] = game.board[i][j][0];
        }
    }
    if (win(board2) != "draw" && win(board2) != null) return win(board2);
    else if (game.arrCircle.every(function (a) {
        return a == 0;
    }) && game.arrCross.every(function (a) {
        return a == 0;
    })) return "draw";
    else return null;
}
function hasAvailableMoves() {
    let largest = function () {
        if (((game.crossTurn) ? game.arrCross : game.arrCircle)[2] != 0) {
            return 3;
        } else if (((game.crossTurn) ? game.arrCross : game.arrCircle)[1] != 0) {
            return 2;
        } else {
            return 1;
        }
    }();
    let board2 = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
    let board3 = []
    for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
            board2[i][j] = (game.board[i][j][1]) ? game.board[i][j][1] : "";
        }
    }
    board3 = [].concat(...board2)
    board3.sort();
    return board3[0] == "" || Number(board3[0]) < largest;
}
function wink() {
    let tmp = Array.prototype.slice.call(game.board);
    tmp = tmp.flat().sort();
    let board2 = Array.prototype.slice.call(game.board);
    for (const element of board2) {
        for (let b = 0; b < board2.length; b++) {
            if (element[b] == "?") element[b] = "";
        }
    }
    if (tmp[0]) {
        if (!win(board2) || win(board2) == "draw") {
            return "draw";
        } else {
            return win(board2);
        }
    } else {
        if (win(board2)) {
            return win(board2);
        } else {
            return null;
        }
    }
}
function crossWin(basicScore, text) {
    game.crossScore += (game.crossWinStreak + basicScore);
    game.crossWinStreak++;
    game.circleWinStreak = 0;
    game.setText(text, "X wins!");
}
function circleWin(basicScore, text) {
    game.circleScore += (game.circleWinStreak + basicScore);
    game.circleWinStreak++;
    game.crossWinStreak = 0;
    game.setText(text, "O wins!");
}
function gameDraw(text) {
    game.circleScore++;
    game.crossScore++;
    game.crossWinStreak = 0;
    game.circleWinStreak = 0;
    game.setText(text, game.pick(RANDOM_DRAW));
}
//scenes
game.addScene("original");
game.addScene("numbers");
game.addScene("killer");
game.addScene("overtime");
game.addScene("result");

//sprites
let rect1 = game.createRect(0, 197, 600, 6, "black");
let rect2 = game.createRect(0, 397, 600, 6, "black");
let rect3 = game.createRect(197, 0, 6, 600, "black");
let rect4 = game.createRect(397, 0, 6, 600, "black");
game.addSprite("board", rect1, rect2, rect3, rect4);
let rect5 = game.createRect(0, 194 / 3 - 3, 200, 6, "gray");
let rect6 = game.createRect(0, 194 / 3 * 2 - 3, 200, 6, "gray");
let rect7 = game.createRect(194 / 3 - 3, 0, 6, 200, "gray");
let rect8 = game.createRect(194 / 3 * 2 - 3, 0, 6, 200, "gray");
game.addSprite("boardSm", rect5, rect6, rect7, rect8);
let rect9 = game.createRect(0, 197, 600, 6, "white");
let rect10 = game.createRect(0, 397, 600, 6, "white");
let rect11 = game.createRect(197, 0, 6, 600, "white");
let rect12 = game.createRect(397, 0, 6, 600, "white");
game.addSprite("boardWhite", rect9, rect10, rect11, rect12);
let blankRect = game.createRect(0, 0, 200, 200, "transparent");
game.addSprite("blank", blankRect);
let blankSm = game.createRect(0, 0, 200 / 3 - 6, 200 / 3 - 6, "transparent");
game.addSprite("blankSm", blankSm);
let oText = game.createText("O", 100, 150, {
    "font-size": "150px",
    "fill": "black"
});
game.addSprite("circle", oText);
let xText = game.createText("X", 100, 150, {
    "font-size": "150px",
    "fill": "black"
});
game.addSprite("cross", xText)
let oSm = game.createText("O", 100 / 3, 50, {
    "font-size": "50px",
    "fill": "white"
});
game.addSprite("circleSm", oSm);
let xSm = game.createText("X", 100 / 3, 50, {
    "font-size": "50px",
    "fill": "white"
});
game.addSprite("crossSm", xSm);
let xTransparent = game.createText("X", 100, 150, {
    "font-size": "150px",
    "fill": "white",
    "opacity": "0.5"
});
let rectx5 = game.createRect(0, 194 / 3 - 3, 200, 6, "gray");
let rectx6 = game.createRect(0, 194 / 3 * 2 - 3, 200, 6, "gray");
let rectx7 = game.createRect(194 / 3 - 3, 0, 6, 200, "gray");
let rectx8 = game.createRect(194 / 3 * 2 - 3, 0, 6, 200, "gray");
game.addSprite("crossTrans", xTransparent, rectx5, rectx6, rectx7, rectx8);
let oTransparent = game.createText("O", 100, 150, {
    "font-size": "150px",
    "fill": "white",
    "opacity": "0.5"
});
let recto5 = game.createRect(0, 194 / 3 - 3, 200, 6, "gray");
let recto6 = game.createRect(0, 194 / 3 * 2 - 3, 200, 6, "gray");
let recto7 = game.createRect(194 / 3 - 3, 0, 6, 200, "gray");
let recto8 = game.createRect(194 / 3 * 2 - 3, 0, 6, 200, "gray");
game.addSprite("circleTrans", oTransparent, recto5, recto6, recto7, recto8);
let num1 = game.createText("1", 200 / 6, 125, {
    "font-size": "50px",
    "fill": "gray"
})
game.addSprite("num1", num1);
let num2 = game.createText("2", 200 / 6, 125, {
    "font-size": "50px",
    "fill": "gray"
})
game.addSprite("num2", num2);
let num3 = game.createText("3", 200 / 6, 125, {
    "font-size": "50px",
    "fill": "gray"
})
game.addSprite("num3", num3);
let red1 = game.createText("1", 100, 150, {
    "fill": "#ff5757",
    "font-size": "150px"
});
game.addSprite("redn1", red1);
let red2 = game.createText("2", 100, 150, {
    "fill": "#ff5757",
    "font-size": "150px"
});
game.addSprite("redn2", red2);
let red3 = game.createText("3", 100, 150, {
    "fill": "#ff5757",
    "font-size": "150px"
});
game.addSprite("redn3", red3);
let blue1 = game.createText("1", 100, 150, {
    "fill": "#5a9fdb",
    "font-size": "150px"
});
game.addSprite("bluen1", blue1);
let blue2 = game.createText("2", 100, 150, {
    "fill": "#5a9fdb",
    "font-size": "150px"
});
game.addSprite("bluen2", blue2);
let blue3 = game.createText("3", 100, 150, {
    "fill": "#5a9fdb",
    "font-size": "150px"
});
game.addSprite("bluen3", blue3);
let bomb = game.createPath("M135.25 38.156c-16.082.46-32.345 7.235-46.47 17.407-17.216 12.4-31.534 30.2-37.31 50.687-5.78 20.488-1.95 44.032 16.155 63.406 14.573 15.595 19.996 29.328 20.563 40.5.566 11.173-3.554 20.304-10.376 27.406-13.643 14.206-37.278 17.995-50.5 6.094l-12.5 13.906c22.224 20.005 56.61 13.645 76.47-7.03 9.93-10.34 16.43-24.836 15.593-41.313-.836-16.478-8.83-34.407-25.594-52.345C67.18 141.782 65.16 126.6 69.47 111.312 73.78 96.025 85.484 80.97 99.72 70.72c14.233-10.253 30.704-15.365 43.218-13.44 9.566 1.474 17.565 6.055 23.062 17.44l15.938-9.19c-8.362-15.432-21.594-24.476-36.157-26.718-2.42-.372-4.866-.596-7.31-.656-1.07-.026-2.148-.03-3.22 0zM243.5 51.563l-120.125 69.374 24.906 43.157c15.03-18.11 33.446-33.898 55-46.344 20.615-11.903 42.444-19.803 64.595-23.938L243.5 51.563zm60.03 57.406c-1.026.01-2.065.034-3.092.06-29.894.803-60.05 8.877-87.813 24.907-88.84 51.298-119.255 164.55-68.03 253.282 51.222 88.73 164.505 119.013 253.343 67.717 88.837-51.295 119.223-164.55 68-253.28-34.666-60.05-97.713-93.346-162.407-92.688z",
    "black", {
    "transform": "scale(0.2)"
});
game.addSprite("bomb", bomb);
let bombWhite = game.createPath("M135.25 38.156c-16.082.46-32.345 7.235-46.47 17.407-17.216 12.4-31.534 30.2-37.31 50.687-5.78 20.488-1.95 44.032 16.155 63.406 14.573 15.595 19.996 29.328 20.563 40.5.566 11.173-3.554 20.304-10.376 27.406-13.643 14.206-37.278 17.995-50.5 6.094l-12.5 13.906c22.224 20.005 56.61 13.645 76.47-7.03 9.93-10.34 16.43-24.836 15.593-41.313-.836-16.478-8.83-34.407-25.594-52.345C67.18 141.782 65.16 126.6 69.47 111.312 73.78 96.025 85.484 80.97 99.72 70.72c14.233-10.253 30.704-15.365 43.218-13.44 9.566 1.474 17.565 6.055 23.062 17.44l15.938-9.19c-8.362-15.432-21.594-24.476-36.157-26.718-2.42-.372-4.866-.596-7.31-.656-1.07-.026-2.148-.03-3.22 0zM243.5 51.563l-120.125 69.374 24.906 43.157c15.03-18.11 33.446-33.898 55-46.344 20.615-11.903 42.444-19.803 64.595-23.938L243.5 51.563zm60.03 57.406c-1.026.01-2.065.034-3.092.06-29.894.803-60.05 8.877-87.813 24.907-88.84 51.298-119.255 164.55-68.03 253.282 51.222 88.73 164.505 119.013 253.343 67.717 88.837-51.295 119.223-164.55 68-253.28-34.666-60.05-97.713-93.346-162.407-92.688z",
    "white", {
    "transform": "scale(0.2)"
});
game.addSprite("bombWhite", bombWhite);
let bombRed = game.createPath("M135.25 38.156c-16.082.46-32.345 7.235-46.47 17.407-17.216 12.4-31.534 30.2-37.31 50.687-5.78 20.488-1.95 44.032 16.155 63.406 14.573 15.595 19.996 29.328 20.563 40.5.566 11.173-3.554 20.304-10.376 27.406-13.643 14.206-37.278 17.995-50.5 6.094l-12.5 13.906c22.224 20.005 56.61 13.645 76.47-7.03 9.93-10.34 16.43-24.836 15.593-41.313-.836-16.478-8.83-34.407-25.594-52.345C67.18 141.782 65.16 126.6 69.47 111.312 73.78 96.025 85.484 80.97 99.72 70.72c14.233-10.253 30.704-15.365 43.218-13.44 9.566 1.474 17.565 6.055 23.062 17.44l15.938-9.19c-8.362-15.432-21.594-24.476-36.157-26.718-2.42-.372-4.866-.596-7.31-.656-1.07-.026-2.148-.03-3.22 0zM243.5 51.563l-120.125 69.374 24.906 43.157c15.03-18.11 33.446-33.898 55-46.344 20.615-11.903 42.444-19.803 64.595-23.938L243.5 51.563zm60.03 57.406c-1.026.01-2.065.034-3.092.06-29.894.803-60.05 8.877-87.813 24.907-88.84 51.298-119.255 164.55-68.03 253.282 51.222 88.73 164.505 119.013 253.343 67.717 88.837-51.295 119.223-164.55 68-253.28-34.666-60.05-97.713-93.346-162.407-92.688z",
    "#ff5757", {
    "transform": "scale(0.2)"
});
game.addSprite("bombRed", bombRed);

//menu
game.p1 = prompt("Player 1:", "Unnamed");
game.p2 = prompt("Player 2:", "Unnamed");
game.addText("p1text", "menu", game.p1, 300, 350, {
    "font-size": "30px",
    "fill": "black"
});
game.addText("vs", "menu", "vs.", 500, 350, {
    "font-size": "30px",
    "fill": "gray"
});
game.addText("p2text", "menu", game.p2, 700, 350, {
    "font-size": "30px",
    "fill": "black"
});
game.addText("play", "menu", "Ready >", 500, 500, {
    "font-size": "30px",
    "fill": "#ff5757"
});
game.addText("heading", "menu", "Tictactoe!", 500, 290, {
    "font-size": "40px",
    "fill": "black"
});
game.whenClick("play", function () {
    setTimeout(() => {
        game.switchScene("original");
    }, 0)
});

//original
let arr = [0, 200, 400];
game.add("bomb1", "bomb", "original", 50, 100);
game.add("bomb2", "bomb", "original", 850, 100);
game.addText("time1", "original", "5.0", 110, 170, {
    "fill": "white",
    "font-size": "30px"
});
game.addText("time2", "original", "5.0", 910, 170, {
    "fill": "white",
    "font-size": "30px"
});
setInterval(() => {
    if (!game.gameOver) {
        if (game.crossTurn) {
            game.crossTime -= 1 / 60;
        } else {
            game.circleTime -= 1 / 60;
        }
        if (game.scene == "original") {
            game.setText(((game.crossTurn) ? "time1" : "time2"), Math.abs((((game.crossTurn) ? game.crossTime : game.circleTime) - 1 / 60)).toFixed((((game.crossTurn) ? game.crossTime : game.circleTime) >= 10) ? 0 : 1));
            if (game.crossTime <= 0) {
                circleWin(2, "red1");
                updateScore();
                game.gameOver = true;
            } else if (game.circleTime <= 0) {
                crossWin(2, "red1");
                updateScore();
                game.gameOver = true;
            }
        } else if (game.scene == "numbers") {
            game.setText(((game.crossTurn) ? "timen1" : "timen2"), Math.abs((((game.crossTurn) ? game.crossTime : game.circleTime) - 1 / 60)).toFixed((((game.crossTurn) ? game.crossTime : game.circleTime) >= 10) ? 0 : 1));
            if (game.crossTime <= 0) {
                circleWin(2, "red2");
                updateScore();
                game.arrCircle = [2, 2, 2];
                game.arrCross = [2, 2, 2];
                game.gameOver = true;
            } else if (game.circleTime <= 0) {
                crossWin(2, "red2");
                updateScore();
                game.arrCircle = [2, 2, 2];
                game.arrCross = [2, 2, 2];
                game.gameOver = true;
            }
        } else if (game.scene == "killer") {
            game.setText(((game.crossTurn) ? "timek1" : "timek2"), Math.abs((((game.crossTurn) ? game.crossTime : game.circleTime) - 1 / 60)).toFixed((((game.crossTurn) ? game.crossTime : game.circleTime) >= 10) ? 0 : 1));
            if (game.crossTime <= 0) {
                game.circleScore += 6;
                game.setText("red3", "O wins!");
                updateScore();
                game.gameOver = true;
            } else if (game.circleTime <= 0) {
                game.crossScore += 6;
                game.setText("red3", "X wins!");
                updateScore();
                game.gameOver = true;
            }
        }
    }
}, 1000 / 60)
arr.forEach(function (a) {
    arr.forEach(function (b) {
        game.add("rect" + (a / 200 * 3 + b / 200 + 1), "blank", "original", b + 200, a + 100);
    });
});
for (let m = 1; m <= 9; m++) {
    game.whenClick("rect" + m, function () {
        if (!game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3]) {
            if (!game.gameOver) {
                game.changeSprite("rect" + m, (game.crossTurn) ? "cross" : "circle");
                game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3] = (game.crossTurn) ? "x" : "o";
                game.crossTurn = !game.crossTurn;
            }
            if (win(game.board) && !game.gameOver) {
                let result = win(game.board);
                if (result == "o") {
                    circleWin(2, "red1");
                } else if (result == "x") {
                    crossWin(2, "red1");
                } else {
                    gameDraw("red1");
                }
                updateScore();
                setTimeout(function () {
                    game.gameOver = true;
                }, 0);
            }
        }
    });
}
game.add("boardUse", "board", "original", 200, 100);
game.addText("round1", "original", "Round 1", 500, 40, {
    "font-size": "30px",
    "fill": "black"
});
game.addText("red1", "original", "", 500, 70, {
    "font-size": "20px",
    "fill": "#ff5757"
});
game.addText("x1", "original", game.p1, 300, 40, {
    "font-size": "30px",
    "fill": "black"
});
game.addText("o1", "original", game.p2, 700, 40, {
    "font-size": "30px",
    "fill": "black"
});
game.addText("xscore1", "original", game.crossScore, 100, 40, {
    "font-size": "30px",
    "fill": "#ff5757"
});
game.addText("oscore1", "original", game.circleScore, 900, 40, {
    "font-size": "30px",
    "fill": "#5a9fdb"
});
game.whenClick("game", function () {
    if (game.gameOver) {
        game.gameOver = false;
        for (let i = 1; i <= 9; i++) {
            game.changeSprite("rect" + i, "blank");
            game.changeSprite("rectn" + i, "blank");
            for (let j = 1; j <= 9; j++) {
                game.changeSprite("rectk" + i + j, "blankSm");
            }
            game.changeSprite("boardsm" + i, "boardSm")
        }
        game.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        game.setText("red1", "");
        game.setText("red2", "");
        game.setText("red3", "");
        if (game.scene != "menu") {
            game.setCount++;
        }
        if (game.scene == "original") {
            game.setText("time1", "5.0");
            game.setText("time2", "5.0");
            game.crossTime = 5;
            game.circleTime = 5;
        } else if (game.scene == "numbers") {
            game.setText("timen1", "12");
            game.setText("timen2", "12");
            game.crossTime = 12;
            game.circleTime = 12;
        }
        if (game.setCount == 10 && game.scene == "original") {
            game.nextScene();
            game.crossTime = 12;
            game.circleTime = 12;
            game.setCount = 1;
        } else if (game.setCount == 10 && game.scene == "numbers") {
            game.nextScene();
            game.crossTime = 56;
            game.circleTime = 56;
        } else if (game.scene == "killer") {
            if (game.crossScore == game.circleScore) {
                game.nextScene();
                return;
            }
            game.setText("winnerName", (game.crossScore > game.circleScore) ? game.p1 : game.p2)
            game.switchScene("result");
        }
    }
});

//numbers
game.add("bombn1", "bomb", "numbers", 50, 100);
game.add("bombn2", "bomb", "numbers", 850, 100);
game.addText("timen1", "numbers", "10", 110, 170, {
    "fill": "white",
    "font-size": "30px"
});
game.addText("timen2", "numbers", "10", 910, 170, {
    "fill": "white",
    "font-size": "30px"
});
game.addText("round2", "numbers", "Round 2", 500, 40, {
    "font-size": "30px",
    "fill": "black"
});
arr.forEach(function (a) {
    arr.forEach(function (b) {
        game.add("rectn" + (a / 200 * 3 + b / 200 + 1), "blank", "numbers", b + 200, a + 100);
    });
});
for (let m = 1; m <= 9; m++) {
    game.whenClick("rectn" + m, function () {
        if (!game.gameOver && !game.board[0].includes("?") && !game.board[1].includes("?") && !game.board[2].includes("?")) {
            let condition1 = ((game.crossTurn) ? game.arrCross : game.arrCircle)[0] > 0 && (!game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3] || Number(game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3][1]) < 1)
            if (condition1) {
                game.add("num1" + m, "num1", "numbers", (m - 1) % 3 * 200 + 200, (m - 1 - (m - 1) % 3) / 3 * 200 + 100);
            }
            let condition2 = ((game.crossTurn) ? game.arrCross : game.arrCircle)[1] > 0 && (!game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3] || Number(game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3][1]) < 2)
            if (condition2) {
                game.add("num2" + m, "num2", "numbers", (m - 1) % 3 * 200 + 200 + 200 / 3, (m - 1 - (m - 1) % 3) / 3 * 200 + 100);
            }
            let condition3 = ((game.crossTurn) ? game.arrCross : game.arrCircle)[2] > 0 && (!game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3] || Number(game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3][1]) < 3)
            if (condition3) {
                game.add("num3" + m, "num3", "numbers", (m - 1) % 3 * 200 + 200 + 200 / 3 * 2, (m - 1 - (m - 1) % 3) / 3 * 200 + 100);
            }
            if (!condition1 && !condition2 && !condition3) {
                return;
            }
            game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3] = "?";
            for (let i = 1; i <= 3; i++) {
                game.whenClick("num" + i + m, function () {
                    game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3] = ((game.crossTurn) ? "x" : "o") + i;
                    game.changeSprite("rectn" + m, ((game.crossTurn) ? "redn" : "bluen") + i);
                    ((game.crossTurn) ? game.arrCross : game.arrCircle)[i - 1]--;
                    game.crossTurn = !game.crossTurn;
                    game.remove("num1" + m);
                    game.remove("num2" + m);
                    game.remove("num3" + m);
                    if (winn() && !game.gameOver) {
                        let result = winn();
                        if (result == "o") {
                            circleWin(2, "red2");
                        } else if (result == "x") {
                            crossWin(2, "red2");
                        } else {
                            gameDraw("red2");
                        }
                        updateScore();
                        game.arrCircle = [2, 2, 2];
                        game.arrCross = [2, 2, 2];
                        setTimeout(function () {
                            game.gameOver = true;
                        }, 0)
                    } else if (!hasAvailableMoves()) {
                        gameDraw("red2");
                        updateScore();
                        game.arrCircle = [2, 2, 2];
                        game.arrCross = [2, 2, 2];
                        setTimeout(function () {
                            game.gameOver = true;
                        }, 0)
                    }
                })
            }
        }
    })
}
game.add("boardUsen", "board", "numbers", 200, 100);
game.addText("red2", "numbers", "", 500, 70, {
    "font-size": "20px",
    "fill": "#ff5757"
});
game.addText("x2", "numbers", game.p1, 300, 40, {
    "font-size": "30px",
    "fill": "black"
});
game.addText("o2", "numbers", game.p2, 700, 40, {
    "font-size": "30px",
    "fill": "black"
});
game.addText("xscore2", "numbers", 0, 100, 40, {
    "font-size": "30px",
    "fill": "#ff5757"
});
game.addText("oscore2", "numbers", 0, 900, 40, {
    "font-size": "30px",
    "fill": "#5a9fdb"
});

//killer
game.add("bombk1", "bombWhite", "killer", 50, 100);
game.add("bombk2", "bombWhite", "killer", 850, 100);
game.addText("timek1", "killer", "56", 110, 170, {
    "fill": "black",
    "font-size": "30px"
});
game.addText("timek2", "killer", "56", 910, 170, {
    "fill": "black",
    "font-size": "30px"
});
game.addText("red3", "killer", "", 500, 70, {
    "font-size": "20px",
    "fill": "#ff5757"
});
game.addText("round3", "killer", "Round 3", 500, 40, {
    "font-size": "30px",
    "fill": "white"
});
arr.forEach(function (a) {
    arr.forEach(function (b) {
        game.add("boardsm" + (a / 200 * 3 + b / 200 + 1), "boardSm", "killer", b + 200 + 3, a + 100 + 3);
    });
});
for (let j = 1; j <= 9; j++) {
    for (let i = 1; i <= 9; i++) {
        game.add("rectk" + j + i, "blankSm", "killer", (j - 1) * 200 / 3 + 200, (i - 1) * 200 / 3 + 100);
        game.whenClick("rectk" + j + i, function () {
            if ((game.clickable == 0 || game.clickable == (i - 1 - (i - 1) % 3) / 3 * 3 + (j - 1 - (j - 1) % 3) / 3 + 1) && !game.boardKiller[((i - 1) - (i - 1) % 3) / 3][((j - 1) - (j - 1) % 3) / 3][(i - 1) % 3][(j - 1) % 3]) {
                game.changeSprite("rectk" + j + i, (game.crossTurn) ? "crossSm" : "circleSm");
                game.boardKiller[((i - 1) - (i - 1) % 3) / 3][((j - 1) - (j - 1) % 3) / 3][(i - 1) % 3][(j - 1) % 3] = (game.crossTurn) ? "x" : "o";
                game.crossTurn = !game.crossTurn;
                let isFull = true;
                for (let w = 0; w < 3; w++) {
                    for (let h = 0; h < 3; h++) {
                        if (!game.boardKiller[(i - 1) % 3][(j - 1) % 3][w][h]) isFull = false;
                    }
                }
                if (!isFull) {
                    game.clickable = (i - 1) % 3 * 3 + (j - 1) % 3 + 1;
                } else {
                    game.clickable = 0;
                }
                if (win(game.boardKiller[((i - 1) - (i - 1) % 3) / 3][((j - 1) - (j - 1) % 3) / 3]) == "draw" && !game.board[((i - 1) - (i - 1) % 3) / 3][((j - 1) - (j - 1) % 3) / 3]) {
                    game.board[((i - 1) - (i - 1) % 3) / 3][((j - 1) - (j - 1) % 3) / 3] = "?"
                    game.circleScore++;
                    game.crossScore++;
                    game.circleWinStreak = 0;
                    game.crossWinStreak = 0;
                } else if (win(game.boardKiller[((i - 1) - (i - 1) % 3) / 3][((j - 1) - (j - 1) % 3) / 3]) == "o" && !game.board[((i - 1) - (i - 1) % 3) / 3][((j - 1) - (j - 1) % 3) / 3]) {
                    game.board[((i - 1) - (i - 1) % 3) / 3][((j - 1) - (j - 1) % 3) / 3] = "o";
                    game.circleScore += (1 + game.circleWinStreak);
                    game.circleWinStreak++;
                    game.crossWinStreak = 0;
                    game.changeSprite("boardsm" + ((i - 1) - (i - 1) % 3 + ((j - 1) - (j - 1) % 3) / 3 + 1), "circleTrans");
                } else if (win(game.boardKiller[((i - 1) - (i - 1) % 3) / 3][((j - 1) - (j - 1) % 3) / 3]) == "x" && !game.board[((i - 1) - (i - 1) % 3) / 3][((j - 1) - (j - 1) % 3) / 3]) {
                    game.board[((i - 1) - (i - 1) % 3) / 3][((j - 1) - (j - 1) % 3) / 3] = "x";
                    game.crossScore += (1 + game.crossWinStreak);
                    game.crossWinStreak++;
                    game.circleWinStreak = 0;
                    game.changeSprite("boardsm" + ((i - 1) - (i - 1) % 3 + ((j - 1) - (j - 1) % 3) / 3 + 1), "crossTrans");
                }
                if (wink() == "draw") {
                    game.circleScore += 3;
                    game.crossScore += 3;
                    game.setText("red3", game.pick(RANDOM_DRAW));
                    setTimeout(function () {
                        game.gameOver = true;
                    }, 0)
                } else if (wink() == "x") {
                    game.crossScore += 6;
                    game.setText("red3", "X wins!");
                    setTimeout(function () {
                        game.gameOver = true;
                    }, 0)
                } else if (wink() == "o") {
                    game.circleScore += 6;
                    game.setText("red3", "O wins!");
                    setTimeout(function () {
                        game.gameOver = true;
                    }, 0)
                }
                updateScore();
            }
        })
    }
}
game.add("boardwhite", "boardWhite", "killer", 200, 100);
game.setBg("killer", "#111");
game.addText("x3", "killer", game.p1, 300, 40, {
    "font-size": "30px",
    "fill": "white"
});
game.addText("o3", "killer", game.p2, 700, 40, {
    "font-size": "30px",
    "fill": "white"
});
game.addText("xscore3", "killer", 0, 100, 40, {
    "font-size": "30px",
    "fill": "#ff5757"
});
game.addText("oscore3", "killer", 0, 900, 40, {
    "font-size": "30px",
    "fill": "#5a9fdb"
});

//O. T.
game.setBg("overtime","#111")
game.add("bombo1", "bombRed", "overtime", 50, 100);
game.add("bombo2", "bombRed", "overtime", 850, 100);
game.addText("timeo1", "overtime", "15.0", 110, 170, {
    "fill": "white",
    "font-size": "30px"
});
game.addText("timeo2", "overtime", "15.0", 910, 170, {
    "fill": "white",
    "font-size": "30px"
});
arr.forEach(function (a) {
    arr.forEach(function (b) {
        game.add("recto" + (a / 200 * 3 + b / 200 + 1), "blank", "overtime", b + 200, a + 100);
    });
});
for (let m = 1; m <= 9; m++) {
    game.whenClick("recto" + m, function () {
        if (!game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3]) {
            if (!game.gameOver) {
                game.changeSprite("recto" + m, (game.crossTurn) ? "cross" : "circle");
                game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3] = (game.crossTurn) ? "x" : "o";
                game.crossTurn = !game.crossTurn;
            }
            if (win(game.board) && !game.gameOver) {
                let result = win(game.board);
                if (result == "o") {
                    circleWin(1, "red4");
                } else if (result == "x") {
                    crossWin(1, "red4");
                } else {
                    gameDraw("red4");
                }
                updateScore();
                setTimeout(function () {
                    game.gameOver = true;
                }, 0);
            }
        }
    });
}
game.add("boardo", "boardWhite", "overtime", 200, 100);
game.addText("ot", "overtime", "O. T.", 500, 40, {
    "font-size": "30px",
    "fill": "white"
});
game.addText("red4", "overtime", "", 500, 70, {
    "font-size": "20px",
    "fill": "#ff5757"
});
game.addText("x4", "overtime", game.p1, 300, 40, {
    "font-size": "30px",
    "fill": "white"
});
game.addText("o4", "overtime", game.p2, 700, 40, {
    "font-size": "30px",
    "fill": "white"
});
game.addText("xscore4", "overtime", game.crossScore, 100, 40, {
    "font-size": "30px",
    "fill": "#ff5757"
});
game.addText("oscore4", "overtime", game.circleScore, 900, 40, {
    "font-size": "30px",
    "fill": "#5a9fdb"
});

//result
game.addText("back", "result", "Back >", 500, 450, {
    "font-size": "30px",
    "fill": "#ff5757"
});
game.addText("winner", "result", "The winner is ...", 500, 250, {
    "fill": "black",
    "font-size": "30px"
});
game.addText("winnerName", "result", "", 500, 350, {
    "fill": "black",
    "font-size": "40px"
});
game.whenClick("back", function () {
    game.switchScene("menu");
    game.crossTurn = true;
    game.crossScore = 0;
    game.circleScore = 0;
    game.crossWinStreak = 0;
    game.circleWinStreak = 0;
    game.crossTime = 5;
    game.circleTime = 5;
    game.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    game.boardKiller = [];
    for (let i = 0; i < 3; i++) {
        game.boardKiller[game.boardKiller.length] = [
            [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ],
            [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ],
            [
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ]
        ]
    }
    game.clickable = 0;
    game.setCount = 1;
    game.arrCross = [2, 2, 2];
    game.arrCircle = [2, 2, 2];
})