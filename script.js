const SVG_NS = "http://www.w3.org/2000/svg", XLINK_NS = "http://www.w3.org/1999/xlink";
const RANDOM_DRAW = ["Draw game!", "Nobody wins...", "It's a tie!"];
class Game {
    constructor(json) {
        this.id = json.id;
        this.width = json.width;
        this.height = json.height;
        this.scene = json.scene;
        this.bg = json.bg;
        this.gameOver = false;
        document.getElementById(json.id).setAttribute("width", json.width);
        document.getElementById(json.id).setAttribute("height", json.height);
        let gNode = document.createElementNS(SVG_NS, "g");
        gNode.setAttribute("id", json.scene);
        let rectNode = document.createElementNS(SVG_NS, "rect");
        rectNode.setAttribute("fill", json.bg);
        rectNode.setAttribute("width", json.width);
        rectNode.setAttribute("height", json.height);
        gNode.appendChild(rectNode);
        document.getElementById(json.id).appendChild(gNode);
    }
    addScene(scene) {
        let gNode = document.createElementNS(SVG_NS, "g");
        gNode.setAttribute("id", scene);
        gNode.classList.add("hide");
        document.getElementById(this.id).appendChild(gNode);
    }
    switchScene(scene) {
        for (let k of document.getElementById(this.id).getElementsByTagName("g")) {
            if (k.id == scene) {
                k.classList.remove("hide");
            } else {
                k.classList.add("hide");
            }
        }
        this.scene = scene;
    }
    setBg(scene, fill) {
        if (!document.getElementById(scene).getElementsByClassName("bg").length) {
            let bgRect = this.createRect(0, 0, this.width, this.height, fill);
            bgRect.classList.add("bg");
            document.getElementById(scene).insertBefore(bgRect, document.getElementById(scene).childNodes[0]);
        } else {
            document.getElementById(scene).getElementsByClassName("bg")[0].setAttribute("fill", fill);
        }
    }
    addSprite(id) {
        let symbolNode = document.createElementNS(SVG_NS, "symbol");
        let arrArg = Array.prototype.slice.call(arguments);
        arrArg.shift();
        arrArg.forEach(function (arg) {
            symbolNode.appendChild(arg);
        });
        symbolNode.setAttribute("id", id);
        document.getElementById(this.id).appendChild(symbolNode);
    }
    createText(text, x, y, style) {
        let textElement = document.createElementNS(SVG_NS, "text");
        let textNode = document.createTextNode(text);
        textElement.appendChild(textNode);
        textElement.setAttribute("x", x);
        textElement.setAttribute("y", y);
        textElement.setAttribute("text-anchor", "middle");
        if (style) {
            for (let q of Object.getOwnPropertyNames(style)) {
                textElement.setAttribute(q, style[q]);
            }
        }
        return textElement;
    }
    addText(id, scene, text, x, y, style) {
        let textElement = this.createText(text, x, y, style);
        textElement.setAttribute("id", id);
        document.getElementById(scene).appendChild(textElement);
    }
    setText(id, text) {
        let textNode = document.createTextNode(text);
        document.getElementById(id).removeChild(document.getElementById(id).childNodes[0]);
        document.getElementById(id).appendChild(textNode);
    }
    add(id, sprite, scene, x, y, style) {
        let useNode = document.createElementNS(SVG_NS, "use");
        useNode.setAttributeNS(XLINK_NS, "xlink:href", "#" + sprite);
        useNode.setAttribute("x", x);
        useNode.setAttribute("y", y);
        useNode.setAttribute("id", id);
        if (style) {
            for (let q of Object.getOwnPropertyNames(style)) {
                useNode.setAttribute(q, style[q]);
            }
        }
        document.getElementById(scene).appendChild(useNode);
    }
    createRect(x, y, width, height, fill, style) {
        let rect = document.createElementNS(SVG_NS, "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", y);
        rect.setAttribute("width", width);
        rect.setAttribute("height", height);
        rect.setAttribute("fill", fill);
        if (style) {
            for (let q of Object.getOwnPropertyNames(style)) {
                rect.setAttribute(q, style[q]);
            }
        }
        return rect;
    }
    clickEvent(element, func) {
        if (document.getElementById(element)) {
            document.getElementById(element).addEventListener("click", func);
        }
    }
    changeSprite(id, sprite) {
        document.getElementById(id).setAttributeNS(XLINK_NS, "xlink:href", "#" + sprite);
    }
    transform(id, style) {
        if (style) {
            for (let q of Object.getOwnPropertyNames(style)) {
                document.getElementById(id).setAttribute(q, style[q]);
            }
        }
    }
    remove(id) {
        if (document.getElementById(id)) {
            document.getElementById(id).parentNode.removeChild(document.getElementById(id));
        }
    }
    pick(array) {
        return array[Math.floor(array.length * Math.random())];
    }
}
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
Game.prototype.boardKiller = [
    [
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
    ],
    [
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
    ],
    [
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
]
Game.prototype.clickable = 0;
Game.prototype.setCount = 1;
let game = new Game({
    "id": "game",
    "width": 1000,
    "height": 700,
    "scene": "menu",
    "bg": "white"
});
Game.prototype.arrCross = [2, 2, 2];
Game.prototype.arrCircle = [2, 2, 2];

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
let blankRect = game.createRect(0, 0, 200, 200, "white");
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

//menu
game.p1 = prompt("Player 1:", "Unnamed");
game.p2 = prompt("Player 2:", "Unnamed");
game.addText("p1text", "menu", game.p1, 300, 300, {
    "font-size": "30px",
    "fill": "black"
});
game.addText("vs", "menu", "vs.", 500, 300, {
    "font-size": "30px",
    "fill": "gray"
});
game.addText("p2text", "menu", game.p2, 700, 300, {
    "font-size": "30px",
    "fill": "black"
});
game.addText("play", "menu", "Ready >", 500, 500, {
    "font-size": "30px",
    "fill": "#ff5757"
});
game.clickEvent("play", function () {
    game.switchScene("original");
});

//original
let arr = [0, 200, 400];
arr.forEach(function (a) {
    arr.forEach(function (b) {
        game.add("rect" + (a / 200 * 3 + b / 200 + 1), "blank", "original", b + 200, a + 100);
    });
});
for (let m = 1; m <= 9; m++) {
    game.clickEvent("rect" + m, function () {
        if (!game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3]) {
            if (!game.gameOver) {
                game.changeSprite("rect" + m, (game.crossTurn) ? "cross" : "circle");
                game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3] = (game.crossTurn) ? "x" : "o";
                game.crossTurn = !game.crossTurn;
            }
            if (win(game.board) && !game.gameOver) {
                let result = win(game.board);
                if (result == "o") {
                    game.circleScore += (game.circleWinStreak + 2);
                    game.circleWinStreak++;
                    game.crossWinStreak = 0;
                    game.setText("red1", "O wins!");
                } else if (result == "x") {
                    game.crossScore += (game.crossWinStreak + 2);
                    game.crossWinStreak++;
                    game.circleWinStreak = 0;
                    game.setText("red1", "X wins!");
                } else {
                    game.circleScore++;
                    game.crossScore++;
                    game.crossWinStreak = 0;
                    game.circleWinStreak = 0;
                    game.setText("red1", game.pick(RANDOM_DRAW));
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
game.clickEvent("game", function () {
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
        game.setCount++;
        if (game.setCount == 10 && game.scene == "original") {
            game.switchScene("numbers");
            game.setCount = 1;
        } else if (game.setCount == 10 && game.scene == "numbers") {
            game.switchScene("killer");
        } else if (game.scene == "killer") {
            if (game.crossScore == game.circleScore) {
                game.switchScene("overtime");
                return;
            }
            game.setText("winnerName", (game.crossScore > game.circleScore) ? game.p1 : p2)
            game.switchScene("result");
        }
    }
});
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

//numbers
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
    game.clickEvent("rectn" + m, function () {
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
                game.clickEvent("num" + i + m, function () {
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
                            game.circleScore += (game.circleWinStreak + 2);
                            game.circleWinStreak++;
                            game.crossWinStreak = 0;
                            game.setText("red2", "O wins!");
                        } else if (result == "x") {
                            game.crossScore += (game.crossWinStreak + 2);
                            game.crossWinStreak++;
                            game.circleWinStreak = 0;
                            game.setText("red2", "X wins!");
                        } else {
                            game.circleScore++;
                            game.crossScore++;
                            game.crossWinStreak = 0;
                            game.circleWinStreak = 0;
                            game.setText("red2", game.pick(RANDOM_DRAW));
                        }
                        updateScore();
                        game.arrCircle = [2, 2, 2];
                        game.arrCross = [2, 2, 2];
                        setTimeout(function () {
                            game.gameOver = true;
                        }, 0)
                    } else if (!hasAvailableMoves()) {
                        game.circleScore++;
                        game.crossScore++;
                        game.crossWinStreak = 0;
                        game.circleWinStreak = 0;
                        game.setText("red2", game.pick(RANDOM_DRAW));
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

//killer
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
        game.clickEvent("rectk" + j + i, function () {
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
function wink() {
    let tmp = Array.prototype.slice.call(game.board);
    tmp = tmp.flat().sort();
    let board2 = Array.prototype.slice.call(game.board);
    for (const element of board2) {
        for (let b = 0; b < board2.length; b++) {
            if (element[b] == "?") element[b] = "";
        }
    }
    if (tmp[0]) {//已满
        if (!win(board2) || win(board2) == "draw") {
            return "draw";
        } else {
            return win(board2);
        }
    } else {//未满
        if (win(board2)) {
            return win(board2);
        } else {
            return null;
        }
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
function isCompleted() {
    let o = game.boardKiller.flat(Infinity).sort();
    return !!(o[0]);
}

//O. T.

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
game.clickEvent("back", function () {
    game.switchScene("menu");
    game = new Game();
})