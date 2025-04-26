import { Card } from "./card.js"

export const card1 = new Card(1, "card1", "/resources/cards/cardPHP.png", 20, 5, 5);
export const card2 = new Card(2, "card2", "/resources/cards/cardPHP.png", 20, 10, 1);
export const card3 = new Card(3, "card3", "/resources/cards/cardPHP.png", 20, 1, 10);

export const cards = [card1, card2, card3];               // Array with "mother" cards on the game
export const numberOfCardsInGame = cards.length;