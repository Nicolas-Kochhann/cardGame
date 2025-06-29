const CARDS = document.getElementsByClassName("card");
let ENEMYCARDS = document.querySelectorAll(".cpu-half-board .card");
let PLAYERCARDS = document.querySelectorAll(".player-half-board .card");

setInterval(() => {ENEMYCARDS = document.querySelectorAll(".cpu-half-board .card")}, 1000);
setInterval(() => {PLAYERCARDS = document.querySelectorAll(".player-half-board .card")}, 1000);

export {CARDS, ENEMYCARDS, PLAYERCARDS};