import game from "./game.js";

function attack() {
    let enemyCardsFigures = document.querySelectorAll("#cpu-half-board figure");

    enemyCardsFigures.forEach(figure => figure.addEventListener("click", () => {

        const realizerCard = getSelectedCard();
        const targetCard = cardsInGameInstances.find(figure => cardsInGameInstances.id == figure.id);

        if (realizerCard.makedAction == realizerCard.actionLimit) {
            alert("The selected card don`t have more actions in this turn.");
            return;
        }

        actions.push({
            type: "attack",
            realizeAction: (dice) => attackCard(realizerCard, targetCard, dice.diceResultAttack, dice.diceResultDefense)
        });

        realizerCard.madeAction = 1;
    }))
}


function cardStatsDisplay() {
    
    const playerCards = document.querySelectorAll("#player-half-board figure");

    playerCards.forEach(card => card.addEventListener("mouseover", () => {
        
        const cardStats = document.createElement("div");
        cardStats.classList.add("card-stats");
        card.after(cardStats)

        card.addEventListener("mouseleave", () => {
            cardStats.remove();
        })
    }));
}

window.cardStatsDisplay = cardStatsDisplay;


