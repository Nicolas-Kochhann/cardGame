class Card{
    
    id;
    name;
    image;
    attack;
    defense;

    constructor(id, name, image, attack, defense){
        this.id = id;
        this.name = name;
        this.image = image;
        this.attack = attack;
        this.defense = defense;
    }
}

let card1 = new Card(1, "card1", "/resources/card.png", 5, 5)