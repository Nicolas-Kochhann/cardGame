const cardsInDeck = [];

// ################################################################################
// ################################################################################
// Cards construction
// Class card
class Card{
    
    id;
    name;
    image;
    health;
    attack;
    defense;

    // Class card constructor
    constructor(id, name, image, health, attack, defense){
        this.id = id;
        this.name = name;
        this.image = image;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
    }
}

// Instances of card class
const card1 = new Card(1, "card1", "/resources/cards/card.png", 20, 5, 5);
const card2 = new Card(2, "card2", "/resources/cards/card.png", 20, 10, 1);
const card3 = new Card(3, "card3", "/resources/cards/card.png", 20, 1, 10);

// Array with all cards on the game
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


function getPileCard(){
    // Choose a random card, a get the object in the cards array.
    const randomCard = Math.floor(Math.random() * numberOfCardsInGame) + 1;
    let chosenCheapCard = cards.find(card => card.id == randomCard);

    // Create a copy of the mother card.
    chosenCheapCard = Object.assign({}, chosenCheapCard)


/* ############################################################################# */
/* ############################## I NEED TO FIX THIS ########################### */
/* ############################################################################# */
    while (true){
        chosenCheapCard.id = Math.floor(Math.random() * 3) + (numberOfCardsInGame + 1);
        console.log(chosenCheapCard);
        if (cardsInDeck.includes(chosenCheapCard.id)){
            continue;
        }
        else {
            cardsInDeck.push(chosenCheapCard);
            break;
        }
    }
/* ############################################################################# */
/* ############################## I NEED TO FIX THIS ########################### */
/* ############################################################################# */ 
    
    console.log(cardsInDeck);



    /*const deck = document.getElementsByClassName("deck")[0]; //[0] because getElementsByClassName return a collection.
    const figure = deck.appendChild(document.createElement("figure"));
    figure.id(chosenCheapCard)*/

}

function rollDice(){
    
    const diceValue = Math.floor(Math.random() * 6) + 1;
    console.log(diceValue);

}