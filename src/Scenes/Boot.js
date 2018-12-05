import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor (key) {
    super(key);
  }

  // cargamos los dos niveles
  preload () {
    this.levels = {
      1: 'level1',
      2: 'level2'
    };

    // cargamos el mapa del nivel 1
    this.load.tilemapTiledJSON('level1', 'assets/tilemaps/level1.json');
    // cargamos el mapa del nivel 2
    this.load.tilemapTiledJSON('level2', 'assets/tilemaps/level2.json');
    // cargamos el spritesheet del mapa
    this.load.spritesheet('RPGpack_sheet', 'assets/images/RPGpack_sheet.png', { frameWidth: 32, frameHeight: 32 });
    // spritesheet de ddonde cogemos el agua que hay alrededor
    this.load.spritesheet('water', 'assets/images/RPGpack_sheet(1).png', { frameWidth: 32, frameHeight: 32 });
    // cargamos el spritesheet de los enemigos
    this.load.spritesheet('characters', 'assets/images/roguelikeChar_transparent.png', { frameWidth: 32, frameHeight: 32 });
    // cargamos el sprite del player
    this.load.spritesheet('ariel', 'assets/images/ariel_sprite.png', { frameWidth: 32, frameHeight: 48 });
    // cargamos la imagen del portal
    this.load.image('portal', 'assets/images/portal.png');
    // cargamos la imagen de la moneda
    this.load.image('coin', 'assets/images/coin.png');
    // cargamos la imagen de la flor que dispara el player
    this.load.image('bullet', 'assets/images/ballBlack_04.png');
    // cargamos los sonidos
    this.load.audio('laSirenitaSound', 'assets/sounds/laSirenitaSound.mp3');
    this.load.audio('bulletSound', 'assets/sounds/bulletSound.mp3');
    this.load.audio('coinSound', 'assets/sounds/coin.mp3');
    this.load.audio('victoriaSound', 'assets/sounds/victoria.mp3');
    this.load.audio('gameOverSound', 'assets/sounds/gameOver.mp3');
  }

  // creamos la escena y hacemos que empiece en el nivel 1
  create () {
    this.scene.start('Game', { level: 1, newGame: true, levels: this.levels });
  }
};
