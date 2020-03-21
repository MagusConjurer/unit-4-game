// Create a character prototype
function Character(name, attack, health, counterAtt){
    this.name = name;
    this.attack = attack;
    this.health = health;
    this.counterAtt = counterAtt;
}

// Create game object, which holds all game rules
var rpg = {
    wins: 0,
    charOne: {},
    charTwo: {},
    charThree: {},
    charFour: {},
    player: {},
    opponent: {},
    characters: [],
    enemies: [],
    defeated: [],
    playing: false,
    fighting: false,
    
    // Function to create four cards for character selection
    makeCards : function(){      
        // Use the prototype to create 4 objects similar objects

        this.characters = [];

        this.charOne = new Character("charOne", 3, 50, 6);
        this.charTwo = new Character("charTwo", 3, 50, 6);
        this.charThree = new Character("charThree", 3, 50, 6);
        this.charFour = new Character("charFour", 3, 50, 6);

        this.characters.push(this.charOne, this.charTwo, this.charThree, this.charFour);

        // Iterate through characters, set to "character" and make cards
        for(i = 0; i < this.characters.length; i++){
            // Create <div class="card">
            var card = $("<div>").addClass("card").attr("id",this.characters[i].name);
            // Append <div class="card-img-top" src="..." alt="Card image cap">
            var cardImage = $("<div>").addClass("card-img-top").attr("src","...").attr("alt","Card image cap");
            // Append <div class="card-body">
            var cardBody = $("<div>").addClass("card-body");
            // // Append <h5 class="card-title"></h5>
            var cardTitle = $("<h5>").addClass("card-title").text(this.characters[i].name);
            // // Append <p class="card-text"></p>
            var cardText = $("<p>").addClass("card-text").text("Health: " + this.characters[i].health);
            cardBody.append(cardTitle,cardText);
            card.append(cardImage, cardBody);
            // Append cards to character group div
            $("#characterSelect").append(card);
            
        }

    },

    // Function to select the player and assign the three enemies  
    startGame : function(){
        rpg.makeCards();
        // Take user click
        $(".card").click("on", function(){
            var clicked = $(this).attr("id");
            // Opponent Selection - must be first, so it is not checked until the second click
            rpg.selectOpponent();
            // Character Selection
            if(rpg.playing === false){
                for(j = 0; j < rpg.characters.length; j++){
                    if(clicked === rpg.characters[j].name){
                        rpg.player = rpg.characters[j];
                    } else {
                        rpg.enemies.push(rpg.characters[j]);
                        $("#" + rpg.characters[j].name).appendTo("#opponent");
                    }
                }
                rpg.playing = true;
            }
            
        });
        rpg.fight();
    },

    selectOpponent : function(){
        $(".card").click("on", function(){
            var clicked = $(this).attr("id");
            if(rpg.playing == true && rpg.fighting == false){
                for(k = 0; k < rpg.enemies.length; k++){
                    if(clicked === rpg.enemies[k].name){
                        rpg.opponent = rpg.enemies[k]; 
                    } else {
                        $("#" + rpg.enemies[k].name).appendTo("#enemies");
                    }
                    rpg.fighting = true;
                }
                var attButton = $("<button>").attr("type", "button").addClass("btn btn-dark").text("Attack");
                $("#attack").append(attButton);
            }
        })
    },

    // Function to handle attacks
    fight : function(){
        $("#attack").on("click", function(){
            if(rpg.opponent.health > 0 && rpg.player.health > 0){
                // Apply player damage
                rpg.opponent.health -= rpg.player.attack;
                // Apply enemy damage
                rpg.player.health -= rpg.opponent.counterAtt;
                // Increment player damage
                rpg.player.attack += 3;
                if(rpg.player.health <= 0){
                    rpg.player.health = 0;
                }
                if(rpg.opponent.health <= 0){
                    rpg.opponent.health = 0;
                    rpg.opponent = {};
                }
            }
            
            // If player wins, detach enemy and append to defeated
            rpg.updateCards();
            // If opponenet wins, end game
        });
    },

    updateCards : function() {
        for(i = 0; i < rpg.characters.length; i++){
            var cardText = $("#" + rpg.characters[i].name).find(".card-text");
            cardText.text("Health: " + rpg.characters[i].health);
        }
    }
}

rpg.startGame();

// Win conditions