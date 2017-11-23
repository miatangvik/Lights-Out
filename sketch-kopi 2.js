var fallingObjectsArray = [],
    climbablesArray = [],
    itemsArray = [],
    interactablesArray = [];

// Groups
var fallingObjects, climbables, items, interactables;

var player;

var platform1, platform2, platform3;

// Render Scene
var sceneWidth = 3600;
var sceneHeight = 1700;

// Images
//var levelBackground, levelForeground;
var playerIdle, playerForwards, playerBackwards, playerJumping;

// Gravity and jumps
var GRAVITY = 1;
var jumping = false;

// Score
var score = 0;
var scoreCount = document.querySelector('#score');

// Item size
var itemWidth  = 10;
var itemHeight = 10;

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

// Interactables
interactablesArray.push({
    x: 750,
    y: 370,
    width: 25,
    height: 25
});

function preload() {
    soundFormats('mp3', 'ogg');
    levelSound   = loadSound("assets/audio/level_sound.mp3");
    levelSound2  = loadSound("assets/audio/ambience.mp3");
    collectSound = loadSound("assets/audio/bleh.mp3");
}

function setup() {
    createCanvas(1000, 500);

    levelSound.setVolume(0.3);
    levelSound.play();
    levelSound.loop();

    levelSound2.setVolume(0.3);
    levelSound2.play();
    levelSound2.loop();

    fallingObjects = new Group();
    items = new Group();
    climbables = new Group();
    interactables = new Group();

    // Create level
    platform1 = createSprite(width / 2, height / 2);
    platform1.addImage(loadImage("assets/level0.png"));

    // Create level
    /*levelBackground = createSprite(width / 2, height / 2);
    levelBackground.addImage(loadImage("assets/level1.png"));

    level = createSprite(width / 2, height / 2);
    level.addImage(loadImage("assets/level3.png"));*/

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
    player = createSprite(100, 0);
    playerForwards = loadImage("assets/dude-forwards.png");
    playerBackwards = loadImage("assets/dude-backwards.png");
    player.addAnimation("normal", "assets/dude-backwards.png");

    //levelForeground = createSprite(width / 2, height / 2);
    //levelForeground.addImage(loadImage("assets/level_foreground.png"));
}

function draw() {
    background("#2a2e33");
    
    // Add gravity if the player is not overlapping the non transparent pixels of the level
    if (!platform1.overlapPixel(player.position.x, player.position.y + player.height / 2)) {
        player.velocity.y += GRAVITY;
    }

    // If the bottom of the player overlaps the non transparent pixels of the level move it up one pixel until it doesn't overlap anymore
    while (platform1.overlapPixel(player.position.x, player.position.y + player.height / 2)) {
        player.position.y--;
        player.velocity.y = 0;
    }

    // Set camera position
    //camera.position.x = player.position.x + 150;
    //camera.position.y = player.position.y - 50;

    // Climb when player overlaps climbable area
    /*player.overlap(climbables, climb);

    // Remove items on overlap
    player.overlap(items, getItem);

    // Player interaction
    player.overlap(interactables, interact);*/

    // Limit player movements
    if (player.position.x < 0 + player.width / 2) player.position.x = 0 + player.width / 2;
    /*if (player.position.x > sceneWidth) player.position.x = sceneWidth;
    if (player.position.y > sceneHeight - player.width / 2) player.position.y = sceneHeight - player.width / 2;*/

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

    drawSprites();
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
    if (!jumping) {
        jumping = true;
        player.velocity.y = -10 * 1;
        player.rotation = 0;
    }

    jumping = false;
}
