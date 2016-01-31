(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';


var BootState = require('./states/boot');
var MenuState = require('./states/menu');
var PlayState = require('./states/play');
var PreloadState = require('./states/preload');

var game = new Phaser.Game(840, 420, Phaser.AUTO, 'candy-ritual');

// Game States
game.state.add('boot', BootState);
game.state.add('menu', MenuState);
game.state.add('play', PlayState);
game.state.add('preload', PreloadState);


game.state.start('boot');

  
},{"./states/boot":17,"./states/menu":18,"./states/play":19,"./states/preload":20}],2:[function(require,module,exports){
'use strict';

var Char1 = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'char1', frame);
  this.scale.x = 2;
  this.scale.y = 2;
  this.anchor.setTo(0.5, 0.5);
  this.animations.add('walk', [9,10], 10,true);
  this.animations.play('walk');
  // this.animations.add('duck', [3], 10, true);


  this.flapSound = this.game.add.audio('flap');

  this.name = 'char1';
  this.alive = false;
  this.health = 3;

  // enable physics on the char1
  // and disable gravity on the char1
  // until the game is started
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = true;
  this.body.collideWorldBounds = true;


  this.events.onKilled.add(this.onKilled, this);



};

Char1.prototype = Object.create(Phaser.Sprite.prototype);
Char1.prototype.constructor = Char1;

Char1.prototype.update = function() {
  // check to see if our angle is less than 90
  // if it is rotate the Char1 towards the ground by 2.5 degrees
  if(!this.alive) {
    this.body.velocity.x = 0;
  }
};

Char1.prototype.moveUp = function() {
  if(!!this.alive && this.body.touching.down) {
    this.body.velocity.y = -600;
  }
};

Char1.prototype.moveLeft = function() {
  if (!!this.alive) {
    this.body.velocity.x = -200;
  }
};

Char1.prototype.moveRight = function() {
  if (!!this.alive) {
    this.body.velocity.x = 200;
  }
};

Char1.prototype.moveDown = function() {
  if (!!this.alive) {
    // this.animations.play('duck');
  }
};

Char1.prototype.revived = function() {
};

Char1.prototype.takeDamage = function() {
  this.health--;
};

Char1.prototype.getHealth = function() {
  return this.health;
}

Char1.prototype.gainHealth = function() {
  if (this.health < 3)
    this.health++;
}

Char1.prototype.onKilled = function() {
  this.exists = true;
  this.visible = true;
  this.animations.stop();
  var duration = 90 / this.y * 300;
  this.game.add.tween(this).to({angle: 90}, duration).start();
  console.log('killed');
  console.log('alive:', this.alive);
};

module.exports = Char1;

},{}],3:[function(require,module,exports){
'use strict';

var Enemy = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'enemy', frame);
  this.anchor.setTo(0.5, 0.5);
  this.scale.x = 2;
  this.scale.y = 2;
  this.animations.add('float', [0,1], 2, true);
  this.animations.play('float');
  this.smoothed = false;
  // this.animations.add('angry', [4,5,6], 10, true);

  this.name = 'enemy';

  // enable physics on the enemy
  // and disable gravity on the enemy
  // until the game is started
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.collideWorldBounds = true;

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
    // this.body.velocity.x = 0;
    // this.body.velocity.y = 0;
};

Enemy.prototype.moveUp = function() {
    this.body.velocity.y = -100;
};

Enemy.prototype.moveLeft = function() {
    this.body.velocity.x = -100;
};

Enemy.prototype.moveRight = function() {
    this.body.velocity.x = 100;
};

Enemy.prototype.moveDown = function() {
    this.body.velocity.y = 100;
};

Enemy.prototype.revived = function() {
};


module.exports = Enemy;

},{}],4:[function(require,module,exports){
'use strict';

var FirstAid = function(game, x, y, frame) {


  Phaser.Sprite.call(this, game, x, y, 'firstAid', frame);

  this.anchor.setTo(0.5, 0.5);
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.collideWorldBounds = false;
  this.body.immovable = true;

  // this.events.onKilled.add(this.onKilled, this);

};

FirstAid.prototype = Object.create(Phaser.Sprite.prototype);
FirstAid.prototype.constructor = FirstAid;

FirstAid.prototype.update = function() {
};

module.exports = FirstAid;

},{}],5:[function(require,module,exports){
'use strict';

var Ground = function(game, x, y, width, height) {
  Phaser.TileSprite.call(this, game, x, y, width, height, 'ground');
  this.frame = 2;
  this.scale.x = 2;
  this.scale.y = 3;
  // start scrolling our ground
  this.autoScroll(-100,0);

  // enable physics on the ground sprite
  // this is needed for collision detection
  this.game.physics.arcade.enableBody(this);


  // we don't want the ground's body
  // to be affected by gravity or external forces
  this.body.allowGravity = false;
  this.body.immovable = true;


};

Ground.prototype = Object.create(Phaser.TileSprite.prototype);
Ground.prototype.constructor = Ground;

Ground.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Ground;

},{}],6:[function(require,module,exports){
'use strict';

var Pipe = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'pipe', frame);
  this.anchor.setTo(0.5, 0.5);
  this.game.physics.arcade.enableBody(this);

  this.body.allowGravity = false;
  this.body.immovable = true;
  
};

Pipe.prototype = Object.create(Phaser.Sprite.prototype);
Pipe.prototype.constructor = Pipe;

Pipe.prototype.update = function() {
  // write your prefab's specific update code here
  
};

module.exports = Pipe;
},{}],7:[function(require,module,exports){
'use strict';

var Pipe = require('./pipe');

var PipeGroup = function(game, parent) {

  Phaser.Group.call(this, game, parent);

  this.topPipe = new Pipe(this.game, 0, 0, 0);
  this.bottomPipe = new Pipe(this.game, 0, 440, 1);
  this.add(this.topPipe);
  this.add(this.bottomPipe);
  this.hasScored = false;

  this.setAll('body.velocity.x', -200);
};

PipeGroup.prototype = Object.create(Phaser.Group.prototype);
PipeGroup.prototype.constructor = PipeGroup;

PipeGroup.prototype.update = function() {
  this.checkWorldBounds(); 
};

PipeGroup.prototype.checkWorldBounds = function() {
  if(!this.topPipe.inWorld) {
    this.exists = false;
  }
};


PipeGroup.prototype.reset = function(x, y) {
  this.topPipe.reset(0,0);
  this.bottomPipe.reset(0,440);
  this.x = x;
  this.y = y;
  this.setAll('body.velocity.x', -200);
  this.hasScored = false;
  this.exists = true;
};


PipeGroup.prototype.stop = function() {
  this.setAll('body.velocity.x', 0);
};

module.exports = PipeGroup;
},{"./pipe":6}],8:[function(require,module,exports){
'use strict';

var Platform = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'platform', frame);
  this.anchor.setTo(0.5, 0.5);

  this.scale.x = 15;
  this.scale.y = 1;

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
};

Platform.prototype = Object.create(Phaser.Sprite.prototype);
Platform.prototype.constructor = Platform;

Platform.prototype.update = function() {
};

module.exports = Platform;

},{}],9:[function(require,module,exports){
'use strict';

var Platform = require('./platform');

var PlatformGroup = function(game, parent) {

  Phaser.Group.call(this, game, parent);

  this.topPlatform = new Platform(this.game, 320, 0, 0);
  this.bottomPlatform = new Platform(this.game,  0, 100, 1);
  this.add(this.topPlatform);
  this.add(this.bottomPlatform);

  this.setAll('body.velocity.x', -150);
};

PlatformGroup.prototype = Object.create(Phaser.Group.prototype);
PlatformGroup.prototype.constructor = PlatformGroup;

PlatformGroup.prototype.update = function() {
};


PlatformGroup.prototype.reset = function(x, y) {
  this.bottomPlatform.reset(0, y);
  this.x = x;
  this.y = y;
  this.setAll('body.velocity.x', -150);
  this.hasScored = false;
  this.exists = true;
};


PlatformGroup.prototype.stop = function() {
  this.setAll('body.velocity.x', 0);
};

module.exports = PlatformGroup;

},{"./platform":8}],10:[function(require,module,exports){
'use strict';

var Reward = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'reward', frame);
  // this.anchor.setTo(0.5, 0.5);

  this.scale.x = 3;
  this.scale.y = 3;

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.collideWorldBounds = false;
  // this.body.immovable = true;
};

Reward.prototype = Object.create(Phaser.Sprite.prototype);
Reward.prototype.constructor = Reward;

Reward.prototype.update = function() {
};

module.exports = Reward;

},{}],11:[function(require,module,exports){
'use strict';

var Reward = require('./reward');

var RewardGroup = function(game, parent) {

  Phaser.Group.call(this, game, parent);

  this.topReward = new Reward(this.game, 320, 0, 6);
  this.bottomReward = new Reward(this.game,  0, 100, 6);
  this.add(this.topReward);
  this.add(this.bottomReward)
  this.setAll('body.velocity.x', -150);
};

RewardGroup.prototype = Object.create(Phaser.Group.prototype);
RewardGroup.prototype.constructor = RewardGroup;

RewardGroup.prototype.update = function() {
};


RewardGroup.prototype.reset = function(x, y) {
  this.bottomReward.reset(0, y);
  this.x = x;
  this.y = y;
  this.setAll('body.velocity.x', -150);
  this.hasScored = false;
  this.exists = true;
};

RewardGroup.prototype.stop = function() {
  this.setAll('body.velocity.x', 0);
};

module.exports = RewardGroup;

},{"./reward":10}],12:[function(require,module,exports){
'use strict';

var Scoreboard = function(game) {
  
  var gameover;
  
  Phaser.Group.call(this, game);
  gameover = this.create(this.game.width / 2, 100, 'gameover');
  gameover.anchor.setTo(0.5, 0.5);

  this.scoreboard = this.create(this.game.width / 2, 200, 'scoreboard');
  this.scoreboard.anchor.setTo(0.5, 0.5);
  
  this.scoreText = this.game.add.bitmapText(this.scoreboard.width, 180, 'flappyfont', '', 18);
  this.add(this.scoreText);
  
  this.bestText = this.game.add.bitmapText(this.scoreboard.width, 230, 'flappyfont', '', 18);
  this.add(this.bestText);

  // add our start button with a callback
  this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
  this.startButton.anchor.setTo(0.5,0.5);

  this.add(this.startButton);

  this.y = this.game.height;
  this.x = 0;
  
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.show = function(score) {
  var coin, bestScore;
  this.scoreText.setText(score.toString());
  if(!!localStorage) {
    bestScore = localStorage.getItem('bestScore');
    if(!bestScore || bestScore < score) {
      bestScore = score;
      localStorage.setItem('bestScore', bestScore);
    }
  } else {
    bestScore = 'N/A';
  }

  this.bestText.setText(bestScore.toString());

  if(score >= 10 && score < 20)
  {
    coin = this.game.add.sprite(-65 , 7, 'medals', 1);
  } else if(score >= 20) {
    coin = this.game.add.sprite(-65 , 7, 'medals', 0);
  }

  this.game.add.tween(this).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);

  if (coin) {
    
    coin.anchor.setTo(0.5, 0.5);
    this.scoreboard.addChild(coin);
    
     // Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
    var emitter = this.game.add.emitter(coin.x, coin.y, 400);
    this.scoreboard.addChild(emitter);
    emitter.width = coin.width;
    emitter.height = coin.height;


    //  This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
    // emitter.width = 800;

    emitter.makeParticles('particle');

    // emitter.minParticleSpeed.set(0, 300);
    // emitter.maxParticleSpeed.set(0, 600);

    emitter.setRotation(-100, 100);
    emitter.setXSpeed(0,0);
    emitter.setYSpeed(0,0);
    emitter.minParticleScale = 0.25;
    emitter.maxParticleScale = 0.5;
    emitter.setAll('body.allowGravity', false);

    emitter.start(false, 1000, 1000);
    
  }
};

Scoreboard.prototype.startClick = function() {
  this.game.state.start('play');
};





Scoreboard.prototype.update = function() {
  // write your prefab's specific update code here
};

module.exports = Scoreboard;

},{}],13:[function(require,module,exports){
'use strict';

var Lava = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'lava', frame);
  this.scale.x = 6;
  this.scale.y = 4;
  this.frame = 21;

  // this.anchor.setTo(0.5, 0);	//tip of the sprite
  this.game.physics.arcade.enableBody(this);
  
  this.body.velocity.x = -200;
  this.body.allowGravity = false;
  this.body.immovable = true;
  
};

Lava.prototype = Object.create(Phaser.Sprite.prototype);
Lava.prototype.constructor = Lava;

Lava.prototype.update = function() {
  // write your prefab's specific update code here
  
};

Lava.prototype.stop = function() {
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
}

Lava.prototype.reset = function() {
	this.body.x = this.game.width + this.body.width;
}

module.exports = Lava;
},{}],14:[function(require,module,exports){
'use strict';

var Lazer = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'lazer', frame);
  this.anchor.setTo(0.5, 0.5);
  this.scale.y = 50;
  this.scale.x = 2;

  // enable physics on the lazer
  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.immovable = true;
  this.body.velocity.x = -75;
  this.isHarmful = true;

  this.time = this.game.time.create(false);
  this.time.start();
  this.count = 0;
  this.time.loop(2000, this.activate, this);
};

Lazer.prototype = Object.create(Phaser.Sprite.prototype);
Lazer.prototype.constructor = Lazer;

Lazer.prototype.update = function() {
  this.checkWorldBounds();
};

Lazer.prototype.checkWorldBounds = function() {
  if(this.body.x <15) {
    this.kill();
    this.time.stop();
  }
};

Lazer.prototype.activate = function() {
  //Start timer
  console.log(this.count);
  this.count++
  if (this.count % 2 == 0 ) {
    this.appear();
  } else {
    this.disappear();
  }
};

Lazer.prototype.appear = function() {
  this.game.add.tween(this).to({alpha: 1}, 200, "Linear", true);
  this.isHarmful = true;
  this.canCollide(this.isHarmful);
};

Lazer.prototype.canCollide = function(bool) {
  this.body.checkCollision.up = bool;
  this.body.checkCollision.down = bool;
  this.body.checkCollision.left = bool;
  this.body.checkCollision.right = bool;
};

Lazer.prototype.disappear = function() {
  this.game.add.tween(this).to({alpha: 0}, 200, "Linear", true);
  this.isHarmful = false;
  this.canCollide(this.isHarmful);
};

Lazer.prototype.revived = function() {
};

module.exports = Lazer;

},{}],15:[function(require,module,exports){
'use strict';

var Missile = require('./missile');

var MeteorGroup = function(game, parent) {

  Phaser.Group.call(this, game, parent);

  var gameWidth = this.game.width;
  this.rightMeteor = new Missile(this.game, 0, 0, 0, "meteor");
  this.add(this.rightMeteor);
  this.rightMeteor.smoothed = false;
  this.setAll('sprite.smoothed', false);
  this.setAll('sprite.scale.y',4);
  this.setAll('sprite.scale.x', 4);
  this.setAll('body.velocity.x', -150);
  this.setAll('body.velocity.y', 150);
};

MeteorGroup.prototype = Object.create(Phaser.Group.prototype);
MeteorGroup.prototype.constructor = MeteorGroup;

MeteorGroup.prototype.update = function() {
    this.game.physics.arcade.collide(this.rightMeteor, this.ground);
};


MeteorGroup.prototype.reset = function(x, y) {
  this.rightMeteor.reset(x, 0);
  this.x = x;
  this.y = 0;
  
  var gameWidth = this.game.width;
  var offSet = x%gameWidth/3 > 0 ? x%gameWidth/3 : 0;
  this.setAll('body.velocity.x', -150 - offSet);    // the futher right, bring it back
  this.setAll('body.velocity.y', 150 + offSet);
  this.hasScored = false;
  this.exists = true;
};


MeteorGroup.prototype.stop = function() {
  this.setAll('body.velocity.x', 0);
  this.setAll('body.velocity.y', 0);
};

module.exports = MeteorGroup;

},{"./missile":16}],16:[function(require,module,exports){
'use strict';

 var _type = "";

var Missile = function(game, x, y, frame, type) {
  _type = type;
  if (type === "missile") {
    Phaser.Sprite.call(this, game, x, y, 'missile', frame);
    this.scale.x = 2;
    this.scale.y = 2;
    this.angle += 180;
  }
  else {
    Phaser.Sprite.call(this, game, x, y, 'meteor', frame);
    this.scale.x = 8;
    this.scale.y = 8;
    this.animations.add('meteorFlames', [0, 1, 2], 3, true);
    this.animations.play('meteorFlames');
  }
  this.anchor.setTo(0.5, 0.5);


  // this.alive = false;
  // this.onGround = false;

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  this.body.collideWorldBounds = false;

  // this.events.onKilled.add(this.onKilled, this);

};

Missile.prototype = Object.create(Phaser.Sprite.prototype);
Missile.prototype.constructor = Missile;

Missile.prototype.update = function() {


};

Missile.prototype.shoot = function() {
    if (_type === "missile") {
      this.body.velocity.x = -500;
      this.body.velocity.y = 0;
    } else {
      this.body.velocity.x = -300;
      this.body.velocity.y = -75;
    }
};

module.exports = Missile;

},{}],17:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],18:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    // add the background sprite
    this.background = this.game.add.tileSprite(0,-42,840,420,'background');

    this.background.smoothed = false;

    // add the ground sprite as a tile
    // and start scrolling in the negative x direction
    this.ground = this.game.add.tileSprite(0,this.game.height-45,840,420,'ground');
    this.ground.frame =2;
    this.ground.scale.x = 2;
    this.ground.scale.y = 3;
    this.ground.autoScroll(-100,0);

    this.ground.smoothed = false;

    /** STEP 1 **/
    // create a group to put the title assets in
    // so they can be manipulated as a whole
    this.titleGroup = this.game.add.group()

    /** STEP 2 **/
    // create the title sprite
    // and add it to the group
    this.title = this.add.sprite(this.game.width/2,this.game.height/2,'title');
    this.title.scale.x = 0.3;
    this.title.scale.y = 0.3;
    this.title.anchor.setTo(0.5,0.5);
    this.titleGroup.add(this.title);

    this.title.smoothed = false;

    /** STEP 3 **/
    // create the char1 sprite
    // and add it to the title group
    this.char1 = this.add.sprite(100,this.ground.y-15,'char1');
    this.char1.scale.x = 2;
    this.char1.scale.y = 2;
    this.char1.anchor.setTo(0.5,0.5);
    this.titleGroup.add(this.char1);

    this.char1.smoothed = false;

    /** STEP 4 **/
    // add an animation to the char1
    // and begin the animation
    this.char1.animations.add('walk', [9,10], 10,true);
    this.char1.animations.play('walk');

    /** STEP 5 **/
    // Set the originating location of the group
    // this.titleGroup.x = 30;
    // this.titleGroup.y = 100;

    /** STEP 6 **/
    //  create an oscillating animation tween for the group
    // this.game.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

    // add our start button with a callback
    this.startButton = this.game.add.button(this.game.width - 100, 300, 'startButton', this.startClick, this);
    this.startButton.anchor.setTo(0.5,0.5);
  },
  startClick: function() {
    // start button click handler
    // start the 'play' state
    this.game.state.start('play');
  }
};

module.exports = Menu;

},{}],19:[function(require,module,exports){

'use strict';
var Char1 = require('../prefabs/Char1');
var Enemy = require('../prefabs/enemy');
var Ground = require('../prefabs/ground');
var Pipe = require('../prefabs/pipe');
var PipeGroup = require('../prefabs/pipeGroup');
var Scoreboard = require('../prefabs/scoreboard');
var Missile = require('../prefabs/traps/missile');
var Lazer = require('../prefabs/traps/lazer');
var Platform = require('../prefabs/platform');
var PlatformGroup = require('../prefabs/platformGroup');
var Lava = require('../prefabs/traps/lava');
var Meteor = require('../prefabs/traps/meteor');
var FirstAid = require('../prefabs/firstAid');
var Reward = require('../prefabs/reward');
var RewardGroup = require('../prefabs/rewardGroup');

var DEBUFF_TIMER = {
  lazerFireEvent: 8,
  missileFireEvent: 10,
  meteorsFireEvent:0,
  lavaFireEvent: 20,
  changePlayerControlEvent: { timer: 0,
    isNormal: true
  }
};


function Play() {
}
Play.prototype = {
  create: function() {
    // start the phaser arcade physics engine
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // give our world an initial gravity of 1200
    this.game.physics.arcade.gravity.y = 1200;

    // add the background sprite
    this.background = this.game.add.tileSprite(0,-42,840,420,'background');
    this.healthBar1 = this.game.add.sprite(0, 0, 'heart');


    this.healthBar1.scale.x = 2;
    this.healthBar1.scale.y = 2;
    this.healthBar2 = this.game.add.sprite(50, 0, 'heart');
    this.healthBar2.scale.x = 2;
    this.healthBar2.scale.y = 2;
    this.healthBar3 = this.game.add.sprite(100, 0, 'heart');
    this.healthBar3.scale.x = 2;
    this.healthBar3.scale.y = 2;

    this.healthBar1.smoothed = false;

    // create and add a group to hold our pipeGroup prefabs
    this.pipes = this.game.add.group();
    this.platforms = this.game.add.group();
    this.meteors = this.game.add.group();
    this.rewards = this.game.add.group();

    // create and add a new Ground object
    this.ground = new Ground(this.game, 0, this.game.height-63, 840, 420);
    this.game.add.existing(this.ground);

    // create and add a new Char1 object
    this.char1 = new Char1(this.game, 100, this.ground.y-25);
    this.game.add.existing(this.char1);

    this.setUpKeyListeners();

    //create and add new Enemy object
    this.enemy = new Enemy(this.game, 700, 200);
    this.enemy.smoothed = false;
    this.game.add.existing(this.enemy);

    this.lava = null;
    this.firstAidKit;

    this.setUpEnemyKeyListeners();

    this.firstAidNum = 1;

    // add mouse/touch controls
    this.game.input.onDown.addOnce(this.startGame, this);

    // keep the spacebar from propogating up to the browser
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);


    this.score = 0;
    this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'flappyfont',this.score.toString(), 24);

    this.instructionGroup = this.game.add.group();
    this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 200,'instructions'));

    this.instructionGroup.setAll('anchor.x', 0.5);
    this.instructionGroup.setAll('anchor.y', 0.5);

    this.pipeGenerator = null;

    // this.rewardGenerator = null;

    this.gameover = false;

    this.gray = this.game.add.filter('Gray');

    Phaser.Canvas.setSmoothingEnabled(this, true);

    this.sounds = {
      pipeHitSound: this.game.add.audio('pipeHit'),
      groundHitSound: this.game.add.audio('groundHit'),
      scoreSound: this.game.add.audio('score')
    }

    //initialize the buttons
    this.lazerButton = this.game.add.sprite(this.game.width - 50, 0, 'buttons', 0);
    this.lazerButton.scale.x = 2;
    this.lazerButton.scale.y = 2;
    this.swapKeyButton = this.game.add.sprite(this.game.width - 100, 0, 'buttons', 2);
    this.swapKeyButton.scale.x = 2;
    this.swapKeyButton.scale.y = 2;
    this.missileButton = this.game.add.sprite(this.game.width - 150, 0, 'buttons', 4);
    this.missileButton.scale.x = 2;
    this.missileButton.scale.y = 2;
    this.meteorButton = this.game.add.sprite(this.game.width - 200, 0, 'buttons', 6);
    this.meteorButton.scale.x = 2;
    this.meteorButton.scale.y = 2;

    this.lazerButton.smoothed = false;


  },
  update: function() {
    // enable collisions between the char1 and the ground
    // this.game.physics.arcade.collide(this.char1, this.ground, this.deathHandler, null, this);
    this.game.physics.arcade.collide(this.char1, this.ground);
    this.game.physics.arcade.collide(this.meteors, this.ground);
    this.game.physics.arcade.collide(this.char1, this.firstAidKit, this.healHandler, null, this);
    this.game.physics.arcade.collide(this.char1, this.lazer, this.lazerHandler, null, this);
    this.game.physics.arcade.collide(this.char1, this.missile, this.damageHandler, null, this);
    this.game.physics.arcade.collide(this.char1, this.lava, this.deathHandler, null, this);

    if(!this.gameover) {
      // enable collisions between the char1 and each group in the pipes group
      this.pipes.forEach(function(pipeGroup) {
        // this.checkScore(pipeGroup);
        this.game.physics.arcade.collide(this.char1, pipeGroup);
      }, this);

      this.platforms.forEach(function(platformGroup) {
        this.game.physics.arcade.collide(this.char1, platformGroup);
      }, this);

      this.meteors.forEach(function(Meteor){
        this.game.physics.arcade.collide(this.char1, Meteor, this.damageHandler, null, this);
      }, this)

      this.rewards.forEach(function(reward){
        this.game.physics.arcade.overlap(this.char1, reward, this.checkScore, null, this);
      }, this)
    }

    if (this.char1.x < 25) {
      this.deathHandler();
    }
    if (!this.firstAidKit && this.firstAidNum%4 === 0) {
        this.firstAidNum++;
        var xOffSet = this.game.rnd.integerInRange(0, this.game.width);
        var yOffSet = this.game.rnd.integerInRange(this.game.height/2.5, this.game.height/3*2);
        var finalYOffSet = yOffSet > this.ground.body.y -20 ? this.ground.body.yOffSet -20 : yOffSet;
        this.firstAidKit = new FirstAid(this.game, xOffSet, finalYOffSet, 0);
        this.game.add.existing(this.firstAidKit);
    }

    if ( this.lava && this.lava.body.x < -192 && this.game.time.totalElapsedSeconds() > DEBUFF_TIMER.lavaFireEvent) {
        this.lava.reset();
        DEBUFF_TIMER.lavaFireEvent += this.game.rnd.integerInRange(0,10);
    }

    this.canFire();

  },
  canFire: function() {
    if (this.lazerButton.filters != null && this.game.time.totalElapsedSeconds() > DEBUFF_TIMER.lazerFireEvent) {
      this.lazerButton.filters = null;
    }

    if (this.swapKeyButton.filters != null && this.game.time.totalElapsedSeconds() > DEBUFF_TIMER.changePlayerControlEvent.timer) {
      this.swapKeyButton.filters = null;
    }

    if (this.missileButton.filters != null && this.game.time.totalElapsedSeconds() > DEBUFF_TIMER.missileFireEvent) {
      this.missileButton.filters = null;
    }

    if (this.meteorButton.filters != null && this.game.time.totalElapsedSeconds() > DEBUFF_TIMER.meteorsFireEvent) {
      this.meteorButton.filters = null;
    }

  },
  shutdown: function() {
    this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
    this.char1.destroy();
    this.pipes.destroy();
    this.platforms.destroy();
    this.scoreboard.destroy();
  },
  startGame: function() {
    if(!this.char1.alive && !this.gameover) {
      this.char1.body.allowGravity = true;
      this.char1.alive = true;
      // add a timer
      var pipeRandInt = this.game.rnd.integerInRange(5, 15);
      this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * pipeRandInt, this.generatePipes, this);
      this.pipeGenerator.timer.start();

      var platformRandInt = this.game.rnd.integerInRange(10, 15);
      this.platformGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * platformRandInt, this.generatePlatforms, this);
      this.platformGenerator.timer.start();

      this.rewardGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateRewards, this);
      this.rewardGenerator.timer.start();

      this.instructionGroup.destroy();
      this.lava = new Lava(this.game, this.game.width*2, this.ground.body.y - 5);
      this.game.add.existing(this.lava);
    }
  },
  checkScore: function(char1, reward) {
      this.score++;
      this.scoreText.setText(this.score.toString());
      this.sounds.scoreSound.play();
      reward.kill();
  },
  healHandler: function(char1, AidKit) {
    this.updateHealth('UP');
    this.char1.gainHealth();
    this.firstAidKit = null;
    AidKit.kill();
  },
  damageHandler: function(char1, enemy) {
    this.updateHealth('DOWN');
    this.char1.takeDamage();
    enemy.kill();

    //TODO: Damage animation / sprite when taking damage

    if (this.char1.getHealth() <= 0) {
      this.deathHandler();
    }
  },
  updateHealth: function(value) {
    if (this.char1.getHealth() === 2 && value === 'UP') {
        this.healthBar3.visible = true;
    }

    if (this.char1.getHealth() === 2 && value === 'DOWN') {
        this.healthBar2.visible = false;
    }

    if (this.char1.getHealth() === 1 && value === 'UP') {
        this.healthBar2.visible = true;
    }

    if (this.char1.getHealth() === 1 && value === 'DOWN') {
        this.healthBar1.visible = false;
    }

    if (this.char1.getHealth() === 3 && value === 'DOWN') {
        this.healthBar3.visible = false;
    }
  },
  lazerHandler: function(char1, enemy) {
    if (enemy.isHarmful) {
      console.log(enemy.isHarmful);
      this.damageHandler(char1, enemy);
    } else {
      console.log("IS NOT HARMFUL");
    }
  },
  deathHandler: function(char1, enemy) {
    if(!this.gameover) {
      this.sounds.groundHitSound.play();
      this.scoreboard = new Scoreboard(this.game);
      this.game.add.existing(this.scoreboard);
      this.scoreboard.show(this.score);
      this.gameover = true;
      this.char1.kill();
      this.pipes.callAll('stop');
      this.rewards.callAll('stop');
      this.platforms.callAll('stop');
      this.lava.stop();
      this.pipeGenerator.timer.stop();
      this.ground.stopScroll();
    }

  },
  generatePipes: function() {
    var pipeY = this.game.rnd.integerInRange(0, 50);
    var pipeGroup = this.pipes.getFirstExists(false);
    if(!pipeGroup) {
      pipeGroup = new PipeGroup(this.game, this.pipes);
    }
    pipeGroup.reset(this.game.width, pipeY);
  },
  generateLazer: function() {
    if (!this.lazer || this.game.time.totalElapsedSeconds() > DEBUFF_TIMER.lazerFireEvent) {
      console.log(this.game.time.totalElapsedSeconds());
      var lazerY = this.game.rnd.integerInRange(0, 500);
      // create and add a new lazer object
      this.lazer = new Lazer(this.game, this.game.width-25, lazerY, 2);
      this.game.add.existing(this.lazer);
      this.lazerButton.filters = [this.gray];
      DEBUFF_TIMER.lazerFireEvent = 8 + this.game.time.totalElapsedSeconds();
    }
  },
  generateMissile: function() {
    if (!this.missile || this.game.time.totalElapsedSeconds() > DEBUFF_TIMER.missileFireEvent) {
        console.log("this total for missile: " + DEBUFF_TIMER.missileFireEvent);
        // var missileY = this.game.rnd.integerInRange(0, 300);
        var missileY = this.enemy.y;
        var missleX = this.enemy.x;

        this.missile = new Missile(this.game, missleX, missileY, 6, "missile");
        this.game.add.existing(this.missile);
        this.missile.shoot();
        this.firstAidNum++;
        this.missileButton.filters = [this.gray]
        DEBUFF_TIMER.missileFireEvent = 10 +  this.game.time.totalElapsedSeconds();
    }
  },
  generatePlatforms: function() {
    var platformY = this.game.rnd.integerInRange(220, 320);
    var platformGroup = this.platforms.getFirstExists(false);
    if(!platformGroup) {
      platformGroup = new PlatformGroup(this.game, this.platforms);
    }
    platformGroup.reset(this.game.width, platformY);
  },
  generateRewards: function() {
    var rewardY = this.game.rnd.integerInRange(200, 300);
    var rewardGroup = this.rewards.getFirstExists(false);
    if(!rewardGroup) {
      rewardGroup = new RewardGroup(this.game, this.rewards);
    }
    rewardGroup.reset(this.game.width, rewardY);
  },
  generateMeteors: function() {
    if (this.game.time.totalElapsedSeconds() > DEBUFF_TIMER.meteorsFireEvent) {
    var meteorsX = this.game.rnd.integerInRange(this.game.width/3, this.game.width/2);
    var meteorsGroup = this.meteors.getFirstExists(false);
    if (!meteorsGroup) {
        meteorsGroup = new Meteor(this.game, this.meteors);
    }
    meteorsGroup.reset(meteorsX, 0);
    this.meteorButton.filters = [this.gray]
    DEBUFF_TIMER.meteorsFireEvent = 10 + this.game.time.totalElapsedSeconds();
  }
  },
  changePlayerControl: function(){
    if (this.game.time.totalElapsedSeconds() > DEBUFF_TIMER.changePlayerControlEvent.timer){
      DEBUFF_TIMER.changePlayerControlEvent.isNormal = !DEBUFF_TIMER.changePlayerControlEvent.isNormal;
      this.swapKeyListeners(DEBUFF_TIMER.changePlayerControlEvent.isNormal);
      DEBUFF_TIMER.changePlayerControlEvent.isNormal = !DEBUFF_TIMER.changePlayerControlEvent.isNormal;
      this.game.time.events.add(Phaser.Timer.SECOND*2, function(){this.swapKeyListeners(DEBUFF_TIMER.changePlayerControlEvent.isNormal)}, this);
      this.swapKeyButton.filters = [this.gray];
      DEBUFF_TIMER.changePlayerControlEvent.timer = 30 + this.game.time.totalElapsedSeconds();
    }
  },
  swapKeyListeners: function(bool) {
    console.log(bool);
  if (bool) {
    this.upKey.onDown.remove(this.char1.moveRight,this.char1);
    this.leftKey.onDown.remove(this.char1.moveUp,this.char1);
    this.rightKey.onDown.remove(this.char1.moveLeft,this.char1);
    this.upKey.onDown.add(this.char1.moveUp, this.char1);
    this.leftKey.onDown.add(this.char1.moveLeft, this.char1);
    this.rightKey.onDown.add(this.char1.moveRight, this.char1);
  } else {
    this.upKey.onDown.remove(this.char1.moveUp,this.char1);
    this.leftKey.onDown.remove(this.char1.moveLeft,this.char1);
    this.rightKey.onDown.remove(this.char1.moveRight,this.char1);
    this.upKey.onDown.add(this.char1.moveRight, this.char1);
    this.leftKey.onDown.add(this.char1.moveUp, this.char1);
    this.rightKey.onDown.add(this.char1.moveLeft, this.char1);
  }
},
  setUpKeyListeners: function() {

    this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.spaceKey.onDown.addOnce(this.startGame, this);

    // add keyboard controls
    this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.upKey.onDown.addOnce(this.startGame, this);
    this.upKey.onDown.add(this.char1.moveUp, this.char1);

    this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.leftKey.onDown.add(this.char1.moveLeft, this.char1);

    this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.rightKey.onDown.add(this.char1.moveRight, this.char1);

    this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    this.downKey.onDown.add(this.char1.moveDown, this.char1);
  },
  setUpEnemyKeyListeners: function() {
    // add enemy keyboard controls
    this.enemyUpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.enemyUpKey.onDown.add(this.enemy.moveUp, this.enemy);

    this.enemyLeftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.enemyLeftKey.onDown.add(this.enemy.moveLeft, this.enemy);

    this.enemyRightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.enemyRightKey.onDown.add(this.enemy.moveRight, this.enemy);

    this.enemyDownKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.enemyDownKey.onDown.add(this.enemy.moveDown, this.enemy);

    this.enemyGKey = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
    this.enemyGKey.onDown.add(this.generateLazer, this);

    this.shot = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    this.shot.onDown.add(this.generateMissile, this);

    this.meteorsKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.meteorsKey.onDown.add(this.generateMeteors, this);

    this.changePlayerControlKey = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    this.changePlayerControlKey.onDown.add(this.changePlayerControl, this);
  }

};

module.exports = Play;

},{"../prefabs/Char1":2,"../prefabs/enemy":3,"../prefabs/firstAid":4,"../prefabs/ground":5,"../prefabs/pipe":6,"../prefabs/pipeGroup":7,"../prefabs/platform":8,"../prefabs/platformGroup":9,"../prefabs/reward":10,"../prefabs/rewardGroup":11,"../prefabs/scoreboard":12,"../prefabs/traps/lava":13,"../prefabs/traps/lazer":14,"../prefabs/traps/meteor":15,"../prefabs/traps/missile":16}],20:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('background', 'assets/background.png');
    this.load.spritesheet('ground', 'assets/ground.png', 21,21,22);

    //TODO: UPDATE TITLE
    this.load.image('title', 'assets/splash.png');

    //TODO: UPDATE SPRITES
    this.load.spritesheet('lazer', 'assets/projectiles.png', 21,21,21);
    this.load.spritesheet('char1', 'assets/char1.png', 21,21,11);
    this.load.spritesheet('enemy', 'assets/enemy.png', 21,21,11);
    this.load.spritesheet('pipe', 'assets/pipes.png', 54,320,2);
    this.load.spritesheet('platform', 'assets/ground.png',21,21,22);
    this.load.spritesheet('lava', 'assets/ground.png',21,21,22);
    this.load.image('startButton', 'assets/start-button.png');
    this.load.image('firstAid', 'assets/firstAid.png');
    this.load.spritesheet('reward', 'assets/interactive1.png',21,21,10);
    this.load.spritesheet('heart', 'assets/hearts.png', 21, 21, 1);
    this.load.spritesheet('missile', 'assets/projectiles.png', 21, 21, 21);
    this.load.spritesheet('buttons', 'assets/buttons.png', 21, 21, 8);

    //TODO: UPDATE INSTRUCTIONS
    this.load.image('instructions', 'assets/instructions2.png');
    this.load.image('getReady', 'assets/get-ready.png');

    this.load.image('scoreboard', 'assets/scoreboard.png');
    this.load.spritesheet('medals', 'assets/medals.png',44, 46, 2);
    this.load.image('gameover', 'assets/gameover.png');
    this.load.image('particle', 'assets/particle.png');
    this.load.spritesheet('meteor', 'assets/meteor1.png',21,13,3);

    this.load.script('gray', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Gray.js');

    this.load.audio('flap', 'assets/flap.wav');
    this.load.audio('pipeHit', 'assets/pipe-hit.wav');
    this.load.audio('groundHit', 'assets/ground-hit.wav');
    this.load.audio('score', 'assets/score.wav');
    this.load.audio('ouch', 'assets/ouch.wav');

    this.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])