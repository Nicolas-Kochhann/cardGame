import {executeActions} from "./game.js";
import {CARDS} from "./elements.js";

function diceButtonEvent(){
    const diceButton = document.getElementById("diceButton");

    diceButton.addEventListener("click", () => {executeActions()});
}

diceButtonEvent();