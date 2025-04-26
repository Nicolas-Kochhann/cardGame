/* ############################################################################# */
/* ################################# Class Card ################################ */
/* ############################################################################# */

class Card{
    
    id;
    name;
    image;
    health;
    attack;
    defense;

    // Class card constructor
    constructor(id, name, image, health, attack, defense,){
        this.id = id;
        this.name = name;
        this.image = image;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
    }

}

// Instances of card class
const card1 = new Card(1, "card1", "/resources/cards/cardPHP.png", 20, 5, 5);
const card2 = new Card(2, "card2", "/resources/cards/cardPHP.png", 20, 10, 1);
const card3 = new Card(3, "card3", "/resources/cards/cardPHP.png", 20, 1, 10);

// Array with "mother" cards on the game.
const cards = [card1, card2, card3];
const numberOfCardsInGame = cards.length;
// ################################################################################
// ################################################################################


function selectOrUnselectBoardCard(cardID){      // And remove if card is selected(A shit name, I know).
    
    const currentSelectedCard = document.querySelectorAll(".selectedCard");   // Stores cards with selectedCard CSS class.

    let card = document.getElementById(cardID);
    if (card.classList.contains("selectedCard")){
        card.classList.remove("selectedCard");
    } else {
        card.classList.add("selectedCard");
    }

    let length = currentSelectedCard.length;
    for (i = 0; i < length; i++){
        currentSelectedCard[i].classList.remove("selectedCard");
    }

}

function targetCard(cardID){
    
}


/* ############################################################################# */
/* ################################ Get Pile Card ############################## */
/* ############################################################################# */

const cardsInGame = [];
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