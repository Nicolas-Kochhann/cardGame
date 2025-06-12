import {executeActions} from "./game.js";

function diceButtonEvent(){
    const diceButton = document.getElementById("diceButton");

    diceButton.addEventListener("click", () => {executeActions()});
}

diceButtonEvent();