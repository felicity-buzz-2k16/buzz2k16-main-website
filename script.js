var create, cursors, game, layer, map, player, sprite, preload, tileset, update, music, render;

game = map = tileset = layer = player = cursors = false;

var test;
var facing = 'down';
var collisionTable = {};
var playerCG, collisionCG;
var walls, entries, sprites;
var isModalOpen = false;
var VELOCITY = 150;

function modalClosed () {
  game.paused = false;
  setTimeout(function () { // To ignore certain extra triggered collisions
    isModalOpen = false
  }, 100)
}

var modals = {
  "26,27": {name: "schedule", href: 'schedule/schedule.html'},
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
    game.load.image('juice', 'assets/juice.png')
    game.load.image('buzz_new_small_new', 'assets/buzz_new_small_new.png')
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
  map.addTilesetImage('juice');
  map.addTilesetImage('buzz_new_small_new');
  var ground = map.createLayer('Ground');
  walls = map.createLayer('Walls');
  var objects = map.createLayer('Objects');
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
    var info = modals[entry.x + ',' + entry.y]
    var desc;
    if (!info.href) desc = 'Work In Progress!';
    else {
      window.open(info.href)
      return
    }
    picoModal(desc)
        .afterClose(modalClosed)
        .show();
    game.paused = true
  });
  game.physics.arcade.collide(player, sprites, function (pl, character) {
    if (isModalOpen) return
    isModalOpen = true
    picoModal(`
          <p align="center">
            <img src="./assets/images/${character.properties.name}.jpg" class="dialogue-img">
            <br/><br/>
            <span class="dialogue-text">"${character.properties.dialogue}"</span>
          </p>`)
        .afterClose(modalClosed)
        .show();
    game.paused = true
  })
  game.physics.arcade.collide(player, walls);
  player.body.velocity.x = 0;
  player.body.velocity.y = 0;
  if (game.input.keyboard.event) {
    hideHint ();
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      player.animations.play('walk_left');
      player.body.velocity.x = -VELOCITY * 2;
      facing = 'left';
    } else if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      player.animations.play('walk_right');
      player.body.velocity.x = VELOCITY * 2;
      facing = 'right';
    } else if (cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
      player.animations.play('walk_up');
      player.body.velocity.y = -VELOCITY*1.5 * 2;
      facing = 'up';
    } else if (cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
      player.animations.play('walk_down');
      player.body.velocity.y = VELOCITY*1.5 * 2;
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
  } else {
    if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
      player.animations.play('walk_left');
      player.body.velocity.x = -VELOCITY;
      facing = 'left';
    } else if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
      player.animations.play('walk_right');
      player.body.velocity.x = VELOCITY;
      facing = 'right';
    } else if (cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
      player.animations.play('walk_up');
      player.body.velocity.y = -VELOCITY*1.5;
      facing = 'up';
    } else if (cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
      player.animations.play('walk_down');
      player.body.velocity.y = VELOCITY*1.5;
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
  }


};


render = function() {
};

game = new Phaser.Game(Math.min(window.innerWidth,64*16), Math.min(window.innerHeight,64*16), Phaser.CANVAS, 'phaser-game', {
  preload: preload,
  create: create,
  update: update,
  render: render
});

function hideHint() {
  document.getElementById('hint-dialogue').style.display = 'none'
}

window.setTimeout(hideHint, 5000)
