var jumping = false;
var gravity = 0.3;
var platformHeight = 20;

var player = {
    width: 20,
    height: 50
};

var platforms = [];
 
platforms.push({
    x: 300,
    y: 200,
    width: 600,
    height: platformHeight      
});

platforms.push({
    x: 750,
    y: 250,
    width: 300,
    height: platformHeight
});

function setup() {
    createCanvas(800, 480);
    
    // Create platforms
    for (var i = 0; i < platforms.length; i++) {
        platforms[i] = createSprite(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
        platforms[i].shapeColor = color(200);
    }
    
    // Create player
    player = createSprite(150, 50, player.width, player.height);
    player.shapeColor = color(0);
}

function draw() {
    console.log("X: " + player.position.x);
    console.log("Y: " + player.position.y);
    
    background("#86d0fd");
    
    for (var i = 0; i < platforms.length; i++) {
        player.collide(platforms[i], function() {
            player.position.y = player.position.y;
        });
    }
    
    // Add gravity
    //player.addSpeed(0.07, 90);
    
    // Move player with keys
    if (keyIsDown(RIGHT_ARROW)) {
        player.position.x += 3;
    }
    
    if (keyIsDown(LEFT_ARROW)) {
        player.position.x -= 3;
    }
    
    if (keyWentDown(' ')) {
        console.log("jump");
        if (!jumping) {
            jumping = true;
            player.velocity.y = -3*2;
        }
        jumping = false;
    }
        
    player.velocity.y += gravity;
    
    drawSprites();
}