var player;
var platforms;

// Render Scene
var sceneWidth  = 3600;
var sceneHeight = 1700;

// Images
//var levelBackground, levelForeground;
var playerIdle, playerForwards, playerBackwards, playerJumping;

// Gravity and jumps
var gravity = 1;
var jumping = false;



function preload() {
}



function setup() {
    createCanvas(1000, 500);
    
    // Create groups
    platforms = new Group();
    
    // Add platforms
    var platform1 = createSprite(width/2, height/2);
    platform1.addImage(loadImage("assets/level0.png"));
    platforms.add(platform1);
    
    // Create player
    player = createSprite(100, 0);
    playerForwards  = loadImage("assets/dude-forwards.png");
    playerBackwards = loadImage("assets/dude-backwards.png");
    player.addAnimation("normal", "assets/dude-backwards.png");
}

function draw() {
    background("#2a2e33");
    
    player.velocity.y += gravity;
    
    // Set camera position
    camera.position.x = player.position.x + 150;
    camera.position.y = player.position.y - 50;
    
    player.overlap(platforms, function(player, platform){
        if (platform.overlapPixel(player.position.x, player.position.y + (player.height / 2))) {
            player.velocity.y = 0;
            player.position.y -= 1;
            jumping = false;
            
            while (platform.overlapPixel(player.position.x, player.position.y + (player.height / 2))) {
                player.position.y -= 3;
            }
        }
    });

    // Limit player movements
    if (player.position.x < 0 + player.width / 2) player.position.x = 0 + player.width / 2;
    /*if (player.position.x > sceneWidth) player.position.x = sceneWidth;
    if (player.position.y > sceneHeight - player.width / 2) player.position.y = sceneHeight - player.width / 2;*/
    
    // Jump
    if (keyWentDown(' ')) {
        
        if (!jumping) {
            jumping = true;
            player.position.y -= 5;
            player.velocity.y -= 15;
        }
    }
    
    // Move player with keys
    if (keyIsDown(RIGHT_ARROW)){
        player.position.x += 4;
        player.addImage(playerForwards);
    }

    if (keyIsDown(LEFT_ARROW)){
        player.position.x -= 4;
        player.addImage(playerBackwards);
    }

    drawSprites();
}