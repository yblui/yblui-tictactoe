function go(g) {
    for (let i of document.querySelectorAll("svg>g")) {
        i.classList.remove("show");
    }
    document.getElementById(g).classList.add("show");
}