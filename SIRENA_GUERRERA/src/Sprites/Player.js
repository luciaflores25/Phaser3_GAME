import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'ariel');
    this.scene = scene;
    this.health = 5;
    this.hitDelay = false;
    this.direction = 'up';
    // activamos la fisica
    this.scene.physics.world.enable(this);
    // añadimos el player a la escena
    this.scene.add.existing(this);
    // redimensionamos el tamaño del player
    this.setScale(0.9);
  }

  // movimientos del player con las flechas de dirección
  update (cursors) {
    this.setVelocity(0); 

    // arriba
    if (cursors.up.isDown) {
      this.direction = 'up';
      this.setVelocityY(-150);
      this.anims.play('up', true);

      // abajo
    } else if (cursors.down.isDown) {
      this.direction = 'down';
      this.setVelocityY(150);
      this.anims.play('down', true);
    }

    // izquierda
    if (cursors.left.isDown) {
      this.direction = 'left';
      this.setVelocityX(-150);
      this.anims.play('left', true);

      // derecha
    } else if (cursors.right.isDown) {
      this.direction = 'right';
      this.setVelocityX(150);
      this.anims.play('right', true);
    }
  }

  // función para que cuando pierda todas las vidas
  // el player vuelva al nivel 1
  loseHealth () {
    this.health--;
    this.scene.events.emit('loseHealth', this.health);
    if (this.health === 0) {
      this.scene.loadNextLevel(true);
      self.game.scene.keys.Game.gameOverSound.play();
    }
  }

  // función para que cuando el player colisione con un enemigo
  // que se vuelva rojo y pierda una vida
  enemyCollision (player, enemy) {
    if (!this.hitDelay) {
      this.loseHealth();
      this.hitDelay = true;
      this.tint = 0xff0000;
      this.scene.time.addEvent({
        delay: 1000,
        callback: () => {
          this.hitDelay = false;
          this.tint = 0xffffff;
        },
        callbackScope: this
      });
    }
  }
}