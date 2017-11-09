var isOnGround = false;

var player = {};
player.color = "#051215";
player.width = 40;
player.height = 70;

var ground = {};
ground.color = "#898a8b";
ground.width = 600;
ground.height = 50;
ground.x = 300;

function setup() {
    createCanvas(800, 480);
    
    // Create player
    player = createSprite(150, 300, player.width, player.height);
    player.shapeColor = color(0);
    
    // Create ground
    ground = createSprite(ground.x, (height - 25), ground.width, ground.height);
    ground.shapeColor = color(200);
}

function draw() {
    background("#86d0fd");
    
    player.collide(ground, function() {
        player.position.y = player.position.y;
        isOnGround = true;
    });
    
    // Add gravity
    if (isOnGround) {
        player.addSpeed(0, 0);
    } else if (!isOnGround) {
        console.log("gravity");
        player.addSpeed(0.25, 90);
    }
    
    // Move player with keys
    if (keyIsDown(RIGHT_ARROW)) {
        player.position.x += 3;
    }
    
    if (keyIsDown(LEFT_ARROW)) {
        player.position.x -= 3;
    }
    
    if (keyWentDown(' ')) {
        jump();
    }
    
    drawSprites();
}

function jump() {
    console.log(player.position.y);
    if (player.position.y >= 320) {
        console.log("1");
        //player.addSpeed(0.25, -90);
        player.position.y -= 150;
        isOnGround = true;
    } else {
        console.log("2");
    }
}