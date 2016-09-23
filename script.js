var create, cursors, game, layer, map, player, sprite, preload, tileset, update, music, render;

game = map = tileset = layer = player = cursors = false;

var test;
var facing = 'down';
var collisionTable = {};
var playerCG, collisionCG;


preload = function() {
    game.load.tilemap('map', "maptown.json", null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'assets/tileset-wesley.png');
    game.load.spritesheet('ash', 'assets/ash.gif', 15.16, 16);
};

create = function() {


  // Physics and Keyboard Input
  game.physics.startSystem(Phaser.Physics.P2JS);
  cursors = game.input.keyboard.createCursorKeys();
  game.physics.p2.setImpactEvents(true);

  // Create the map and layers
  map = game.add.tilemap('map');
  map.addTilesetImage('tileset');
  var ground = map.createLayer('Ground');
  var walls = map.createLayer('Walls');
  // Player (No animation yet)
  player = game.add.sprite(576, 608, 'ash');
  game.physics.p2.enable(player);
  player.body.fixedRotation = true;
  player.animations.add('walk_down', [1,2], 8, true);
  player.animations.add('walk_left', [4,5], 8, true);
  player.animations.add('walk_right', [6,7], 8, true);
  player.animations.add('walk_up', [10,11], 8, true);
  player.frame = 0;

  // Set World Bounds
  game.world.setBounds(0,0,640,640);

  // Collision Groups
  playerCG =   game.physics.p2.createCollisionGroup();
  collisionCG =   game.physics.p2.createCollisionGroup();


  // Pokeballs
  /*var cut_ball = game.add.sprite(632,504,'pokeball');
  game.physics.p2.enable(cut_ball);
  cut_ball.body.static = true;
  cut_ball.body.setCollisionGroup(cut_ballCG);
  cut_ball.body.collides(playerCG);


  // Bushes
  bushes[0] = game.add.sprite(456, 504, 'bush');
  bushes[1] = game.add.sprite(104, 408, 'bush');
  bushes[2] = game.add.sprite(312, 8, 'bush');

  for (i = 0; i < bushes.length; i++) {
    game.physics.p2.enable(bushes[i]);
    bushes[i].body.static = true;
    bushes[i].body.setCollisionGroup(bushCG);
    bushes[i].body.collides(playerCG);
  }

*/
  // Player Collisions
  player.body.setCollisionGroup(playerCG);

  collisionBetween(player, "Walls");

  //player.body.collides(collisionCG,collide,this);
  player.body.collideWorldBounds=true;

  game.camera.follow(player);

  //player.body.collides(grassCG,onGrass,this);

  //map.setCollisionBetween(1,8);
  //map.setTileIndexCallback(8, onGrass, this, grass);

};

update = function() {
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


// This function causes collisions between the player sprite and a certain layer.
collisionBetween = function(player, layer) {
  collisionTable[layer] = game.physics.p2.createCollisionGroup();
  var layerObjects = game.physics.p2.convertTilemap(map, layer);
    for (i = 0; i < layerObjects.length; i++) {
        var layerBody = layerObjects[i];
        layerBody.setCollisionGroup(collisionTable[layer]);
        layerBody.collides(playerCG);
    }
  player.body.collides(collisionTable[layer]);
};


// This function will cause random battles to occur when on the grass


// This function gives the player the ability to cut the bushes when he collects the pokeball


render = function() {
};

game = new Phaser.Game(320, 320, Phaser.CANVAS, 'phaser-game', {
  preload: preload,
  create: create,
  update: update,
  render: render
});
