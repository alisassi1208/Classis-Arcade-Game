"use strict";

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //This is the range left to right enemy can be within
    this.enemyX = [-50, 508];
    //This is the range up and down the enemy can be 60 is for top road, 140 is second, and 220 is third
    this.enemyY = [60, 140, 220];
    //Range of speed for the enemies to move accross the screen Min, max
    this.enemySpeed = [125, 175, 200, 225, 250, 275, 300, 325, 400, 500];

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.reset();
};

//This is how the enemy knows to reset and start from left to right and at what speed
Enemy.prototype.reset = function() {
    // [0] is the first item in the X array
    this.x = this.enemyX[0]; 

    //the road Y is equal the random road created from enemyY array
    this.y = this.enemyY[Math.floor(Math.random() * this.enemyY.length)];

    //the speed will equal the random speed created from enemySpeed array
   this.speed = this.enemySpeed[Math.floor(Math.random() * this.enemySpeed.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

        this.x += this.speed * dt; 

        if (this.x > this.enemyX[1]) { 
            this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.playerX = [-40, 400];
    this.PlayerY = [-45, 300];
    this.reset();
};

//This is where the character is placed on screen when reset, this will be random
Player.prototype.reset = function() {
    this.x = 200;
    this.y = this.PlayerY[1];
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//inputs for player movement
Player.prototype.handleInput = function (key) {
    // if statements to check which key was pressed and to make sure
    // the player doesn't leave the board.
    if (key === 'right' && this.x < 400) {
        this.x += 100;
    }
    else if (key === 'down' && this.y < 300) {
        this.y += 80;
    }
    else if (key === 'left' && this.x > 0) {
        this.x -= 100;
    }
    else if (key === 'up' && this.y > 0) {
        this.y -= 80;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();

//Function determines what to do if there is a collision on the page
Player.prototype.checkCollisions = function() {
    // player has reached the top row and can be reset to try again
    if (this.y == -20) {        
        this.reset();        
    } 

        //if between 60 and 220 its in the area of the screen where the bugs are
        else if (this.y >= 60 && this.y <= 220) {
        var player = this;

        // player is on road rows, check collisions for each bug on screen
        allEnemies.forEach(function(enemy) {
            if (enemy.x <= (player.x + 50) && player.x <= (enemy.x + 50) && 
                enemy.y <= (player.y + 50) && player.y <= (enemy.y + 50)) {
                    player.reset();
            }
        });
    }
};

//This is calling the function where we validate if any collisions took place
Player.prototype.update = function() {
    this.checkCollisions();
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
