/**
 * flappyBit - Flappy Bird clone using littleBits 
 * arduino as the controller. 
 * 
 * Based on the Flappy Bird clone by LessMilk
 * (www.lessmilk.com) built using the Phaser Framework.
 *
 * In no way is this game affiliated or endorsed by 
 * littleBits.
 * 
 */

// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// global variable containing the high score
// TODO save this to disk
var highscore = 0;
var background;

// connect to the socket.io websocket to listen for arduino events.
var socket = io.connect('http://127.0.0.1:8000/');
var app = app || {};

// when a jump message is received, call the games jump method.
socket.on("jump", function(data){
	console.log("jump received:" + JSON.stringify(data));
	main_state.jump();
});	

// Creates a new 'main' state that wil contain the game
var main_state = {

	// load the games graphics. 
	preload: function() {  
	    this.game.load.image('background', 'img/background.png');  
	    this.game.load.image('bird', 'img/bird.png');
	    this.game.load.image('pipe', 'img/pipe.png');   
	},

	create: function() {  


   		background = this.game.add.sprite(0, 0,'background');

	    // Display the bird on the screen
	    this.bird = this.game.add.sprite(100, 245, 'bird');

	    // Add gravity to the bird to make it fall
	    this.bird.body.gravity.y = 750;  

	    // Call the 'jump' function when the spacekey is hit
	    var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    space_key.onDown.add(this.jump, this); 

		this.pipes = game.add.group();  
		this.pipes.createMultiple(20, 'pipe');

		this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);  

		// add the score
		this.score = -1;  
		var style = { font: "30px monospace", fill: "#ffffff" };  
		this.label_score = this.game.add.text(20, 20, "HIGHSCORE:" + highscore, style); 

	},

	update: function() {  
	    // If the bird is out of the world (too high or too low), call the 'restart_game' function
	    if (this.bird.inWorld == false){
	        this.restart_game();
	    }

	    this.game.physics.overlap(this.bird, this.pipes, this.restart_game, null, this); 
	},

	// Make the bird jump 
	jump: function() {  
	    // Add a vertical velocity to the bird
	    this.bird.body.velocity.y = -225;
	},

	// Restart the game
	restart_game: function() {  
	    // Start the 'main' state, which restarts the game
	    this.game.state.start('main');
	    this.game.time.events.remove(this.timer);  

	    if (this.score > highscore){
	    	highscore = this.score;
		    console.log("new high score:" + highscore);
		   // ws.send("{'highscore':" + highscore + "}");
	    }
	},


	add_one_pipe: function(x, y) {  
    // Get the first dead pipe of our group
    var pipe = this.pipes.getFirstDead();

    // Set the new position of the pipe
    pipe.reset(x, y);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200; 

    // Kill the pipe when it's no longer visible 
    pipe.outOfBoundsKill = true;
	
	},

	add_row_of_pipes: function() {  
	    var hole = Math.floor(Math.random()*5)+1;

	    for (var i = 0; i < 8; i++){
	        if (i != hole && i != hole +1){
	            this.add_one_pipe(400, i*60+10);  
	        }
	    }
	    this.score += 1;  

	   // ws.send("{'score':" + this.score + "}");

		this.label_score.content = "SCORE:" + this.score;  
	},	


};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);  
game.state.start('main'); 