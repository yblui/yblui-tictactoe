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
        document.getElementById(element).addEventListener("click", func);
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
}
Game.prototype.crossTurn = true;
Game.prototype.crossScore = 0;
Game.prototype.circleScore = 0;
Game.prototype.crossWinStreak = 0;
Game.prototype.circleWinStreak = 0;
Game.prototype.board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
Game.prototype.setCount = 1;
let game = new Game({
    "id": "game",
    "width": 1000,
    "height": 700,
    "scene": "menu",
    "bg": "white"
});

//scenes
game.addScene("original");
game.addScene("numbers");
game.addScene("killer");
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
let blankRect = game.createRect(0, 0, 200, 200, "white");
game.addSprite("blank", blankRect);
let oText = game.createText("O", 100, 150, {
    "font-size": "150px",
    "fill": "black"
});
game.addSprite("circle", oText);
let xText = game.createText("X", 100, 150, {
    "font-size": "150px",
    "fill": "black"
});
game.addSprite("cross", xText);
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
            if (win() && !game.gameOver) {
                let result = win();
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
                    game.setText("red1", RANDOM_DRAW[Math.floor(RANDOM_DRAW.length * Math.random())]);
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
        }
        game.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        game.setText("red1", "");
        game.setCount++;
        if (game.setCount == 10) {
            game.switchScene("numbers");
            game.setCount = 1;
        }
    }
});
function win() {
    if ((game.board[0][0] == game.board[0][1] && game.board[0][1] == game.board[0][2] && game.board[0][0]) || (game.board[1][0] == game.board[1][1] && game.board[1][1] == game.board[1][2] && game.board[1][0]) || (game.board[2][0] == game.board[2][1] && game.board[2][1] == game.board[2][2] && game.board[2][0])
        || (game.board[0][0] == game.board[1][0] && game.board[1][0] == game.board[2][0] && game.board[0][0]) || (game.board[0][1] == game.board[1][1] && game.board[1][1] == game.board[2][1] && game.board[0][1]) || (game.board[0][2] == game.board[1][2] && game.board[1][2] == game.board[2][2] && game.board[0][2])
        || (game.board[0][0] == game.board[1][1] && game.board[1][1] == game.board[2][2] && game.board[0][0]) || (game.board[0][2] == game.board[1][1] && game.board[1][1] == game.board[2][0] && game.board[0][2])) {
        if ((game.board[0][0] == game.board[0][1] && game.board[0][1] == game.board[0][2] && game.board[0][0]) || (game.board[0][0] == game.board[1][0] && game.board[1][0] == game.board[2][0] && game.board[0][0])
            || (game.board[0][0] == game.board[1][1] && game.board[1][1] == game.board[2][2] && game.board[0][0])) {
            return game.board[0][0];
        } else if (game.board[1][0] == game.board[1][1] && game.board[1][1] == game.board[1][2] && game.board[1][0]) {
            return game.board[1][0];
        } else if (game.board[2][0] == game.board[2][1] && game.board[2][1] == game.board[2][2] && game.board[2][0]) {
            return game.board[2][0];
        } else if (game.board[0][1] == game.board[1][1] && game.board[1][1] == game.board[2][1] && game.board[0][1]) {
            return game.board[0][1];
        } else if ((game.board[0][2] == game.board[1][2] && game.board[1][2] == game.board[2][2] && game.board[0][2]) || (game.board[0][2] == game.board[1][1] && game.board[1][1] == game.board[2][0] && game.board[0][2])) {
            return game.board[0][2];
        }
    } else if (game.board[0][0] && game.board[0][1] && game.board[0][2] && game.board[1][0] && game.board[1][1] && game.board[1][2] && game.board[2][0] && game.board[2][1] && game.board[2][2]) {
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
        if (!game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3]) {
            game.add("num1" + m, "num1", "numbers", (m - 1) % 3 * 200 + 200, (m - 1 - (m - 1) % 3) / 3 * 200 + 100);
            game.add("num2" + m, "num2", "numbers", (m - 1) % 3 * 200 + 200 + 200 / 3, (m - 1 - (m - 1) % 3) / 3 * 200 + 100);
            game.add("num3" + m, "num3", "numbers", (m - 1) % 3 * 200 + 200 + 200 / 3 * 2, (m - 1 - (m - 1) % 3) / 3 * 200 + 100);
            game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3] = "?";
            game.clickEvent("num1" + m, function () {
                game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3] = ((game.crossTurn) ? "x" : "o") + "1";
                game.crossTurn = !game.crossTurn;
            })
            game.clickEvent("num2" + m, function () {
                game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3] = ((game.crossTurn) ? "x" : "o") + "2";
                game.crossTurn = !game.crossTurn;
            })
            game.clickEvent("num3" + m, function () {
                game.board[(m - 1 - (m - 1) % 3) / 3][(m - 1) % 3] = ((game.crossTurn) ? "x" : "o") + "3";
                game.crossTurn = !game.crossTurn;
            })
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
game.addText("round3", "killer", "Round 3", 500, 40, {
    "font-size": "30px",
    "fill": "white"
});
game.add("boardUsen", "board", "killer", 200, 100);
arr.forEach(function (a) {
    arr.forEach(function (b) {
        game.add("rect" + (a / 200 * 3 + b / 200 + 1), "boardSm", "killer", b + 200, a + 100);
    });
});
game.setBg("killer", "#111")
game.addText("xscore3", "killer", 0, 100, 40, {
    "font-size": "30px",
    "fill": "#ff5757"
});
game.addText("oscore3", "killer", 0, 900, 40, {
    "font-size": "30px",
    "fill": "#5a9fdb"
});

//result