var player;
var gravity = 1;
var jumping = false;

// Groups
var platforms, backgrounds, items, interactables, climbables;

// Render Scene
var sceneWidth = 3400;
var sceneHeight = 1700;

// Platforms
var platformWidth = 541;
var platform1Img, platform2Img, platform3Img, platform4Img, platform5Img, platform6Img, platform7Img, platform8Img, platform9Img, platform10Img, platform11Img, platform12Img, platform13Img, platform14Img, platform15Img, platform16Img, platform17Img, platform18Img, platform19Img, platform20Img, platform21Img, platform22Img, platform23Img, platform24Img, platform25Img, platform26Img, platform27Img, platform28Img, platform29Img, platform30Img, platform31Img;

// Images
//var levelBackground, levelForeground;

// Animations
var animateIdle, animateWalk;

// Score
var score = 0;
var scoreCount = document.querySelector('#score');

function preload() {
    // Preload platform images
    platform1Img = loadImage("assets/map/1.png");
    platform2Img = loadImage("assets/map/2.png");
    platform3Img = loadImage("assets/map/3.png");
    platform4Img = loadImage("assets/map/4.png");
    platform5Img = loadImage("assets/map/5.png");
    platform6Img = loadImage("assets/map/6.png");
    platform7Img = loadImage("assets/map/7.png");
    platform8Img = loadImage("assets/map/8.png");
    platform9Img = loadImage("assets/map/9.png");
    platform10Img = loadImage("assets/map/10.png");
    platform11Img = loadImage("assets/map/11.png");
    platform12Img = loadImage("assets/map/12.png");
    platform13Img = loadImage("assets/map/13.png");
    platform14Img = loadImage("assets/map/14.png");
    platform15Img = loadImage("assets/map/15.png");
    platform16Img = loadImage("assets/map/16.png");
    platform17Img = loadImage("assets/map/17.png");
    platform18Img = loadImage("assets/map/18.png");
    platform19Img = loadImage("assets/map/19.png");
    platform20Img = loadImage("assets/map/20.png");
    platform21Img = loadImage("assets/map/21.png");
    platform22Img = loadImage("assets/map/22.png");
    platform23Img = loadImage("assets/map/23.png");
    platform24Img = loadImage("assets/map/24.png");
    platform25Img = loadImage("assets/map/25.png");
    platform26Img = loadImage("assets/map/26.png");
    platform27Img = loadImage("assets/map/holefiller.png");

    // Preload animations
    animateIdle = loadAnimation("assets/animation_idle/idle0001.png", "assets/animation_idle/idle0002.png");
    animateWalk = loadAnimation("assets/animation_walk/walking0001.png", "assets/animation_walk/walking0002.png");

    animateIdle.frameDelay = 50;
    animateWalk.frameDelay = 10;
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
    var platform1 = createSprite(0, 0);
    platform1.addImage(platform1Img);
    platforms.add(platform1);

    var platform2 = createSprite(platformWidth, 56);
    platform2.addImage(platform2Img);
    platforms.add(platform2);

    var platform3 = createSprite(platformWidth * 2, 83);
    platform3.addImage(platform3Img);
    platforms.add(platform3);

    var platform4 = createSprite(platformWidth * 3, 63);
    platform4.addImage(platform4Img);
    platforms.add(platform4);

    var platform5 = createSprite(platformWidth * 4, 55);
    platform5.addImage(platform5Img);
    platforms.add(platform5);

    var platform6 = createSprite(platformWidth * 5, 55);
    platform6.addImage(platform6Img);
    platforms.add(platform6);

    var platform7 = createSprite(platformWidth * 6 - 46, 66);
    platform7.addImage(platform7Img);
    platforms.add(platform7);

    var platform8 = createSprite(platformWidth * 7 + 55, 88);
    platform8.addImage(platform8Img);
    platforms.add(platform8);

    var platform9 = createSprite(platformWidth * 8, 0);
    platform9.addImage(platform9Img);
    platforms.add(platform9);

    var platform10 = createSprite(platformWidth * 9, 0);
    platform10.addImage(platform10Img);
    platforms.add(platform10);

    var platform11 = createSprite(0, 538);
    platform11.addImage(platform11Img);
    platforms.add(platform11);

    var platform12 = createSprite(platformWidth - 66, 538);
    platform12.addImage(platform12Img);
    platforms.add(platform12);

    var platform13 = createSprite(platformWidth * 6 + 5, 537);
    platform13.addImage(platform13Img);
    platforms.add(platform13);

    var platform14 = createSprite(platformWidth * 7, 541);
    platform14.addImage(platform14Img);
    platforms.add(platform14);

    var platform15 = createSprite(platformWidth * 8, 541);
    platform15.addImage(platform15Img);
    platforms.add(platform15);

    var platform16 = createSprite(platformWidth * 9, 541);
    platform16.addImage(platform16Img);
    platforms.add(platform16);

    var platform17 = createSprite(0, 1100);
    platform17.addImage(platform17Img);
    platforms.add(platform17);

    var platform18 = createSprite(platformWidth, 1100);
    platform18.addImage(platform18Img);
    platforms.add(platform18);

    var platform19 = createSprite(platformWidth * 2, 1100);
    platform19.addImage(platform19Img);
    platforms.add(platform19);

    var platform20 = createSprite(platformWidth * 3, 1100);
    platform20.addImage(platform20Img);
    platforms.add(platform20);

    var platform21 = createSprite(platformWidth * 4, 1100);
    platform21.addImage(platform21Img);
    platforms.add(platform21);

    var platform22 = createSprite(platformWidth * 5, 1100);
    platform22.addImage(platform22Img);
    platforms.add(platform22);

    var platform23 = createSprite(platformWidth * 6, 1100);
    platform23.addImage(platform23Img);
    platforms.add(platform23);

    var platform24 = createSprite(platformWidth * 7, 1100);
    platform24.addImage(platform24Img);
    platforms.add(platform24);

    var platform25 = createSprite(platformWidth * 8, 1100);
    platform25.addImage(platform25Img);
    platforms.add(platform25);

    var platform26 = createSprite(platformWidth * 9, 1100);
    platform26.addImage(platform26Img);
    platforms.add(platform26);

    var platform27 = createSprite(platformWidth * 6 + 200, 85);
    platform27.addImage(platform27Img);
    platforms.add(platform27);

    // Add backgrounds
    /*var background1 = createSprite(2525, 420);
    background1.addImage(loadImage("assets/foreground.png"));
    backgrounds.add(background1);*/

    // Add items
    /*var item1 = createSprite(120, 650, 10, 10);
    item1.shapeColor = color(255, 255, 0);
    items.add(item1);*/

    // Add interactables
    var interactable1 = createSprite(540, -300, 30, 30);
    interactable1.shapeColor = color(0, 144, 67);
    interactables.add(interactable1);

    // Add climbables
    var climbable1 = createSprite(platformWidth * 8 - 75, 400, 210, 1000);
    climbable1.shapeColor = color(82, 38, 0);
    climbables.add(climbable1);

    // Create player
    player = createSprite(50, 0);

    // Animations
    player.addAnimation("idle", animateIdle);
    player.addAnimation("walk", animateWalk);
}

function draw() {
    background("#2a2e33");
    player.changeAnimation("idle");

    //pointLight(250, 250, 250, player.position.x, player.position.y, 0);

    // Set camera position
    camera.position.y = player.position.y - 180;
    camera.zoom = 1;

    if (player.position.x <= 426) {
        camera.position.x = 426;
    } else {
        camera.position.x = player.position.x;
    }

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
    if (player.position.x < player.width / 2 - 490) player.position.x = player.width / 2 - 490;
    /*if (player.position.x > sceneWidth) player.position.x = sceneWidth;
    if (player.position.y > sceneHeight - player.width / 2) player.position.y = sceneHeight - player.width / 2;*/

    // Jump
    if (keyWentDown(' ')) {
        if (!jumping) {
            jumping = true;
            player.velocity.y -= 25;
        }
    }

    // Move player with arrow keys
    if (keyIsDown(RIGHT_ARROW)) {
        //player.position.x += 5;
        player.position.x += 20;
        player.changeAnimation("walk");
        player.mirrorX(1);
    }

    if (keyIsDown(LEFT_ARROW)) {
        //player.position.x -= 5;
        player.position.x -= 20;
        player.changeAnimation("walk");
        player.mirrorX(-1);
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
        var platformToRemove = platforms.get(platforms.size() - 1);
        platformToRemove.remove();
    }
}

function climb(player, climbable) {
    player.velocity.y = 0;
    player.position.y = player.position.y;

    if (keyIsDown(UP_ARROW)) {
        player.position.y -= 8;
    }

    if (keyIsDown(DOWN_ARROW)) {
        player.position.y += 8;
    }
}
