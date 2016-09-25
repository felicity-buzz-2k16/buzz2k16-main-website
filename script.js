var create, cursors, game, layer, map, player, sprite, preload, tileset, update, music, render;

game = map = tileset = layer = player = cursors = false;

var test;
var facing = 'down';
var collisionTable = {};
var playerCG, collisionCG;
var walls, entries;


preload = function() {
    game.load.tilemap('map', "maptown.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'assets/tileset-wesley.png');
    game.load.spritesheet('ash', 'assets/ash.gif', 15.16, 16);
};

create = function() {


  // Physics and Keyboard Input
  cursors = game.input.keyboard.createCursorKeys();

  // Create the map and layers
  map = game.add.tilemap('map');
  map.addTilesetImage('tileset');
  var ground = map.createLayer('Ground');
  walls = map.createLayer('Walls');
  entries = map.createLayer('Entries');
  // walls.debug = true;
  map.setCollisionBetween(1, 10000, true, walls);
  map.setCollisionBetween(1, 10000, true, entries);

  // Player (No animation yet)
  player = game.add.sprite(26.5*16, 29*16, 'ash');
  player.animations.add('walk_down', [1,2], 8, true);
  player.animations.add('walk_left', [4,5], 8, true);
  player.animations.add('walk_right', [6,7], 8, true);
  player.animations.add('walk_up', [10,11], 8, true);
  player.frame = 0;

  // Set World Bounds
  game.world.setBounds(0, 0, 64*16, 64*16);

  // Player Collisions
  game.physics.enable(player);

  player.body.collideWorldBounds=true;

  game.camera.follow(player);
};

update = function() {
  game.physics.arcade.collide(player, entries, function () {
    console.log('entered a building')
  });
  game.physics.arcade.collide(player, walls);
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
  if (cursors.left.isDown) {
    player.animations.play('walk_left');
    player.body.velocity.x = -100;
    facing = 'left';
  } else if (cursors.right.isDown) {
    player.animations.play('walk_right');
    player.body.velocity.x = 100;
    facing = 'right';
  } else if (cursors.up.isDown) {
    player.animations.play('walk_up');
    player.body.velocity.y = -100;
    facing = 'up';
  } else if (cursors.down.isDown) {
    player.animations.play('walk_down');
    player.body.velocity.y = 100;
    facing = 'down';
  } else {
    player.animations.stop();
    if (facing == 'left') {
      player.frame = 3;
    } else if (facing == 'right') {
      player.frame = 8;
    } else if (facing == 'up') {
      player.frame = 9;
    } else if (facing == 'down') {
      player.frame = 0;
    }
  }


};


render = function() {
};

game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-game', {
  preload: preload,
  create: create,
  update: update,
  render: render
});
