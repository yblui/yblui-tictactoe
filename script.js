let playerA, playerB;
function go(g) {
    for (let i of document.querySelectorAll("svg>g")) {
        i.classList.remove("show");
    }
    document.getElementById(g).classList.add("show");
    switch (g) {
        case "original":
            for (let i of document.querySelectorAll("#original>use")) {
                i.setAttribute("style", "transform:scale(1) rotate(0deg)");
            }
            playerA = new Player(document.getElementById("playerA").value);
            playerB = new Player(document.getElementById("playerB").value);
            break;
        case "numbers":
            playerA.winStreak = 0;
            playerB.winStreak = 0;
            break;
        case "killer":

    }
}
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let redTurn = true, gameInfo = {
    "round": 1,
    "no": 1
};
class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.winStreak = 0;
    }
}
function move(round, boardx, boardy, x, y) {
    let i = document.createElementNS("http://www.w3.org/2000/svg", "use");
    i.setAttribute("x", x);
    i.setAttribute("y", y);
    i.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", (redTurn) ? "#cross" : "#circle");
    i.setAttribute("transform-origin", (x + 50) + " " + (y + 50));
    document.querySelector("#" + round + " .uses").appendChild(i);
    i.setAttribute("style", "transform:scale(1) rotate(0deg)");
    board[boardx][boardy] = (redTurn) ? "x" : "o";
    redTurn = !redTurn;
    if ((board[0][0] == board[0][1] && board[0][1] == board[0][2] && board[0][0]) || (board[1][0] == board[1][1] && board[1][1] == board[1][2] && board[1][0]) || (board[2][0] == board[2][1] && board[2][1] == board[2][2] && board[2][0])
        || (board[0][0] == board[1][0] && board[1][0] == board[2][0] && board[0][0]) || (board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[0][1]) || (board[0][2] == board[1][2] && board[1][2] == board[2][2] && board[0][2])
        || (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0]) || (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2])) {
        let winner;
        if ((board[0][0] == board[0][1] && board[0][1] == board[0][2] && board[0][0]) || (board[0][0] == board[1][0] && board[1][0] == board[2][0] && board[0][0])
            || (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0])) {
            winner = (board[0][0] == "x") ? "playerA" : "playerB";
        } else if (board[1][0] == board[1][1] && board[1][1] == board[1][2] && board[1][0]) {
            winner = (board[1][0] == "x") ? "playerA" : "playerB";
        } else if (board[2][0] == board[2][1] && board[2][1] == board[2][2] && board[2][0]) {
            winner = (board[2][0] == "x") ? "playerA" : "playerB";
        } else if (board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[0][1]) {
            winner = (board[0][1] == "x") ? "playerA" : "playerB";
        } else if ((board[0][2] == board[1][2] && board[1][2] == board[2][2] && board[0][2]) || (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2])) {
            winner = (board[0][2] == "x") ? "playerA" : "playerB";
        }
        if (winner == "playerA") {
            playerA.winStreak++;
            playerA.score += playerA.winStreak;
            playerB.winStreak = 0;
        } else {
            playerB.winStreak++;
            playerB.score += playerB.winStreak;
            playerA.winStreak = 0;
        }
        
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        document.querySelectorAll("#" + round + " .uses use").forEach(function (element) {
            setTimeout(() => {
                element.setAttribute("style", "transform:scale(0) rotate(360deg)");
                setTimeout(() => {
                    element.parentNode.removeChild(element);
                }, 900);
            }, 900);
        });
        if (gameInfo.no == 9) {
            if (round == "original") {
                go("numbers");
            }
            return;
        }
        gameInfo.no++;
    }
}