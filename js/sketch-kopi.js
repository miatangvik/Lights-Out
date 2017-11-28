var player;
var gravity = 1;
var jumping = false;

// Groups
var platforms, backgrounds, items, interactables, climbables;

// Render Scene
var sceneWidth = 3400;
var sceneHeight = 1700;

// Images
//var levelBackground, levelForeground;
var playerIdle, playerForwards, playerBackwards, playerJumping;

// Animations
var animateIdle, animateWalk;

// Score
var score = 0;
var scoreCount = document.querySelector('#score');

function preload() {
    animateIdle = loadAnimation("assets/animation_idle/idle0001.png", "assets/animation_idle/idle0002.png");
    animateWalk = loadAnimation("assets/animation_walk/walking0001.png", "assets/animation_walk/walking0002.png");
    
    animateIdle.frameDelay = 50;
    animateWalk.frameDelay = 15;
}

function setup() {
    createCanvas(innerWidth, innerHeight);

    // Create groups
    platforms = new Group();
    backgrounds = new Group();
    items = new Group();
    interactables = new Group();
    climbables = new Group();

    // Add platforms
    var platform1 = createSprite(250 + 250, 400);
    platform1.addImage(loadImage("assets/level0.png"));
    platforms.add(platform1);

    var platform2 = createSprite(250 + 1210, 490);
    platform2.addImage(loadImage("assets/level3.png"));
    platforms.add(platform2);

    var platform3 = createSprite(250 + -270, 748);
    platform3.addImage(loadImage("assets/level_bottom_1.png"));
    platforms.add(platform3);

    var platform4 = createSprite(250 + 355, 912);
    platform4.addImage(loadImage("assets/level_bottom_2.png"));
    platforms.add(platform4);

    var platform5 = createSprite(250 + 974, 912);
    platform5.addImage(loadImage("assets/level_bottom_3.png"));
    platforms.add(platform5);

    var platform6 = createSprite(250 + 1599, 663.5);
    platform6.addImage(loadImage("assets/level_bottom_4.png"));
    platforms.add(platform6);
    
    // Add backgrounds
    /*var background1 = createSprite(250 + 250, 15);
    background1.addImage(loadImage("assets/foreground.png"));
    backgrounds.add(background1);*/

    // Add items
    var item1 = createSprite(120, 650, 10, 10);
    item1.shapeColor = color(255, 255, 0);
    items.add(item1);
    
    // Add interactables
    var interactable1 = createSprite(540, 250, 30, 30);
    interactable1.shapeColor = color(0, 144, 67);
    interactables.add(interactable1);
    
    // Add climbables
    var climbable1 = createSprite(1710, 490, 20, 400);
    climbable1.shapeColor = color(82, 38, 0);
    climbables.add(climbable1);
    
    // Create player
    player = createSprite(100, 0);
    
    // Animations
    player.addAnimation("idle", animateIdle);
    player.addAnimation("walk", animateWalk);
}

function draw() {
    background("#2a2e33");
    player.changeAnimation("idle");
        
    //pointLight(250, 250, 250, player.position.x, player.position.y, 0);

    // Set camera position
    camera.position.x = player.position.x + 150;
    camera.position.y = player.position.y - 50;
    camera.zoom = .8;
    
    player.overlap(platforms, function (player, platform) {

        // Check if the player is standing on a platform
        if (platform.overlapPixel(player.position.x, player.position.y + player.height / 2)) {            
            player.velocity.y = 0;
            player.position.y -= 1;
            jumping = false;

            while (platform.overlapPixel(player.position.x, player.position.y + player.height / 2)) {
                player.position.y -= 1;
            }
        }

        // Check if the player's head is hitting a platform
        if (platform.overlapPixel(player.position.x, player.position.y - player.height / 2)) {
            player.position.y += 1;

            while (platform.overlapPixel(player.position.x, player.position.y - player.height / 2)) {
                player.position.y += 1;
            }
        }

        // Check if the player's left side is hitting a platform
        if (platform.overlapPixel(player.position.x - (player.width / 2) - 10, player.position.y - player.height / 2)) {            
            player.position.x += 1;

            while (platform.overlapPixel(player.position.x - (player.width / 2) - 10, player.position.y - player.height / 2)) {
                player.position.x += 1;
            }
        }

        // Check if the player's right side is hitting a platform
        if (platform.overlapPixel(player.position.x + (player.width / 2) + 10, player.position.y - player.height / 2)) {
            player.position.x -= 1;

            while (platform.overlapPixel(player.position.x + (player.width / 2) + 10, player.position.y - player.height / 2)) {
                player.position.x -= 1;
            }
        }
    });

    player.velocity.y += gravity;

    // Remove item on overlap
    player.overlap(items, getItem);
    
    // Interact when player overlaps interactable and presses x
    player.overlap(interactables, interact);
    
    // Climb up when player overlaps climbable area arrow up is pressed, climb down when arrow down is pressed
    player.overlap(climbables, climb);

    // Limit player movements
    if (player.position.x < player.width / 2) player.position.x = player.width / 2;
    /*if (player.position.x > sceneWidth) player.position.x = sceneWidth;
    if (player.position.y > sceneHeight - player.width / 2) player.position.y = sceneHeight - player.width / 2;*/

    // Jump
    if (keyWentDown(' ')) {
        if (!jumping) {
            jumping = true;
            player.velocity.y -= 15;
        }
    }

    // Move player with arrow keys
    if (keyIsDown(RIGHT_ARROW)) {
        player.position.x += 10;
        player.changeAnimation("walk");
    }

    if (keyIsDown(LEFT_ARROW)) {
        player.position.x -= 10;
        player.changeAnimation("walk");
    }

    drawSprites();
}

function getItem(player, item) {
    item.remove();
    score += 1;
    scoreCount.innerHTML = score;
}

function interact(player, interactable) {
    if (keyWentDown(88)) {
        interactable.remove();
    }
}

function climb(player, climbable) {
    player.velocity.y = 0;
    player.position.y = player.position.y;

    if (keyIsDown(UP_ARROW)) {
        player.position.y -= 4;
    }

    if (keyIsDown(DOWN_ARROW)) {
        player.position.y += 4;
    }
}
