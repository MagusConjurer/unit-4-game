// Create a character prototype
function Character(name, attack, health, counterAtt){
    this.name = name;
    this.attack = attack;
    this.health = health;
    this.counterAtt = counterAtt;
}

// Use the prototype to create 4 objects similar objects

var charOne = Character(charOne, 3, 50, 6);

// Create game object, which holds all game rules
var rpg = {
    wins: 0,
    characters: [],

    // Function to create four cards for character selection
    makeCards : function(){

    },
    
    // Function to make selection Your Character and the three enemies  
    makeEnemies : function(){

    },

    // Function to handle attacks
    fight : function(){

    }
}




// Win conditions