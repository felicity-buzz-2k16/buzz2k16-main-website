var create, cursors, game, layer, map, player, sprite, preload, tileset, update, music, render;

game = map = tileset = layer = player = cursors = false;

var test;
var facing = 'down';
var collisionTable = {};
var playerCG, collisionCG;
var walls, entries, sprites;
var isModalOpen = false;

function modalClosed () {
  game.paused = false;
  setTimeout(function () { // To ignore certain extra triggered collisions
    isModalOpen = false
  }, 100)
}

var modals = {
  "26,27": "schedule",
  "6,10": "events",
  "43,34": "about",
  "42,10": "game1",
  "59,20": "game2",
}

preload = function() {
    game.load.tilemap('map', "maptown.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'assets/tileset-wesley.png');
    game.load.image('ben10', 'assets/ben10.png');
    game.load.image('gandalf', 'assets/gandalf.png')
    game.load.image('batman', 'assets/batman.png')
    game.load.image('johnny', 'assets/johnny.png')
    game.load.image('spiderman', 'assets/spiderman.png')
    game.load.image('naruto', 'assets/naruto.png')
    game.load.image('dragon', 'assets/dragon.png')
    game.load.image('flash', 'assets/flash.png')
    game.load.image('bunny', 'assets/bunny.png')
    game.load.spritesheet('ash', 'assets/ash.gif', 15.16, 16);
};

create = function() {


  // Physics and Keyboard Input
  cursors = game.input.keyboard.createCursorKeys();

  // Create the map and layers
  map = game.add.tilemap('map');
  map.addTilesetImage('tileset');
  map.addTilesetImage('ben10');
  map.addTilesetImage('gandalf');
  map.addTilesetImage('batman');
  map.addTilesetImage('johnny');
  map.addTilesetImage('spiderman');
  map.addTilesetImage('naruto');
  map.addTilesetImage('dragon');
  map.addTilesetImage('bunny');
  map.addTilesetImage('flash');
  var ground = map.createLayer('Ground');
  walls = map.createLayer('Walls');
  entries = map.createLayer('Entries');
  sprites = map.createLayer('Sprites');
  // walls.debug = true;
  map.setCollisionBetween(1, 10000, true, walls);
  map.setCollisionBetween(1, 10000, true, entries);
  map.setCollisionBetween(1, 10000, true, sprites);

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
  game.physics.arcade.collide(player, entries, function (pl, entry) {
    if (isModalOpen) return
    isModalOpen = true
    picoModal('entered a building ' + entry.x + ' , ' + entry.y + ' , ' + modals[entry.x + ',' + entry.y])
        .afterClose(modalClosed)
        .show();
    game.paused = true
  });
  game.physics.arcade.collide(player, sprites, function (pl, character) {
    if (isModalOpen) return
    isModalOpen = true
    picoModal(`<img src="./assets/images/${character.properties.name}.jpg" width="${window.innerWidth*0.5}"><p align="center">"${character.properties.dialogue}"</p>`)
        .afterClose(modalClosed)
        .show();
    game.paused = true
  })
  game.physics.arcade.collide(player, walls);
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
  if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
    player.animations.play('walk_left');
    player.body.velocity.x = -100;
    facing = 'left';
  } else if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    player.animations.play('walk_right');
    player.body.velocity.x = 100;
    facing = 'right';
  } else if (cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
    player.animations.play('walk_up');
    player.body.velocity.y = -100;
    facing = 'up';
  } else if (cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
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
