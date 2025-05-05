import { cards, numberOfCardsInGame } from "./instancedCards.js";

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

    let currentSelectedCard = document.querySelector(".selectedCard"); // Get the unique element remaining with selected card class
    
    if (currentSelectedCard != null){
        let selectedCard = cardsInGameInstances.find(card => card.id == currentSelectedCard.id);
    } 
    else {
        let selectedCard = null;     // If I unselect a card, selectedCard = null;
    } 

    console.log(cardsInGameInstances);
    console.log(selectedCard);

    return selectedCard;

}



const actions = [];

function attackCard(realizerCard, targetCard){

}

function generateCard(){
    const randomCardId = Math.floor(Math.random() * numberOfCardsInGame) + 1;
    let generatedCard = cards.find(card => card.id == randomCardId);


    generatedCard = Object.assign({}, generatedCard);              // Create a copy of the mother card.


    while (true){
        generatedCard.id = Math.floor(Math.random() * 1000) + (numberOfCardsInGame + 1); // Generate id.
        if !(cardsInGameId.includes(generatedCard.id)){                                     // Don´t allow duplicate id
            break;
        }
    }
    
    cardsInGameId.push(generatedCard.id);
    cardsInGameInstances.push(generatedCard);

    return generatedCard;
}





function getPileCard(){

    let generatedCard = generateCard();

    const deck = document.getElementById("deck");
    const card = deck.appendChild(document.createElement("figure"));
    card.id = generatedCard.id;

    const img = card.appendChild(document.createElement("img"));
    img.src = generatedCard.image;

    card.setAttribute("onclick", "putCardOnBoard(" + generatedCard.id + ")")

}




function renewHorde(){

    let generatedCard = generateCard();

    const cpuBoard = document.getElementById("cpu-half-board");
    const card = cpuBoard.appendChild(document.createElement("figure"));
    card.id = generatedCard.id;

    const img = card.appendChild(document.createElement("img"));
    img.src = generatedCard.image
  
}




function putCardOnBoard(cardID){

    const card = document.getElementById(cardID);

    const playerBoard = document.getElementById("player-half-board");
    playerBoard.appendChild(card);

    card.setAttribute("onclick", "selectOrUnselectBoardCard("+ cardID +")");

}




function rollDice(){
    
    const diceValue = Math.floor(Math.random() * 6) + 1;
    //console.log(diceValue);

}




// Attach functions to the global window object
window.getPileCard = getPileCard;
window.renewHorde = renewHorde;
window.putCardOnBoard = putCardOnBoard;
window.selectOrUnselectBoardCard = selectOrUnselectBoardCard;
window.targetingAction = targetingAction;
