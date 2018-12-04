import 'phaser';
import Player from '../Sprites/Player';
import Portal from '../Sprites/Portal';
import Coins from '../Groups/Coins';
import Enemies from '../Groups/Enemies';
import Bullets from '../Groups/Bullets';

export default class GameScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  init (data) {
    this._LEVEL = data.level;
    this._LEVELS = data.levels;
    this._NEWGAME = data.newGame;
    this.loadingLevel = false;
    if (this._NEWGAME) this.events.emit('newGame');
  }

  create () {
    this.events.on('resize', this.resize, this);
    // teclas para mover al player
    this.cursors = this.input.keyboard.createCursorKeys();
    // espacio para disparar
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    // creamos el mapa
    this.createMap();
    // creamos el player
    this.createPlayer();
    // creamos el portal para pasar al nivel 2
    this.createPortal();
    // creamos las monedas
    this.coins = this.map.createFromObjects('Coins', 'Coin', { key: 'coin' });
    this.coinsGroup = new Coins(this.physics.world, this, [], this.coins);
    // creamos los enemigos
    this.enemies = this.map.createFromObjects('Enemies', 'Enemy', {});
    this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies);
    // creamos las flores para dispararlas
    this.bullets = new Bullets(this.physics.world, this, []);
    // add collisions
    this.addCollisions();
    
    // hacemos que la cámara siga al player
    this.cameras.main.startFollow(this.player);

    // creamos los sonidos

    // sonido continuo de fondo
    this.musicaFondo = this.sound.add('laSirenitaSound');
    // sonido al disparar
    this.disparoSound = this.sound.add('bulletSound');
    // sonido al ganar
    this.victoriaSound = this.sound.add('victoriaSound');
    // sonido al perder
    this.gameOverSound = this.sound.add('gameOverSound');
    // activamos la musica para el fondo
    this.musicaFondo.play();
  }

  update () {
    this.player.update(this.cursors);
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.bullets.fireBullet(this.player.x, this.player.y, this.player.direction);
    }
  }

  addCollisions () {
    this.physics.add.collider(this.player, this.blockedLayer);
    this.physics.add.collider(this.enemiesGroup, this.blockedLayer);
    this.physics.add.overlap(this.player, this.enemiesGroup, this.player.enemyCollision.bind(this.player));
    this.physics.add.overlap(this.player, this.portal, this.loadNextLevel.bind(this, false));
    this.physics.add.overlap(this.coinsGroup, this.player, this.coinsGroup.collectCoin.bind(this.coinsGroup));
    this.physics.add.overlap(this.bullets, this.enemiesGroup, this.bullets.enemyCollision);
  }

  createPlayer () {
    this.map.findObject('Player', (obj) => {
      if (obj.type === 'StartingPosition') {
       this.player = new Player(this, obj.x, obj.y);
     }

     // movimientos de ariel

     this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('ariel', {
        start: 4,
        end: 7
      }),
      frameRate: 8
    });

     this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('ariel', {
        start: 8,
        end: 11
      }),
      frameRate: 8
    });

     this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('ariel', {
        start: 0,
        end: 3
      }),
      frameRate: 8
    });

     this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('ariel', {
        start: 12,
        end: 15
      }),
      frameRate: 8
    });
   });
  }

  createPortal () {
    this.map.findObject('Portal', (obj) => {
      if (this._LEVEL === 1) {
        this.portal = new Portal(this, obj.x, obj.y);
      }
    });
  }

  resize (width, height) {
    if (width === undefined) {
      width = this.sys.game.config.width;
    }
    if (height === undefined) {
      height = this.sys.game.config.height;
    }
    this.cameras.resize(width, height);
  }

  createMap () {
    // añadimos el agua alrededor
    this.add.tileSprite(0, 0, 8000, 8000, 'water', 62);
    // creamos el tilemap
    this.map = this.make.tilemap({ key: this._LEVELS[this._LEVEL] });
    // añadimos la imagen del tileset
    this.tiles = this.map.addTilesetImage('RPGpack_sheet');
    // creamos las capas de backgrpund y las blocked
    this.backgroundLayer = this.map.createStaticLayer('Background', this.tiles, 0, 0);
    this.blockedLayer = this.map.createStaticLayer('Blocked', this.tiles, 0, 0);
    this.blockedLayer.setCollisionByExclusion([-1]);
  }

  loadNextLevel (endGame) {
    if (!this.loadingLevel) {
      this.cameras.main.fade(600, 0, 0, 0);
      this.cameras.main.on('camerafadeoutcomplete', () => {
        if (endGame) {
          this.scene.restart({ level: 1, levels: this._LEVELS, newGame: true });
        } else if (this._LEVEL === 1) {
          this.scene.restart({ level: 2, levels: this._LEVELS, newGame: false });
        }
      });
      this.lgLeoadinvel = true;
    }
  }
};
