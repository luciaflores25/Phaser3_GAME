import 'phaser';

export default class Bullets extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, children) {
    super(world, scene, children);
    this.scene = scene;

    this.createMultiple({
      frameQuantity: 20, // para que solo se puedan lanzar 20 flores a la vez
      key: 'bullet',
      active: false,
      visible: false
    });
  }

  // Cuando la flor colisiona con el enemigo lo desabilita
  enemyCollision (bullet, enemy) {
    bullet.active = false;
    bullet.visible = false;
    bullet.disableBody();
    enemy.loseHealth();
  }

  fireBullet (x, y, direction) {
    const bullet = this.getFirstDead(false);
    if (bullet) {
      self.game.scene.keys.Game.disparoSound.play();
      bullet.enableBody(true);
      bullet.active = true;
      bullet.visible = true;
      bullet.setPosition(x, y);
      bullet.setScale(0.1);

      //dirección de la flor según la posición del player
      switch (direction) {
        case 'up':
          bullet.setVelocityY(-200);
          break;
        case 'down':
          bullet.setVelocityY(200);
          break;
        case 'left':
          bullet.setVelocityX(-200);
          break;
        case 'right':
          bullet.setVelocityX(200);
          break;
        default:
          bullet.setVelocityY(-200);
      }

      

      this.scene.time.addEvent({
        delay: 4000,
        callback: () => {
          bullet.disableBody();
          bullet.active = false;
          bullet.visible = false;
          bullet.setVelocity(0);
        }
      });
    }
  }
}