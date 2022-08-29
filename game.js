const SVG_NS = "http://www.w3.org/2000/svg", XLINK_NS = "http://www.w3.org/1999/xlink";
let $beginDate = new Date();
class Game {
    constructor(json) {
        this.id = json.id;
        this.width = json.width;
        this.height = json.height;
        this.scene = json.scene;
        this.bg = json.bg;
        this.gameOver = false;
        this.msgEvents = []
        this.timer = function () {
            return (new Date().getTime() - $beginDate.getTime()) / 1000;
        };
        this.resetTimer = function () {
            $beginDate = new Date();
        }
        this.daysSince2000 = function () {
            return (new Date().getTime() - new Date(2000, 0, 1, 0, 0, 0, 0).getTime()) / 8.64e7;
        }
        this.getTime = function (a) {
            switch (a) {
                case "year":
                    return new Date().getFullYear();
                case "month":
                    return new Date().getMonth() + 1;
                case "date":
                    return new Date().getDate();
                case "dayOfWeek":
                    return new Date().getDay();
                case "hour":
                    return new Date().getHours();
                case "minute":
                    return new Date().getMinutes();
                case "second":
                    return new Date().getSeconds();
                default:
                    console.error("Invalid parameter: .getTime(" + a + ")")
            }
        }
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
    run() {
        this.broadcast("@run");
    }
    whenRun(func) {
        this.whenReceive("@run", func);
    }
    whenPress(key, func) {
        document.addEventListener("keydown", function (e) {
            if (e.key == key) {
                func();
            }
        })
    }
    whenReceive(msg, func) {
        this.msgEvents[this.msgEvents.length] = {
            "msg": msg,
            "func": func
        }
    }
    whenClick(sprite,func){

    }
    stop(a){

    }
    showVariable(variable){

    }
    hideVariable(variable){
        
    }
    broadcast(msg) {
        for (let i of this.msgEvents) {
            if (i.msg == msg) i.func();
        }
    }
    addScene(scene) {
        let gNode = document.createElementNS(SVG_NS, "g");
        gNode.setAttribute("id", scene);
        gNode.classList.add("hide");
        document.getElementById(this.id).appendChild(gNode);
    }
    switchScene(scene) {
        let scenes = Array.prototype.slice.call(document.getElementById(this.id).getElementsByTagName("symbol"));
        if (arguments[1] == "previous") {
            scenes.map(function (a) {
                return a.id;
            })
            for (let y in scenes) {
                if (scenes[y] == this.scene) {
                    this.switchScene(this.scene[(y != 0) ? (y - 1) : (scene.length - 1)]);
                    return;
                }
            }
            return;
        } else if (arguments[1] == "next") {
            this.nextScene();
            return;
        } else if (arguments[1] == "random") {
            this.switchScene(this.scene[Math.floor(Math.random() * scenes.length)]);
            return;
        }
        for (let k of document.getElementById(this.id).getElementsByTagName("g")) {
            if (k.id == scene) {
                k.classList.remove("hide");
            } else {
                k.classList.add("hide");
            }
        }
        this.scene = scene;
    }
    nextScene() {
        let scenes = Array.prototype.slice.call(document.getElementById(this.id).getElementsByTagName("symbol"));
        scenes.map(function (a) {
            return a.id;
        })
        for (let y in scenes) {
            if (scenes[y] == this.scene) {
                this.switchScene(this.scene[(y != scene.length) ? (y + 1) : 0]);
                return;
            }
        }
    }
    getScene(returnNumber) {
        if (returnNumber) {
            let scenes = Array.prototype.slice.call(document.getElementById(this.id).getElementsByTagName("symbol"))
            scenes.map(function (a) {
                return a.id;
            })
            for (let y in scenes) {
                if (scenes[y] == this.scene) return y + 1;
            }
        } else {
            return this.scene;
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
    createEllipse(cx, cy, rx, ry, fill) {
        let ellipse = document.createElementNS(SVG_NS, "ellipse");
        ellipse.setAttribute("cx", cx);
        ellipse.setAttribute("cy", cy);
        ellipse.setAttribute("rx", rx);
        ellipse.setAttribute("ry", ry);
        ellipse.setAttribute("fill", fill);
        return ellipse;
    }
    createPath(d, fill, style) {
        let path = document.createElementNS(SVG_NS, "path")
        path.setAttribute("d", d);
        path.setAttribute("fill", fill);
        if (style) {
            for (let q of Object.getOwnPropertyNames(style)) {
                path.setAttribute(q, style[q]);
            }
        }
        return path;
    }
}