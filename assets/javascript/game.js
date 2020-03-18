// Create a character prototype
function Character(name, attack, health, counterAtt){
    this.name = name;
    this.attack = attack;
    this.health = health;
    this.counterAtt = counterAtt;
    this.status = "";
}

// Create game object, which holds all game rules
var rpg = {
    wins: 0,
    characters: [charOne, charTwo, charThree, charFour],
    enemies: [],
    
    // Function to create four cards for character selection
    makeCards : function(){      
        // Use the prototype to create 4 objects similar objects

        charOne = Character("charOne", 3, 50, 6);
        charTwo = Character("charTwo", 3, 50, 6);
        charThree = Character("charThree", 3, 50, 6);
        charFour = Character("charFour", 3, 50, 6);

        // Iterate through characters, set status to "character" and make cards
            // Create <div class="card">
                // Append <div class="card-img-top" src="..." alt="Card image cap">
                // Append <div class="card-body">
                    // Append <h5 class="card-title"></h5>
                    // Append <p class="card-text"></p>

        // Append cards to character group div

    },

    // Function to select the player and assign the three enemies  
    startGame : function(){
        // Take user click
        // Make selection Player
        // Make remainder Enemies
        // Detach the cards from character group div
        // Append player card to player group div
        // Append remaining three to the enemies group div
        // Append Attack button
    },

    // Function to handle attacks
    fight : function(){
        // Press attack button
        // Apply player damage
        // Apply enemy damage
        // Increment player damage
        // If player wins, detach enemy and append to defeated
        // If opponenet wins, end game
    }
}




// Win conditions