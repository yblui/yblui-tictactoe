function go(g) {
    for (let i of document.querySelectorAll("svg>g")) {
        i.classList.remove("show");
    }
    document.getElementById(g).classList.add("show");
    switch (g) {
        case "original":
            for (let i of document.querySelectorAll("#original use")) {
                i.setAttribute("style", "transform:scale(1) rotate(0deg)");
            }
            break;
        case "numbers":

        case "killer":

    }
}
animation();
setInterval(() => {
    animation();
}, 18000);

function animation() {
    for (let i of document.querySelectorAll("#menu use")) {
        i.setAttribute("y", -150 - Math.random() * 1000);
    }
    setTimeout(function () {
        for (let i of document.querySelectorAll("#menu use")) {
            i.setAttribute("y", 1000 + Math.random() * 1000);
        }
    }, 9000)
}
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]
let redTurn = true,gameInfo={
    "round":1,
    "no":1
};
function move(round, boardx, boardy, x, y) {
    let i = document.createElementNS("http://www.w3.org/2000/svg", "use");
    i.setAttribute("x", x);
    i.setAttribute("y", y);
    i.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", (redTurn) ? "#cross" : "#circle");
    i.setAttribute("transform-origin", (x + 50) + " " + (y + 50));
    document.getElementById(round).appendChild(i);
    setTimeout(function () {
        i.setAttribute("style", "transform:scale(1) rotate(0deg)")
    }, 0)
    board[boardx][boardy] = (redTurn) ? "x" : "o";
    redTurn = !redTurn;
    if(board[0][0]==board[0][1]&&board[0][1]==board[0][2]){

    }
}