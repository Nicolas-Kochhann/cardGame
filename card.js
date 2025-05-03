export class Card{
    
    id;
    name;
    image;
    health;
    attack;
    defense;
    makedAction = 0; 

    constructor(id, name, image, health, attack, defense,){
        this.id = id;
        this.name = name;
        this.image = image;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
    }

    takeDamage(){
        this.health = this.health - attackDamage;
    }

}