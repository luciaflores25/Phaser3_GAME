import 'phaser';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y, frame) {
    super(scene, x, y, 'characters', frame);
    this.scene = scene;
    this.health = 1;

    // activamos la fisica
    this.scene.physics.world.enable(this);
    // añadimos el enemigo a la escena
    this.scene.add.existing(this);
    // redimensionamos el enemigo
    this.setScale(1.2);

    // movimientos de los enemigos
    this.timeEvent = this.scene.time.addEvent({
      delay: 400,
      callback: this.move,
      loop: true,
      callbackScope: this
    });
  }

  // función para que el enemigo desaparezca al colisionar con una flor
  loseHealth () {
    this.health--;
    this.tint = 0xff0000;
    if (this.health === 0) {
      this.timeEvent.destroy();
      this.disableBody(true);
      this.visible = false;
    } else {
      this.scene.time.addEvent({
        delay: 500,
        callback: () => {
          this.tint = 0xffffff;
        }
      });
    }
  }

  // movimientos aeatorios de los enemigos
  move () {
    const randNumber = Math.floor((Math.random() * 4) + 1);
    switch (randNumber) {
      case 1:
        // derecha
        this.setVelocityX(300);
        break;
      case 2:
        // izquierda
        this.setVelocityX(-300);
        break;
      case 3:
        // arriba
        this.setVelocityY(300);
        break;
      case 4:
        // abajo
        this.setVelocityY(-300);
        break;
    }

    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        if (this.active) this.setVelocity(0);
      },
      callbackScope: this
    });
  }
}