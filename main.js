
// function calls selectBoardCard() if card is unselected, or unselectBoardCard() if card is selected(A shit name, I know).
function selectOrUnselectCard(cardID){
    
    // Stores cards with selectedCard CSS class.
    const currentSelectedCard = document.querySelectorAll(".selectedCard");

    let card = document.getElementById(cardID);
    if (card.classList.contains("selectedCard")){
        unselectBoardCard(card);
    } else {
        selectBoardCard(card);
    }

    // Clear others selected cards.
    let length = currentSelectedCard.length;
    for (i = 0; i < length; i++){
        currentSelectedCard[i].classList.remove("selectedCard");
    }
}

function selectBoardCard(card){
    card.classList.add("selectedCard")
}

function unselectBoardCard(card){
    card.classList.remove("selectedCard")
}

function rollDice(){
    
    const diceValue = Math.floor(Math.random() * 6) + 1;
    console.log(diceValue);

}