var game = new Phaser.Game('100', '100', Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
})

var roaches, corpse, ang = 0, qian = 0
function preload () {
    game.load.spritesheet('roach', 'images/roach.png', 64, 64, 4)
}
function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#fff';
    roaches = game.add.sprite(0, game.height/2, 'roach');
    roaches.animations.add('creep', [0, 1, 0, 2], 12, true);
    roaches.animations.play('creep', 20, true);
    game.physics.enable(roaches, Phaser.Physics.ARCADE);
    roaches.anchor.setTo(0.5, 0.5);
    roaches.body.collideWorldBounds = true;

    roaches.body.onWorldBounds = new Phaser.Signal();
    roaches.body.onWorldBounds.add(hitWorldBounds, this);
    
    roaches.inputEnabled = true;
    roaches.events.onInputDown.add(clickRoach, this);
}
function update () {
    if (qian) {
        ang += 5
        qian --
    } else {
        ang += Math.random()*90-45
        ang %= 180
    }
    roaches.body.angularVelocity = ang;
    roaches.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(roaches.angle, 700));
}
function hitWorldBounds() {
    qian = 5
}
function clickRoach() {
    roaches.kill()
    corpse = game.add.sprite(roaches.x, roaches.y, 'roach', 3);
    corpse.anchor.setTo(0.5, 0.5);
    corpse.angle = roaches.angle
    
    roaches.body.angularVelocity = 0
    roaches.reset(0, game.height/2);
}