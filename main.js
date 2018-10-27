var game = new Phaser.Game('100', '100', Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
})

var roaches, corpse, ang = 0, qian = 0, countdown = 60, score = 0, countdown_text = '', score_text = ''
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

    countdown_text = game.add.text(10, 10, countdown)
    score_text = game.add.text(game.width - 50, 10, score)
    timer = game.time.create()
    timer.start()
}
function update () {
    passtime = Math.round((timer.ms)/1000)
    if (timer.running) {
        if (passtime <= countdown) {
            countdown_text.setText(countdown - passtime)
        } else {
            timer.stop()
            document.title = '我消灭了' + score + '只小强'
            console.log('Game over')
        }
    }
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
    if (!timer.running) return false
    roaches.kill()
    score_text.setText(++score)
    corpse = game.add.sprite(roaches.x, roaches.y, 'roach', 3);
    corpse.anchor.setTo(0.5, 0.5);
    corpse.angle = roaches.angle
    
    var startSide = Math.random()*4 | 0
    roaches.angle = [0, 90, 180, 270][startSide]
    roaches.reset(
        [0, Math.random()*game.width, game.width, Math.random()*game.width][startSide],
        [Math.random()*game.height, 0, Math.random()*game.height, game.height][startSide]
    );
}