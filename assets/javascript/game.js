$(document).ready(function(){

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
        charOne: new Character("charOne", 3, 50, 6),
        charTwo: new Character("charTwo", 3, 50, 6),
        charThree: new Character("charThree", 3, 50, 6),
        charFour: new Character("charFour", 3, 50, 6),
        player: {},
        opponent: {},
        characters: [],
        enemies: [],
        defeated: [],
        playing: false,
        fighting: false,
        finished: false,
        
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
            
            this.wins = 0;
            this.playing = false;
            this.fighting = false;
            this.finished = false;
            this.enemies = [];
            this.defeated = [];
            rpg.makeCards();

            // Take user click
            $(".card").click("on", function(){
                var clicked = $(this).attr("id");
                // Opponent Selection - must be first, so it is not checked until the second click
                rpg.selectOpponent();
                // Character Selection
                if(rpg.playing === false && rpg.finished === false){
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
                    var attButton = $("<button>").attr({type:"button", id:"attBtn"}).addClass("btn btn-dark").text("Attack");
                    $("#attack").append(attButton);
                }
            })
        },

        // Function to handle attacks
        fight : function(){
            $(document).on("click", "#attBtn", function(){
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
                        // rpg.opponent = {};
                    }
                }
                
                // If player wins, remove opponent and appendTo defeated
                // If opponenet wins, end game
                rpg.updateCards();
            });
        },

        updateCards : function() {
            for(i = 0; i < this.characters.length; i++){
                var cardText = $("#" + this.characters[i].name).find(".card-text");
                cardText.text("Health: " + this.characters[i].health);
            }
            if(this.opponent.health <= 0){
                $("#" + this.opponent.name).appendTo("#defeated");
                this.enemies.splice($.inArray(this.opponent, this.enemies), 1);
                this.opponent = {};
                for(l = 0; l < this.enemies.length; l++){
                    $("#" + this.enemies[l].name).appendTo("#opponent");
                }
                this.wins++;
                this.fighting = false;
                $("#attBtn").remove();
                this.selectOpponent();
            }
            if(this.player.health == 0){
                console.log(this.player, "WHy two?");
                $("#attBtn").remove();
                this.playing = false;
                this.fighting = false;
                this.finished = true;
                $("#" + this.player.name).appendTo("#defeated");
                this.player = {};
                alert("Your hero has fallen!");
                this.startNew();
            }
        },
        
        startNew : function(){
            var newGame = $("<button>").attr({type:"button", id:"startBtn"}).addClass("btn btn-dark").text("Live to die another day?");
            $("#attack").append(newGame);
            $(document).on("click", "#startBtn", function(){
                for(m = 0; m < rpg.characters.length; m++){
                    $("#" + rpg.characters[m].name).remove();
                }
                $("#startBtn").remove();
                rpg.startGame();
            });
        }
    }

    rpg.startGame();

    // Win conditions
})