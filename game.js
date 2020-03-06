// <-- anything that follows two slashes is a comment, not read by the computer
// this config object is used below
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Global variables that can be use anywhere
// object that holds the ship
var sprite;
// basic shape that follows ship
var circle;
// keyboard arrow keys, input, control the ship
var cursors;
// dynamic text box that displays speed
var text;

// initialize new game using above configuration
var game = new Phaser.Game(config);

// images, sounds, movies, etc are loaded in preload
function preload() {
    // 
    this.load.image('ship', 'assets/images/ship.png');

}

// this is run after all assets are loaded
function create() {
    // parameters x, y, image name called a key
    sprite = this.physics.add.image(400, 300, 'ship');

    sprite.body.setMaxSpeed(400);
    // params are x, y, radius, color, alpha (transparency)
    circle = this.add.circle(sprite.x, sprite.y, 0.5 * sprite.body.maxSpeed, 0xffffff, 0.2);

    // let's you see the object properties in Chrome
    //console.log(circle);

    // 
    cursors = this.input.keyboard.createCursorKeys();

    // green text, params x, y, initial value ('' means nothing), font and color
    text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' });

    //console.log(this.physics.world);
    console.log(sprite.body);
}

// this runs about 90-100 times per second
function update() {

    // accelerate
    if (cursors.up.isDown) {
        this.physics.velocityFromRotation(sprite.rotation, sprite.body.maxSpeed, sprite.body.acceleration);
    }
    else {
        sprite.setAcceleration(0);
    }
    // go left
    if (cursors.left.isDown) {
        sprite.setAngularVelocity(-300);
    } else if (cursors.right.isDown) {
        sprite.setAngularVelocity(300);
    }
    else {
        sprite.setAngularVelocity(0);
    }

    // display
    //text.setText('Speed: ' + sprite.body.speed);
    text.setText('Speed: ' + Math.round(sprite.body.speed)+'\nAngle: '+sprite.angle);

    // params - object (ship), padding
    this.physics.world.wrap(sprite, 100);

    // update white light circle to follow ship
    circle.setPosition(sprite.x, sprite.y);
}