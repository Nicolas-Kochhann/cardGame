class Card {
    id;
    name;
    image;
    health;
    attack;
    defense;
    isDead = false;
    madeActions = 0;
    actionLimit = 1;
    initiative;
    maxHealth = (this.health * 1.50);


    constructor(id, name, image, health, attack, defense, initiative) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.initiative = initiative;
    }

    takeDamage(damage) {
        this.health -= damage;
        this.isDead = this.health <= 0; // Check if is dead.
    }

    regenerateHealth(regeneratedHealth) {
        this.health += regeneratedHealth;
        if (this.health > this.maxHealth) this.health = this.maxHealth;
    }
}


class Healer extends Card{
    type = "healer";
    cureRate;

    constructor(id, name, image, health, attack, defense, initiative, cureRate){
        super(id, name, image, health, attack, defense, initiative);
        this.cureRate = cureRate;
    }
}

class Tanker extends Card{
    type = "tanker";
    maxHealth = (this.health * 2.00);

    constructor(id, name, image, health, attack, defense, initiative){
        super(id, name, image, health, attack, defense, initiative);
    }
}

class Coiner extends Card{
    type = "coiner";
    coinMintRate;

    constructor(id, name, image, health, attack, defense, initiative, coinMintRate){
        super(id, name, image, health, attack, defense, initiative);
        this.coinMintRate = coinMintRate;
    }
}

class Mage extends Card{
    type = "mage";

    constructor(id, name, image, health, attack, defense, initiative){
        super(id, name, image, health, attack, defense, initiative);;
    }
}

const card1 = new Card(1, "PHP", "/resources/cards/php.png", 20, 5, 5, 3);
const card2 = new Card(2, "Skinny Mage", "/resources/cards/magia_negra.png", 20, 10, 1, 7);
const card3 = new Card(3, "Broke Guy", "/resources/cards/dancarino_de_breakdance_hospitalizado.png", 20, 1, 10, 1);
const card4 = new Card(4, "SpongeBob Mafia", "/resources/cards/bob_esponja_mafioso.jpg", 20, 5, 8, 5);

const cards = [card1, card2, card3, card4];              // Array with "mother" cards on the game
const numberOfCardsInGame = cards.length;

export { Card, cards, numberOfCardsInGame };