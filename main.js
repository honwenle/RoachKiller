var game = new Phaser.Game('100', '100', Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
})

var roaches,ang = 0
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
}
function update () {
    roaches.body.angularVelocity = ang + Math.random()*2000-1000
    roaches.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(roaches.angle, 600));
}