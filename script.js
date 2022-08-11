function go(g) {
    for (let i of document.querySelectorAll("svg>g")) {
        i.classList.remove("show");
    }
    document.getElementById(g).classList.add("show");
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