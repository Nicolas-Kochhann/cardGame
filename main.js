import game, { attackCard, attackCard, attackCard, cardsInGameInstances, getSelectedCard } from "./game.js";

const actions = []

let enemyCardsFigures = document.querySelectorAll("#cpu-half-board figure");

    enemyCardsFigures.forEach(figure => figure.addEventListener("click", (event) => {
    
        const realizerCard = getSelectedCard();
        const targetCard = cardsInGameInstances.find(card => cardsInGameInstances.id == event.target.id);

        if (realizerCard.makedAction == 1){
            alert("The selected card don`t have more actions in this turn.");
            return;
        }

        let action = {
            realizeAction: attackCard(realizerCard, targetCard)
        }

        actions.push(action);

        realizerCard.madeAction = 1;
}))

