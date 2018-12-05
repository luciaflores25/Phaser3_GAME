import 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor () {
    super({ key: 'UI', active: true });
  }

  init () {
    this.coinsCollected = 0;
  }

  create () {
    // creamos el texto para las monedas
    this.scoreText = this.add.text(12, 12, `Monedas: ${this.coinsCollected}`, { fontSize: '40px', backgroundColor: '#000', fill: '#FFFC00' });
    // creamos el texto de información del límite
    this.limitText = this.add.text(780, 12, `¡Consigue 50 monedas para ganar!`, { fontSize: '30px', backgroundColor: '#580C3C', fill: '#EAEDB6' });
    // creamos el texto de información de manejo
    this.spaceText = this.add.text(780, 42, `Pulsa espacio para disparar\nUtiliza las flechas para moverte`, { fontSize: '20px', backgroundColor: '#134A70', fill: '#FFFFFF' });
    // creamos el texto que se muestra al ganar y lo ponemos invisible
    this.winText1 = this.add.text(80, 200, `¡Enhorabuena, `, { fontSize: '70px', backgroundColor: '#13E14D', fill: '#FCFF00' });
    this.winText2 = this.add.text(80, 263, `has conseguido 50 monedas!`, { fontSize: '70px', backgroundColor: '#13E14D', fill: '#FCFF00' });
    this.winText1.visible = false;
    this.winText2.visible = false;
    // creamos el texto de las vidas
    this.healthText = this.add.text(12, 50, `Vidas: 5`, { fontSize: '40px', backgroundColor: '#000', fill: '#fff' });


    // referencia de la escena Game
    this.gameScene = this.scene.get('Game');

    // evento para contar las monedas
    this.gameScene.events.on('coinCollected', () => {
      this.coinsCollected++;
      this.scoreText.setText(`Monedas: ${this.coinsCollected}`);

      // al llegar a 50 monedas se activa el texto de ganar
      if(this.coinsCollected == 50){

        this.winText1.visible = true;
        this.winText2.visible = true;
        this.gameScene = this.scene.pause('Game');
        self.game.scene.keys.Game.victoriaSound.play();

        setTimeout(function(){
          self.game.scene.keys.UI.winText1.visible = false;
          self.game.scene.keys.UI.winText2.visible = false;
          self.game.scene.keys.Boot.scene.start();}, 6000);
      }
    });

    // evento para mostrar las vidas que quedan
    this.gameScene.events.on('loseHealth', (health) => {
      this.healthText.setText(`Vidas: ${health}`);
    });

    this.gameScene.events.on('newGame', () => {
      this.coinsCollected = 0;
      this.scoreText.setText(`Monedas: ${this.coinsCollected}`);
      this.healthText.setText(`Vidas: 5`);


    });
  }
};
