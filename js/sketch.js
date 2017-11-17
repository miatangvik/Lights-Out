var platformsArray = [];
var fallingObjectsArray = [];
var climbablesArray = [];
var itemsArray = [];
var interactablesArray = [];

// Arrays
var platforms, fallingObjects, climbables, items, interactables;

// Platform numbers
var platformHeight = 10;
var platformFullHeight = 1000;

// Render Scene
var sceneWidth = 3600;
var sceneHeight = 1700;

var backgroundImg;

var playerIdle, playerForwards, playerBackwards, playerJumping;

// Gravity and jumps
const GRAVITY = 0.3;
var jumping = false;

// Score
var score = 0;
var scoreCount = document.querySelector('#score');

// Item size
var itemWidth = 10;
var itemHeight = 10;

// Platforms
platformsArray.push({
    x: 950,
    y: 470,
    width: 1900,
    height: 320
});

platformsArray.push({
    x: 2275,
    y: 575,
    width: 500,
    height: 530
});

// Falling objects
/*fallingObjectsArray.push({
    x: 500,
    y: 0,
    width: 100,
    height: 200
});*/

// Climbables
/*climbablesArray.push({
    x: 935,
    y: 270,
    width: 50,
    height: 250
});*/

// Items
itemsArray.push({
    x: 350,
    y: 275,
    width: itemWidth,
    height: itemHeight
});

itemsArray.push({
    x: 400,
    y: 275,
    width: itemWidth,
    height: itemHeight
});

itemsArray.push({
    x: 950,
    y: 125,
    width: itemWidth,
    height: itemHeight
});

// Interactables
interactablesArray.push({
    x: 750,
    y: 370,
    width: 25,
    height: 25
});

function preload() {
    soundFormats('mp3', 'ogg');
    levelSound = loadSound("assets/audio/level_sound.mp3");
    levelSound2 = loadSound("assets/audio/ambience.mp3");
    collectSound = loadSound("assets/audio/bleh.mp3");
}

function setup() {
    createCanvas(1000, 500);

    backgroundImg = loadImage("assets/game_level_copy.png");
    
    levelSound.setVolume(0.3);
    levelSound.play();
    levelSound.loop();
    
    levelSound2.setVolume(0.3);
    levelSound2.play();
    levelSound2.loop();

    platforms = new Group();
    fallingObjects = new Group();
    items = new Group();
    climbables = new Group();
    interactables = new Group();

    // Create platforms
    for (var i = 0; i < platformsArray.length; i++) {
        var newPlatform = createSprite(platformsArray[i].x, platformsArray[i].y, platformsArray[i].width, platformsArray[i].height);
        newPlatform.shapeColor = color(255, 255, 0, 0);
        newPlatform.debug = true;
        platforms.add(newPlatform);
    }
    
    // Rotate platform colliders
    // platforms[0].setCollider("rectangle");
    // platforms[0].collider.rotation = 0.11;

    // Create falling objects
    for (var i = 0; i < fallingObjectsArray.length; i++) {
        var newFallingObject = createSprite(fallingObjectsArray[i].x, fallingObjectsArray[i].y, fallingObjectsArray[i].width, fallingObjectsArray[i].height);
        newFallingObject.shapeColor = color(0);
        fallingObjects.add(newFallingObject);
    }
    
    // Create climbables
    for (var i = 0; i < climbablesArray.length; i++) {
        var newClimbable = createSprite(climbablesArray[i].x, climbablesArray[i].y, climbablesArray[i].width, climbablesArray[i].height);
        newClimbable.shapeColor = color(255, 100, 0, 0);
        climbables.add(newClimbable);
    }

    // Create items
    for (var i = 0; i < itemsArray.length; i++) {
        var newItem = createSprite(itemsArray[i].x, itemsArray[i].y, itemsArray[i].width, itemsArray[i].height);
        newItem.shapeColor = color(255, 255, 0);
        items.add(newItem);
    }
    
    // Create interactables
    for (var i = 0; i < interactablesArray.length; i++) {
        var newInteractable = createSprite(interactablesArray[i].x, interactablesArray[i].y, interactablesArray[i].width, interactablesArray[i].height);
        newInteractable.shapeColor = color(50, 155, 100);
        newInteractable.setCollider("rectangle", 0, 0, 75, 50);
        interactables.add(newInteractable);
    }

    // Create player
    player = createSprite(200, 250);

    //playerIdle = loadImage("assets/dude-idle.png");
    playerForwards = loadImage("assets/dude-forwards.png");
    playerBackwards = loadImage("assets/dude-backwards.png");
    //playerJumping = loadImage("assets/dude-jumping.png");

    player.addImage(playerForwards);
}

function draw() {
    background("#2a2e33");
    image(backgroundImg, 0, -220);
    
    //pointLight(250, 250, 250, 250, 250, 0);
    
    // Set camera position
    camera.position.x = player.position.x;
    camera.position.y = player.position.y - 75;
        
    // Rotate player relative to platform collider
    player.overlap(platforms, rotatePlayer);
    
    // Add gravity
    player.velocity.y += GRAVITY;

    // Prevent player from falling while on platform
    player.collide(platforms, preventFalling);

    // Climb when player overlaps climbable area
    player.overlap(climbables, climb);
    
    // Remove items on overlap
    player.overlap(items, getItem);
    
    // Player interaction
    player.overlap(interactables, interact);

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
        jump();
    }
    
    // Limit player movements
    if (player.position.x < 0 + player.width / 2) player.position.x = 0 + player.width / 2;
    if (player.position.x > sceneWidth) player.position.x = sceneWidth;
    if (player.position.y > sceneHeight - player.width / 2) player.position.y = sceneHeight - player.width / 2;
    
    drawSprites();
}

function rotatePlayer(player, platform) {
    player.rotation = platform.collider.rotation * 180 / PI;
}

function preventFalling(player, platform) {
    player.position.y = player.position.y;
    player.velocity.y = GRAVITY;
}

function climb(player, climbable) {
    player.velocity.y = 0;
    player.position.y = player.position.y;
    if (keyIsDown(UP_ARROW)) {
        player.position.y -= 3;
    }
    if (keyIsDown(DOWN_ARROW)) {
        player.position.y += 3;
    }
}

function getItem(player, item) {
    item.remove();
    score += 1;
    scoreCount.innerHTML = score;
    collectSound.setVolume(0.5);
    collectSound.play();
}

function interact(player, interactable) {
    if (keyWentDown(88)) {
        interactable.remove();
        climbables[0].position.x = 875;
        climbables[0].shapeColor = color(255, 100, 0);
    }
}

function jump() {
    console.log(player.velocity.y);
    
    if (!jumping && player.velocity.y == GRAVITY || player.velocity.y == 0) {
        jumping = true;
        player.velocity.y = -10 * 1;
        player.rotation = 0;
    }
    
    jumping = false;
}