var player;
var gravity = 1;
var jumping = false;
var isHoldingAxe = false;
var pushingStone = false;
var psstSoundPlayed = false;

// Sounds
var forestSound, ambienceSound;
var collectSound, removePlatformSound, psstSound;

// Groups
var platforms, backgrounds, items, interactables, climbables;

// Things
var backpack, item, stone, axe, tree, treeCut;
var bush1, bush2, bush3, bush4;
var tip1, tip2;

// Render Scene
var sceneWidth = 3400;
var sceneHeight = 1700;

var platformWidth = 541;

// Images
var platform1Img, platform2Img, platform3Img, platform4Img, platform5Img, platform6Img, platform7Img, platform8Img, platform9Img, platform10Img, platform11Img, platform12Img, platform13Img, platform14Img, platform15Img, platform16Img, platform17Img, platform18Img, platform19Img, platform20Img, platform21Img, platform22Img, platform23Img, platform24Img, platform25Img, platform26Img, platform27Img, platform28Img, platform29Img, platform30Img, platform31Img;

var foregroundFiller;
var backgroundImg;
var jumpImg, jumpAxeImg, preClimbImg;
var bush1Img, bush2Img, bush3Img, bush4Img;
var tip1Img, tip2Img;

// Animations
var animateIdle, animateWalk, animatePush, animateClimb, animateIdleAxe, animateWalkAxe;

// Score
var score = 0;
var scoreCount = document.querySelector('#player-score');

function preload() {
    
    // Preload sounds
    soundFormats('mp3', 'ogg');
    forestSound = loadSound("assets/audio/forest.mp3");
    levelSound2 = loadSound("assets/audio/ambience.mp3");
    
    collectSound = loadSound("assets/audio/collect_1.mp3");
    removePlatformSound = loadSound("assets/audio/sound_earthquake.mp3");
    psstSound = loadSound("assets/audio/pssst.mp3");
    
    forestSound.setVolume(0.03);
    collectSound.setVolume(0.7);
    psstSound.setVolume(0.5);
    
    // Preload images
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

    //backgroundImg = loadImage("assets/foreground.png");
    backgroundImg = loadImage("assets/background_forest.jpg");

    jumpImg = loadImage("assets/Animations/Jump/jump0001.png");
    jumpAxeImg = loadImage("assets/Animations/Jump_axe/jumpaxe0002.png");
    preClimbImg = loadImage("assets/Animations/Pre-climb/preclimb0001.png");
    
    bush1Img = loadImage("assets/busheskt/Bush_1/Bush_1_0001.png");
    bush2Img = loadImage("assets/busheskt/Bush_2/Bush_2_0001.png");
    bush3Img = loadImage("assets/busheskt/Bush_3.png");
    bush4Img = loadImage("assets/busheskt/Bush_4/Bush_4_0002.png");
    
    // Tips
    tip1Img = loadImage("assets/tip_1.png");
    tip2Img = loadImage("assets/tip_2.png");

    // Preload animations
    animateIdle = loadAnimation("assets/Animations/Idle/idle0001.png", "assets/Animations/Idle/idle0002.png");
    animateWalk = loadAnimation("assets/Animations/Walk/walk0001.png", "assets/Animations/Walk/walk0002.png");
    animatePush = loadAnimation("assets/Animations/Walk_push/walkpush0001.png", "assets/Animations/Walk_push/walkpush0002.png");
    animateClimb = loadAnimation("assets/Animations/Climb/climb0001.png", "assets/Animations/Climb/climb0004.png");
    animateIdleAxe = loadAnimation("assets/Animations/Idle_axe/idleaxe0001.png", "assets/Animations/Idle_axe/idleaxe0002.png");
    animateWalkAxe = loadAnimation("assets/Animations/Walk_axe/walkaxe0001.png", "assets/Animations/Walk_axe/walkaxe0002.png");

    animateIdle.frameDelay = 55;
    animateWalk.frameDelay = 10;
    animatePush.frameDelay = 10;
    animateClimb.frameDelay = 10;
    animateIdleAxe.frameDelay = 55;
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    
    // Background music
    forestSound.play();
    forestSound.loop();
    
    /*levelSound2.setVolume(1);
    levelSound2.play();
    levelSound2.loop();*/
    
    // Create groups
    platforms = new Group();
    backgrounds = new Group();
    items = new Group();
    interactables = new Group();
    climbables = new Group();
    
    // Add backgrounds
    var background1 = createSprite(2575, -800);
    background1.addImage(backgroundImg);
    backgrounds.add(background1);
    
    var backgroundCave = createSprite(2475, 620);
    backgroundCave.addImage(loadImage("assets/Background_Underground.jpg"));
    backgrounds.add(backgroundCave);
    
    // Add platforms
    var platform1 = createSprite(1, 0);
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

    var platform8 = createSprite(platformWidth * 7 + 51, 83);
    platform8.addImage(platform8Img);
    platforms.add(platform8);

    var platform9 = createSprite(platformWidth * 8, 87);
    platform9.addImage(platform9Img);
    platforms.add(platform9);

    var platform10 = createSprite(platformWidth * 9, 87);
    platform10.addImage(platform10Img);
    platforms.add(platform10);

    var platform11 = createSprite(0, 537);
    platform11.addImage(platform11Img);
    platforms.add(platform11);

    var platform12 = createSprite(platformWidth - 67, 537);
    platform12.addImage(platform12Img);
    platforms.add(platform12);

    var platform13 = createSprite(platformWidth * 6 + 2, 536);
    platform13.addImage(platform13Img);
    platforms.add(platform13);

    var platform14 = createSprite(platformWidth * 7, 534);
    platform14.addImage(platform14Img);
    platforms.add(platform14);

    var platform15 = createSprite(platformWidth * 8, 535);
    platform15.addImage(platform15Img);
    platforms.add(platform15);

    var platform16 = createSprite(platformWidth * 9, 535);
    platform16.addImage(platform16Img);
    platforms.add(platform16);

    var platform17 = createSprite(0, 1078);
    platform17.addImage(platform17Img);
    platforms.add(platform17);

    var platform18 = createSprite(platformWidth, 1078);
    platform18.addImage(platform18Img);
    platforms.add(platform18);

    var platform19 = createSprite(platformWidth * 2, 1128);
    platform19.addImage(platform19Img);
    platforms.add(platform19);

    var platform20 = createSprite(platformWidth * 3, 1206);
    platform20.addImage(platform20Img);
    platforms.add(platform20);

    var platform21 = createSprite(platformWidth * 4, 1215);
    platform21.addImage(platform21Img);
    platforms.add(platform21);

    var platform22 = createSprite(platformWidth * 5, 1213);
    platform22.addImage(platform22Img);
    platforms.add(platform22);

    var platform23 = createSprite(platformWidth * 6, 1077);
    platform23.addImage(platform23Img);
    platforms.add(platform23);

    var platform24 = createSprite(platformWidth * 7, 1076);
    platform24.addImage(platform24Img);
    platforms.add(platform24);

    var platform25 = createSprite(platformWidth * 8, 1076);
    platform25.addImage(platform25Img);
    platforms.add(platform25);

    var platform26 = createSprite(platformWidth * 9, 1076);
    platform26.addImage(platform26Img);
    platforms.add(platform26);

    var platform27 = createSprite(platformWidth * 6 + 200, 85);
    platform27.addImage(platform27Img);
    platforms.add(platform27);
    
    // Add items
    var item1 = createSprite(1000, 700);
    item1.addImage(loadImage("assets/LightemOne.png"));
    items.add(item1);
    
    bush1 = createSprite(1550, -210);
    bush1.addImage(bush1Img);
    
    bush3 = createSprite(2500, -250);
    bush3.addImage(bush3Img);
    interactables.add(bush3);
    
    bush4 = createSprite(3800, -210);
    bush4.addImage(bush4Img);
    
    /*bush = createSprite(540, -300, 30, 30);
    bush.shapeColor = color(0, 144, 67);
    interactables.add(bush);*/
    
    // Screen tips
    /*tip1 = createSprite(900, -250);
    tip1.addImage(tip1Img);
    
    tip2 = createSprite(2000, -300);
    tip2.addImage(tip2Img);*/

    tree = createSprite(3924, -450);
    tree.addImage(loadImage("assets/Trees/tree_black.png"));
    interactables.add(tree);

    var climbable1 = createSprite(platformWidth * 8 - 75, 400, 210, 1000);
    climbable1.addImage(loadImage("assets/ladder.png"));
    climbables.add(climbable1);
    
    stone = createSprite(500, -300);
    stone.addImage(loadImage("assets/item_stone.png"));

    treeCut = createSprite(3924, -127);
    treeCut.addImage(loadImage("assets/Trees/tree_black_cut.png"));
    
    axe = createSprite(3000, 1031);
    axe.addImage(loadImage("assets/axe_ground.png"));
    interactables.add(axe);

    // Create player
    player = createSprite(50, 0);
    
    // Player images and animations
    player.addImage("jump", jumpImg);
    player.addImage("jumpAxe", jumpAxeImg);
    player.addImage("preClimb", preClimbImg);

    player.addAnimation("idle", animateIdle);
    player.addAnimation("walk", animateWalk);
    player.addAnimation("push", animatePush);
    player.addAnimation("climb", animateClimb);
    player.addAnimation("idleAxe", animateIdleAxe);
    player.addAnimation("walkAxe", animateWalkAxe);
    
    // Add foreground
    var foreground = createSprite(2435, 545);
    foreground.addImage(loadImage('assets/foreground.png'));
    
    foregroundFiller = createSprite(platformWidth * 6 + 247, 100);
    foregroundFiller.addImage(loadImage("assets/holefiller_overlays.png"));
    
    bush2 = createSprite(1750, -175);
    bush2.addImage(bush2Img);
}

function draw() {    
    background("#000000");
    
    // Set camera position
    camera.position.y = player.position.y - 180;
    camera.zoom = .65;

    if (player.position.x <= 931) {
        camera.position.x = 931;
    } else if (player.position.x >= 3950) {
        camera.position.x = 3950;
    } else {
        camera.position.x = player.position.x;
    }

    if (isHoldingAxe) {
        player.changeAnimation("idleAxe");
    } else {
        player.changeAnimation("idle");
    }

    if (jumping) {
        if (isHoldingAxe) {
            player.changeImage("jumpAxe");
        } else {
            player.changeImage("jump");
        }
    }
    
    player.overlap(platforms, checkOverlap);
    stone.overlap(platforms, checkOverlap);
    stone.overlap(player, checkOverlap);
    
    /*if (player.overlap(bush3)) {
        if (!psstSoundPlayed) {
            psstSound.play();
            psstSoundPlayed = true;
        }
    } else {
        psstSoundPlayed = false;
    }*/
    
    player.velocity.y += gravity;
    stone.velocity.y += gravity;
        
    // Enable jumping on stone
    if (stone.overlapPixel(player.position.x, player.position.y + player.height / 2 + 3)) {
        jumping = false;
        player.velocity.y = 0;
    }

    // Remove item on overlap
    player.overlap(items, getItem);

    // Interact when player overlaps interactable and presses x
    player.overlap(interactables, interact);

    // Climb up when player overlaps climbable area arrow up is pressed, climb down when arrow down is pressed
    player.overlap(climbables, climb);

    // Limit player movements
    if (player.position.x < player.width / 2 - 252) player.position.x = player.width / 2 - 252;
    if (player.position.x >= 5100) player.position.x = 5100;

    // Jump
    if (keyWentDown(' ')) {
        if (!jumping) {
            jumping = true;
            player.velocity.y -= 15;
        }
    }

    // Move player with arrow keys
    if (keyIsDown(RIGHT_ARROW)) {        
        player.position.x += 8;
        player.mirrorX(1);

        if (isHoldingAxe) {
            player.changeAnimation("walkAxe");

            if (jumping) {
                player.changeImage("jumpAxe");
            }
        } else if (pushingStone) {
            player.changeAnimation("push");
        } else {
            player.changeAnimation("walk");

            if (jumping) {
                player.changeImage("jump");
            }
        }
    }

    if (keyIsDown(LEFT_ARROW)) {
        player.position.x -= 8;
        player.mirrorX(-1);

        if (isHoldingAxe) {
            player.changeAnimation("walkAxe");

            if (jumping) {
                player.changeImage("jumpAxe");
            }   
        } else if (pushingStone) {
            player.changeAnimation("push");
        } else {
            player.changeAnimation("walk");

            if (jumping) {
                player.changeImage("jump");
            }
        }
    }

    drawSprites();
}

function checkOverlap(object, platform) {

    // Check if the player is standing on a platform
    if (platform.overlapPixel(object.position.x, object.position.y + object.height / 2)) {
        object.velocity.y = 0;
        object.position.y -= 1;
        
        if (object === player) jumping = false;
        if (object === stone) pushingStone = false;

        while (platform.overlapPixel(object.position.x, object.position.y + object.height / 2)) {
            object.position.y -= 1;
        }
    }

    // Check if the player's head is hitting a platform
    if (platform.overlapPixel(object.position.x, object.position.y - object.height / 2)) {
        object.velocity.y = 0;
        object.position.y += 1;
        //object.position.x = object.position.x;
        
        if (object === stone) pushingStone = false;

        while (platform.overlapPixel(object.position.x, object.position.y - object.height / 2)) {
            object.position.y += 1;
        }
    }

    // Check if the player's left side is hitting a platform
    if (platform.overlapPixel(object.position.x - (object.width / 2) - 20, object.position.y - object.height / 2)) {
        object.velocity.y = 0;
        object.position.x += 1;
        
        if (object === stone) pushingStone = true;
        
        while (platform.overlapPixel(object.position.x - (object.width / 2) - 20, object.position.y - object.height / 2)) {
            object.position.x += 1;
        }
    }

    // Check if the player's right side is hitting a platform
    if (platform.overlapPixel(object.position.x + (object.width / 2) + 20, object.position.y - object.height / 2)) {
        object.velocity.y = 0;
        object.position.x -= 1;
        //object.position.y = object.position.y;
        
        if (object === stone) pushingStone = true;

        while (platform.overlapPixel(object.position.x + (object.width / 2) + 20, object.position.y - object.height / 2)) {
            object.position.x -= 1;
        }
    }
}

function getItem(player, item) {
    item.remove();
    collectSound.play();
    score += 1;
    scoreCount.innerHTML = score;
}

function interact(player, interactable) {
    if (keyWentDown(88)) {
        if (interactable === bush3) {
            removePlatformSound.play();
            platforms.get(26).remove();
            foregroundFiller.remove();
        } else if (interactable === axe) {
            interactable.remove();
            isHoldingAxe = true;
        } else if (interactable === tree && isHoldingAxe) {
            interactable.remove();
            isHoldingAxe = false;
        }
    }
}

function climb(player, climbable) {
    player.velocity.y = 0;
    player.position.y = player.position.y;
    player.changeImage("preClimb");

    if (keyIsDown(UP_ARROW)) {
        player.changeAnimation("climb");
        player.position.y -= 8;
    }

    if (keyIsDown(DOWN_ARROW)) {
        player.changeAnimation("climb");
        player.position.y += 8;
    }
}
