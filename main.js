// function add selectCard class if card is unselected, or remove if card is selected(A shit name, I know).
function selectOrUnselectCard(cardID){
    
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

function rollDice(){
    
    const diceValue = Math.floor(Math.random() * 6) + 1;
    console.log(diceValue);

}