import {actions, attackCard, getSelectedCard } from "./game.js";

// Add a attack action to actions array.
function setActionAttack(targetCard) {

    const realizerCard = getSelectedCard();

    // if don´t have selected card, returns function without register the action.
    if (realizerCard === null) return; 

    // Test if the realizer card have actions remaining to do.
    if (realizerCard.madeActions === realizerCard.actionLimit) {
        alert("The selected card don`t have more actions in this turn.");
        return;
    }

    actions.push({
        type: "attack",
        initiative: realizerCard.initiative,
        realizeAction: (dice) => attackCard(realizerCard, targetCard, dice.diceResultAttack, dice.diceResultDefense)  // Closure which will receive a dice value in the future
    });

    realizerCard.madeActions += 1;

    console.log(realizerCard.madeActions);
    console.log(actions);
}


// Add a cure action to actions array.
function setActionCure(targetCard){

    const realizerCard = getSelectedCard();

    // if don´t have selected card, or selected card are diferent than a Healer, returns function without register the action.
    if (realizerCard === null || realizerCard.type === !("Healer")) return;
    
    if (realizerCard.madeActions === realizerCard.actionLimit) {
        alert("The selected card don`t have more actions in this turn.");
        return;
    }

    actions.push({
        type: "cure",
        initiative: realizerCard.initiative,
        realizeAction: () => cureCard(realizerCard, targetCard)
    })

}

export { setActionAttack, setActionCure };