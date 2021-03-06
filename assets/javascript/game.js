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
        finished: false,
        
        // Function to create four cards for character selection
        makeCards : function(){      
            // Use the prototype to create 4 objects similar objects

            this.characters = [];

            this.charOne = new Character("illidan", 20, 150, 5);
            this.charTwo = new Character("thrall", 10, 150, 15);
            this.charThree = new Character("jaina", 5, 150, 20);
            this.charFour = new Character("sylvanas", 15, 150, 10);

            this.characters.push(this.charOne, this.charTwo, this.charThree, this.charFour);

            // Iterate through characters, set to "character" and make cards
            for(i = 0; i < this.characters.length; i++){
                // Create <div class="card">
                var card = $("<div>").addClass("card").attr("id",this.characters[i].name);
                // Append <div class="card-img-top" src="..." alt="Card image cap">
                var cardImage;
                if(this.characters[i].name == "illidan"){
                    cardImage = $("<img>").addClass("card-img-top").attr("src","assets/images/w3illidan.jpg").attr("alt","Card image cap");
                }
                if(this.characters[i].name == "thrall"){
                    cardImage = $("<img>").addClass("card-img-top").attr("src","assets/images/w3thrall.jpg").attr("alt","Card image cap");
                }
                if(this.characters[i].name == "jaina"){
                    cardImage = $("<img>").addClass("card-img-top").attr("src","assets/images/w3jaina.jpg").attr("alt","Card image cap");
                }
                if(this.characters[i].name == "sylvanas"){
                    cardImage = $("<img>").addClass("card-img-top").attr("src","assets/images/w3sylvanas.jpg").attr("alt","Card image cap");
                }
                // Append <div class="card-body">
                var cardBody = $("<div>").addClass("card-body");
                // // Append <h5 class="card-title"></h5>
                var cardTitle = $("<h5>").addClass("card-title").text(this.characters[i].name.toUpperCase());
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
                            var charAudio;
                            if(clicked == "illidan"){
                                charAudio = new Audio("assets/sounds/illidanwhat.mp3");
                            }
                            if(clicked == "thrall"){
                                charAudio = new Audio("assets/sounds/thrallwarcry.mp3");
                            }
                            if(clicked == "jaina"){
                                charAudio = new Audio("assets/sounds/jainawhat.mp3");
                            }
                            if(clicked == "sylvanas"){
                                charAudio = new Audio("assets/sounds/sylvanaswhat.mp3");
                            }
                            charAudio.loop = false;
                            charAudio.play();
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
                if(rpg.playing == true && rpg.fighting == false && rpg.enemies.some(element => element.name === clicked)){
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
                    rpg.player.attack = Math.round(rpg.player.attack * 1.5);
                    if(rpg.player.health <= 0){
                        rpg.player.health = 0;
                    }
                    if(rpg.opponent.health <= 0){
                        rpg.opponent.health = 0;
                    }
                    
                }
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
            var endAudio;
            if(this.player.health == 0 && this.wins <= 3){
                $("#attBtn").remove();
                $("#" + this.player.name).appendTo("#defeated");
                endAudio = new Audio("assets/sounds/questfailed.mp3");
                endAudio.loop = false;
                endAudio.play();
                alert("Your hero has fallen!");
                this.startNew();
            }
            if(this.player.health > 0 && this.wins == 3){
                $("#attBtn").remove();
                endAudio = new Audio("assets/sounds/questcompleted.mp3");
                endAudio.loop = false;
                endAudio.play();
                alert("You are victorious!");
                this.startNew();
            }
        },
        
        startNew : function(){
            this.charOne = new Character("illidan", 20, 100, 40),
            this.charTwo = new Character("thrall", 10, 150, 20),
            this.charThree = new Character("jaina", 5, 200, 15),
            this.charFour = new Character("sylvanas", 15, 125, 30)
            this.playing = false;
            this.fighting = false;
            this.finished = true;
            this.player = {};
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