import 'phaser';

export default class Coins extends Phaser.Physics.Arcade.StaticGroup {
  constructor (world, scene, children, spriteArray) {
    super(world, scene, children);
    this.scene = scene;

    spriteArray.forEach((coin) => {
      coin.setScale(0.2);
      this.add(coin);
    });
    this.refresh();
  }

  collectCoin (player, coin) {
    this.remove(coin);
    coin.destroy();
    self.game.scene.keys.Game.coinSound.play();
    this.scene.events.emit('coinCollected');
  }
}
 