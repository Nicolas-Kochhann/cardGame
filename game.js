
import { cards, numberOfCardsInGame } from "./instancedCards.js";
import { Card } from "./card.js";

const actions = []
const cardsInGameId = [];
const cardsInGameInstances = [];

function selectOrUnselectBoardCard(cardID){      // And remove if card is selected(A shit name, I know).
    
    const currentSelectedCardArray = document.querySelectorAll(".selectedCard");   // Stores cards with selectedCard CSS class.

    // Remove duplicated selected cards
    let card = document.getElementById(cardID);
    if (card.classList.contains("selectedCard")){
        card.classList.remove("selectedCard");
    } else {
        card.classList.add("selectedCard");
    }

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


    generatedCard = new Card();        // Create a copy of the mother card.


    while (true){
        generatedCard.id = Math.floor(Math.random() * 1000) + (numberOfCardsInGame + 1); // Generate id.
        if (!(cardsInGameId.includes(generatedCard.id))){                               // Don´t allow duplicate id
            break;
        }
    }
    
    cardsInGameId.push(generatedCard.id);
    console.log(cardsInGameId);
    cardsInGameInstances.push(generatedCard);

    return generatedCard;
}


// Add the card element inside of a parentNode.
function generateCardHtml(parentElementNode, card){

    const cardNode = parentElementNode.appendChild(document.createElement("div"));
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

    cardStats.innerHTML = 
    `<span><i>ATK </i>${card.attack}</span>
    <span><i>DEF </i>${card.defense}</span>
    <span><i>HP </i>${card.health}</span>`;

    return cardNode;
}



function getPileCard(){

    let generatedCard = generateCard();
    const deck = document.getElementById("deck");
    
    const cardNode = generateCardHtml(deck, generatedCard);

    cardNode.setAttribute("onclick", "putCardOnBoard(" + generatedCard.id + ")");

    cardNode.addEventListener("click", () => putCardOnBoard(cardNode));

}



// Add the attack event to an element Node.
function addAttackCardEvent(cardNode){

    cardNode.addEventListener("click", () => {

        const realizerCard = getSelectedCard();

        if (realizerCard == null) return;  // if don´t have selected card, returns function without register the action.

        const targetCard = cardsInGameInstances.find(card => card.id == cardNode.id);

        // Test if the realizer card have actions remaining to do.
        if (realizerCard.makedAction === realizerCard.actionLimit) {
            alert("The selected card don`t have more actions in this turn.");
            return;
        }

        actions.push({
            type: "attack",
            realizeAction: (dice) => attackCard(realizerCard, targetCard, dice.diceResultAttack, dice.diceResultDefense)  // Closure which will receive a dice value in the future
        });

        realizerCard.madeActions += 1;

        console.log(actions)
    });
}



function renewHorde(){

    let generatedCard = generateCard();

    const cpuBoard = document.getElementById("cpu-half-board");
    
    const cardNode = generateCardHtml(cpuBoard, generatedCard);

    addAttackCardEvent(cardNode)
}



function putCardOnBoard(cardNode){

    const playerBoard = document.getElementById("player-half-board");
    playerBoard.appendChild(cardNode);

    cardNode.setAttribute("onclick", "selectOrUnselectBoardCard("+ cardNode.id +")");

}



function attackCard(realizerCard, targetCard, diceResultAttack, diceResultDefense){

    if (realizerCard == null){
        return;
    }

    realizerCard.attack + diceResultAttack  >= targetCard.defense + diceResultDefense ? targetCard.takeDamage(realizerCard.attack) : null;

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
}


// Attach functions to the global window object
window.getPileCard = getPileCard;
window.renewHorde = renewHorde;
window.putCardOnBoard = putCardOnBoard;
window.selectOrUnselectBoardCard = selectOrUnselectBoardCard;
window.getSelectedCard = getSelectedCard;
window.attackCard = attackCard;
window.executeActions = executeActions;

export default { actions, cardsInGameId, cardsInGameInstances, getPileCard, renewHorde, putCardOnBoard, selectOrUnselectBoardCard, getSelectedCard, attackCard, executeActions };

