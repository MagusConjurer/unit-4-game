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
    charOne: {},
    charTwo: {},
    charThree: {},
    charFour: {},
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

        // Iterate through characters, set status to "character" and make cards
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
            var cardText = $("<p>").addClass("card-text").text("Health here");
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
            if(rpg.playing === false){
                for(j = 0; j < rpg.characters.length; j++){
                    if(clicked === rpg.characters[j].name){
                        rpg.characters[j].status = "player";
                    } else {
                        rpg.characters[j].status = "enemy";
                        rpg.enemies.push(rpg.characters[j]);
                        $("#" + rpg.characters[j].name).appendTo("#opponent");
                    }
                }
                rpg.playing = true;
                console.log(rpg.enemies, rpg.playing);
            }
            if(rpg.playing == true && rpg.fighting == false){
                for(k = 0; k < rpg.enemies.length; k++){
                    if(clicked === rpg.enemies[k].name){
                        rpg.enemies[k].status = "opponent";
                    } else {
                        $("#" + rpg.enemies[k].name).appendTo("#enemies");
                        rpg.fighting = true;
                    }
                }
            }
        });


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

rpg.startGame();


// Win conditions