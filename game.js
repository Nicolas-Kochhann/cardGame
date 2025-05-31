
import { cards, numberOfCardsInGame } from "./instancedCards.js";
import { Card } from "./card.js";

const actions = [];
const cardsInGameId = [];
const cardsInGameInstances = [];
const cemetery = [];

function selectOrUnselectBoardCard(cardID){      // And remove if card is selected(A shit name, I know).

    const currentSelectedCardArray = document.querySelectorAll(".selectedCard");   // Stores cards with selectedCard CSS class.

    let cardElement = document.getElementById(cardID);

    if (cardElement.classList.contains("selectedCard")){
        cardElement.classList.remove("selectedCard");
    } else {
        cardElement.classList.add("selectedCard");
    }

    // Remove duplicated selected cards
    let length = currentSelectedCardArray.length;

    for (let i = 0; i < length; i++){
        currentSelectedCardArray[i].classList.remove("selectedCard");
    }

}


function getSelectedCard(){
    let currentSelectedCard = document.querySelector(".selectedCard"); // Get the unique element remaining with selected card class
    
    let selectedCard = null;

    if (currentSelectedCard != null){
        selectedCard = cardsInGameInstances.find(card => card.id == currentSelectedCard.id);
    } 

    return selectedCard;         // If dont have card selected, returns null.

}




function generateCard(){
    const randomCardId = Math.floor(Math.random() * numberOfCardsInGame) + 1;
    let baseCard = cards.find(card => card.id == randomCardId);

    let newCardId;
    while (true){
        newCardId = Math.floor(Math.random() * 10000) + (numberOfCardsInGame + 1); // Generate id.
        if (!(cardsInGameId.includes(newCardId))){                               // Don´t allow duplicate id
            break;
        }
    }

    // Create a copy of the mother card with new id.
    let generatedCard = new Card(
        newCardId,
        baseCard.name,
        baseCard.image,
        baseCard.health,
        baseCard.attack,
        baseCard.defense
    );        
    
    cardsInGameId.push(generatedCard.id);
    console.log(cardsInGameId);
    cardsInGameInstances.push(generatedCard);

    return generatedCard;
}



// Add the card element inside of a parent Node.
function generateCardHtml(parentElementNode, card){

    const cardNode = document.createElement("div");
    parentElementNode.appendChild(cardNode);
    cardNode.id = card.id;

    const cardName = cardNode.appendChild(document.createElement("div"));
    const cardStats = cardNode.appendChild(document.createElement("div"));
    const img = cardNode.appendChild(document.createElement("img"));

    img.src = card.image;

    cardName.textContent = card.name;

    cardName.classList.add("card-name");
    cardStats.classList.add("stats");
    
    cardNode.classList.add("card");
    cardStats.classList.add("stats");

    addCardNodeStats(card);

    return cardNode;
}



// add or update the card stats to html card element
function addCardNodeStats(card){

    const cardElement = document.getElementById(card.id)

    const childrenElements = cardElement.children;

    // Get the stats div, and add the html, updating it .
    childrenElements[1].innerHTML =
    `<span><i>ATK </i>${card.attack}</span>
    <span><i>DEF </i>${card.defense}</span>
    <span><i>HP </i>${card.health}</span>`
}




function getPileCard(){

    let generatedCard = generateCard();
    const deck = document.getElementById("deck");
    
    const cardNode = generateCardHtml(deck, generatedCard);

    cardNode.setAttribute("onclick", `putCardOnBoard(${generatedCard.id})`);

    // TODO - Resolver carta indo pro canto da tela quando seleciono.

}



// Add the attack event to an element Node.
function addAttackCardEvent(cardNode){

    cardNode.addEventListener("click", () => {

        const realizerCard = getSelectedCard();

        if (realizerCard === null) return;  // if don´t have selected card, returns function without register the action.

        const targetCard = cardsInGameInstances.find(card => card.id == cardNode.id);

        // Test if the realizer card have actions remaining to do.
        if (realizerCard.madeActions === realizerCard.actionLimit) {
            alert("The selected card don`t have more actions in this turn.");
            return;
        }

        actions.push({
            type: "attack",
            realizeAction: (dice) => attackCard(realizerCard, targetCard, dice.diceResultAttack, dice.diceResultDefense)  // Closure which will receive a dice value in the future
        });

        realizerCard.madeActions += 1;

        console.log(realizerCard.madeActions);
        console.log(actions);
    });
}



function generateEnemyCard(){

    let generatedCard = generateCard();

    const cpuBoard = document.getElementById("cpu-half-board");
    
    const cardNode = generateCardHtml(cpuBoard, generatedCard);

    addAttackCardEvent(cardNode);
}



function putCardOnBoard(cardID){

    let cardElement = document.getElementById(cardID);

    const playerBoard = document.getElementById("player-half-board");
    playerBoard.appendChild(cardElement);

    cardElement.setAttribute("onclick", `selectOrUnselectBoardCard(${cardID})`);

}



function attackCard(realizerCard, targetCard, diceResultAttack, diceResultDefense){

    if (realizerCard == null){
        return;
    }

    realizerCard.attack + diceResultAttack  >= targetCard.defense + diceResultDefense ? targetCard.takeDamage(realizerCard.attack) : null;

    addCardNodeStats(targetCard);

    if (targetCard.isDead == true) removeCard(targetCard);

    console.log(targetCard.isDead);
    console.log(targetCard.health);

}



// Removes card object and card element from game, taking card object to the cemetery.
function removeCard(card){
    
    cardsInGameId.pop(card.id);
    cardsInGameInstances.pop(card);

    const cardElement = document.getElementById(card.id);
    cardElement.remove();

    cemetery.unshift(card); // Add card on start of cemetery array.

}



function rollDice(){

    const diceValue = Math.floor(Math.random() * 6) + 1;
    return diceValue;

}



function executeActions(){

    let diceResultAttack = rollDice();
    let diceResultDefense = rollDice();

    const dice = {
        diceResultAttack: diceResultAttack,
        diceResultDefense: diceResultDefense
    };


    actions.forEach(action => {if (action.type === "attack"){
        action.realizeAction(dice);
    }});

    actions.length = 0;

    cardsInGameInstances.forEach(card => card.madeActions = 0);
}


// Attach functions to the global window object
window.getPileCard = getPileCard;
window.generateEnemyCard = generateEnemyCard;
window.putCardOnBoard = putCardOnBoard;
window.selectOrUnselectBoardCard = selectOrUnselectBoardCard;
window.getSelectedCard = getSelectedCard;
window.attackCard = attackCard;
window.executeActions = executeActions;

export default { actions, cardsInGameId, cardsInGameInstances, getPileCard, generateEnemyCard, putCardOnBoard, selectOrUnselectBoardCard, getSelectedCard, attackCard, executeActions };

