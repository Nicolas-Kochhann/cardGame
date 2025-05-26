export class Card{
    
    id;
    name;
    image;
    health;
    attack;
    defense;
    isDead = false;
    madeActions = 0;
    actionLimit = 1;

    constructor(id, name, image, health, attack, defense){
        this.id = id;
        this.name = name;
        this.image = image;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
    }

    takeDamage(damage){
        this.health -= damage;
        this.isDead = this.health <= 0; // Check if is dead.
    }

}