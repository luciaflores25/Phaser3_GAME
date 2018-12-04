import 'phaser';
import Enemy from '../Sprites/Enemy';

export default class Enemies extends Phaser.Physics.Arcade.Group {
  constructor (world, scene, children, spriteArray) {
    super(world, scene, children);
    this.scene = scene;

    // posición de cada sprite de enemigos
    this.spriteFrames = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                         24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
                         60, 61, 62, 63, 64, 65, 66, 67, 68, 72, 73, 74,
                         75, 76, 77, 78];

    // creamos los enemigos del array delsprite anterior
    this.createEnemies(scene, spriteArray);
  }

  createEnemies (scene, spriteArray) {
    spriteArray.forEach((sprite) => {

      // elegimos un número del array aleatoriamente
      const randNumber = Math.floor(Math.random() * this.spriteFrames.length - 1);
      // creamos al nuevo enemigo
      const enemy = new Enemy(scene, sprite.x, sprite.y, this.spriteFrames[randNumber]);
      // lo añadimos al grupo
      this.add(enemy);

      // destruimos el sprite
      sprite.destroy();
    });
  }
}