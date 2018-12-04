import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'portal');
    this.scene = scene;

    // activamos la fisica
    this.scene.physics.world.enable(this);
    // añadimos el portal a la escena
    this.scene.add.existing(this);
  }
}