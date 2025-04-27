import { cards, numberOfCardsInGame } from "./instancedCards.js";

function selectOrUnselectBoardCard(cardID){      // And remove if card is selected(A shit name, I know).
    
    const currentSelectedCard = document.querySelectorAll(".selectedCard");   // Stores cards with selectedCard CSS class.

    let card = document.getElementById(cardID);
    if (card.classList.contains("selectedCard")){
        card.classList.remove("selectedCard");
    } else {
        card.classList.add("selectedCard");
    }

    let length = currentSelectedCard.length;
    console.log(length);
    for (let i = 0; i < length; i++){
        currentSelectedCard[i].classList.remove("selectedCard");
    }

}

const actions = [];
function targetingAction(cardID){

    const realizerCardElement = document.querySelector(".selectedCard");
    const targetCardElement = document.getElementById(cardID);

    let realizerCard = {
        id: realizerCardElement.id,
        name: realizerCardElement.dataset.name,
        health: realizerCardElement.dataset.health,
        attack: realizerCardElement.dataset.attack,
        defense: realizerCardElement.dataset.defense
    }

    let targetCard = {
        id: targetCardElement.id,
        name: targetCardElement.dataset.name,
        health: targetCardElement.dataset.health,
        attack: targetCardElement.dataset.attack,
        defense: targetCardElement.dataset.defense
    }


    let realizerAndTarget = {
        actionRealizer: realizerCard,
        actionTarget: targetCard
    }

    return realizerAndTarget;

}

const cardsInGame = [];

console.log(cards);
function getPileCard(){

    const randomCardId = Math.floor(Math.random() * numberOfCardsInGame) + 1;
    let generatedCard = cards.find(card => card.id == randomCardId);


    generatedCard = Object.assign({}, generatedCard);              // Create a copy of the mother card.


    while (true){
        generatedCard.id = Math.floor(Math.random() * 1000) + (numberOfCardsInGame + 1); // Generate id.
        console.log(generatedCard);
        if (cardsInGame.includes(generatedCard.id)){                                     // Don´t allow duplicate id
            continue;
        }
        break;
    }
    
    cardsInGame.push(generatedCard.id);
    console.log(cardsInGame);

    const deck = document.getElementById("deck");
    const card = deck.appendChild(document.createElement("figure"));
    card.id = generatedCard.id;

    const img = card.appendChild(document.createElement("img"));
    img.src = generatedCard.image;

    
    card.dataset.name = generatedCard.name;            
    card.dataset.health = generatedCard.health;       // Create dataset property for atributtes
    card.dataset.attack = generatedCard.attack;
    card.dataset.defense = generatedCard.defense;

    card.setAttribute("onclick", "putCardOnBoard(" + generatedCard.id + ")")
}

function renewHorde(){

    const randomCardId = Math.floor(Math.random() * numberOfCardsInGame) + 1;
    let generatedCard = cards.find(card => card.id == randomCardId);


    generatedCard = Object.assign({}, generatedCard);


    while (true){
        generatedCard.id = Math.floor(Math.random() * 1000) + (numberOfCardsInGame + 1);
        console.log(generatedCard);
        if (cardsInGame.includes(generatedCard.id)){
            continue;
        }
        break;
    }
    
    cardsInGame.push(generatedCard.id);
    console.log(cardsInGame);

    const cpuBoard = document.getElementById("cpu-half-board");
    const card = cpuBoard.appendChild(document.createElement("figure"));
    card.id = generatedCard.id;

    const img = card.appendChild(document.createElement("img"));
    img.src = generatedCard.image

    card.dataset.name = generatedCard.name;            
    card.dataset.health = generatedCard.health;       // Create dataset property for atributtes
    card.dataset.attack = generatedCard.attack;
    card.dataset.defense = generatedCard.defense;
  
}


function putCardOnBoard(cardID){

    const card = document.getElementById(cardID);

    const playerBoard = document.getElementById("player-half-board");
    playerBoard.appendChild(card);

    card.setAttribute("onclick", "selectOrUnselectBoardCard("+ cardID +")");

}



function rollDice(){
    
    const diceValue = Math.floor(Math.random() * 6) + 1;
    console.log(diceValue);

}

// Attach functions to the global window object
window.getPileCard = getPileCard;
window.renewHorde = renewHorde;
window.putCardOnBoard = putCardOnBoard;
window.selectOrUnselectBoardCard = selectOrUnselectBoardCard;
window.targetingAction = targetingAction;