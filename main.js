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

// function add selectCard class if card is unselected, or remove if card is selected(A shit name, I know).
function selectOrUnselectBoardCard(cardID){
    
    // Stores cards with selectedCard CSS class.
    const currentSelectedCard = document.querySelectorAll(".selectedCard");

    let card = document.getElementById(cardID);
    if (card.classList.contains("selectedCard")){
        card.classList.remove("selectedCard");
    } else {
        card.classList.add("selectedCard");
    }

    // Clear others selected cards.
    let length = currentSelectedCard.length;
    for (i = 0; i < length; i++){
        currentSelectedCard[i].classList.remove("selectedCard");
    }
}


/* ############################################################################# */
/* ################################ Get Pile Card ############################## */
/* ############################################################################# */

// Array with all cards in the deck.
const cardsInGame = [];
function getPileCard(){

    // Choose a random card, a get the object in the cards array.
    const randomCard = Math.floor(Math.random() * numberOfCardsInGame) + 1;
    let chosenCheapCard = cards.find(card => card.id == randomCard);

    // Create a copy of the mother card.
    chosenCheapCard = Object.assign({}, chosenCheapCard)

    // Don`t allows duplicated id.
    while (true){
        chosenCheapCard.id = Math.floor(Math.random() * 1000) + (numberOfCardsInGame + 1);
        console.log(chosenCheapCard);
        if (cardsInGame.includes(chosenCheapCard.id)){
            continue;
        }
        break;
    }
    
    // Control what card are in deck.
    cardsInGame.push(chosenCheapCard.id);
    console.log(cardsInGame);

    // Create card element in HTML
    const deck = document.getElementById("deck"); //[0] because getElementsByClassName return a collection.
    const card = deck.appendChild(document.createElement("figure"));
    card.id = chosenCheapCard.id;

    const img = card.appendChild(document.createElement("img"));
    img.src = chosenCheapCard.image;

    // Create dataset property for atributtes
    card.dataset.name = chosenCheapCard.name;
    card.dataset.health = chosenCheapCard.health;
    card.dataset.attack = chosenCheapCard.attack;
    card.dataset.defense = chosenCheapCard.defense;

    card.setAttribute("onclick", "putCardOnBoard(" + chosenCheapCard.id + ")")

}


function putCardOnBoard(cardID){
    const deck = document.getElementById("deck");
    const card = document.getElementById(cardID);
    //deck.removeChild(card);

    const playerBoard = document.getElementById("player-half-board");
    playerBoard.appendChild(card);

    card.setAttribute("onclick", "selectOrUnselectBoardCard("+ cardID +")")
;    
}


function rollDice(){
    
    const diceValue = Math.floor(Math.random() * 6) + 1;
    console.log(diceValue);

}