var platformsArray = [];
var fallingObjectsArray = [];
var itemsArray = [];

var platforms;
var fallingObjects;
var items;

var platformHeight = 1;
var platformFullHeight = 1000;


var backgroundImg;

var playerIdle, playerForwards, playerBackwards, playerJumping;


// Gravity & jumps
const GRAVITY = 0.3;
var jumping = false;

// Score
var score = 0;
var scoreCount = document.querySelector('#score');


// Items size
var itemWidth = 15;
var itemHeight = 15;

platformsArray.push({
    x: 200,
    y: 400,
    width: 600,
    height: platformHeight      
});

platformsArray.push({
    x: 750,
    y: 400,
    width: 300,
    height: platformHeight
});

platformsArray.push({
    x: 1050,
    y: 350,
    width: 300,
    height: platformHeight
});

/*fallingObjectsArray.push({
    x: 500,
    y: 0,
    width: 100,
    height: 200
});*/

itemsArray.push({
    x: 400,
    y: 125,
    width: itemWidth,
    height: itemHeight
});

itemsArray.push({
    x: 350,
    y: 125,
    width: itemWidth,
    height: itemHeight
});

itemsArray.push({
    x: 300,
    y: 125,
    width: itemWidth,
    height: itemHeight
});

function preload() {}

function setup() {
    createCanvas(800, 480);
    
    backgroundImg = loadImage("assets/background.jpg");
    
    platforms = new Group();
    fallingObjects = new Group();
    items = new Group();
    
    // Create platforms
    for (var i = 0; i < platformsArray.length; i++) {
        var newPlatform = createSprite(platformsArray[i].x, platformsArray[i].y, platformsArray[i].width, platformsArray[i].height);
        newPlatform.rotation = 20;
        newPlatform.rotateToDirection = true;
        newPlatform.shapeColor = color(25, 25, 25);
        platforms.add(newPlatform);
    }
        
    // Create falling objects
    for (var i = 0; i < fallingObjectsArray.length; i++) {
        var newFallingObject = createSprite(fallingObjectsArray[i].x, fallingObjectsArray[i].y, fallingObjectsArray[i].width, fallingObjectsArray[i].height);
        newFallingObject.shapeColor = color(0);
        fallingObjects.add(newFallingObject);
    }
    
    // Create items
    for (var i = 0; i < itemsArray.length; i++) {
        var newItem = createSprite(itemsArray[i].x, itemsArray[i].y, itemsArray[i].width, itemsArray[i].height);
        newItem.shapeColor = color(255, 255, 0);
        items.add(newItem);
    }
        
    // Create player
    player = createSprite(100, 50, 15, 25);
    
    playerIdle = loadImage("assets/dude-idle.png");
    playerForwards = loadImage("assets/dude-forwards.png");
    playerBackwards = loadImage("assets/dude-backwards.png");
    playerJumping = loadImage("assets/dude-jumping.png");

    player.addImage(playerForwards);
}

function draw() {    
    background("#191919");
    image(backgroundImg, 0 - width/2, 0 -height/2);
    
    platforms[0].debug = true;
    
    // Add gravity
    player.velocity.y += GRAVITY;
    
    // Set camera position
    camera.position.x = player.position.x;
    camera.position.y = player.position.y;
    
    // Stop 
    for (var i = 0; i < platforms.length; i++) {
        player.collide(platforms[i], function() {
            player.position.y = player.position.y;
            player.velocity.y = GRAVITY;
        });
    }
    
    // Remove items on overlap
    player.overlap(items, getItem);
    
    // Move player with keys
    if (keyIsDown(RIGHT_ARROW)) {
        player.position.x += 4;
        player.addImage(playerForwards);
    }
    
    if (keyIsDown(LEFT_ARROW)) {
        player.position.x -= 4;
        player.addImage(playerBackwards);
    }
    
    if (keyWentDown(' ')) {
        console.log(player.velocity.y);
        if (!jumping && player.velocity.y == GRAVITY) {
            jumping = true;
            player.velocity.y = -3.8 * 2;
        }
        jumping = false;
    }
    
    drawSprites();
}

function getItem(player, item) {
    item.remove();
    score += 1;
    scoreCount.innerHTML = score;
}