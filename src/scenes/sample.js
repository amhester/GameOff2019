import Phaser from 'phaser';

export default class SampleScene extends Phaser.Scene {
  #logo = null;
  #VELOCITY_FACTOR = 100;

  constructor() {
    super('SampleScene');
  }

  preload() {
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }

  create() {
    this.add.image(400, 300, 'sky');

    const particles = this.add.particles('red');

    const emitter = particles.createEmitter({
      speed: 100,
      scale: {
        start: 1,
        end: 0,
      },
      blendMode: 'ADD',
    });

    this.#logo = this.physics.add.image(400, 100, 'logo');

    this.#logo.setVelocity(0, 0);
    this.#logo.setBounce(1, 1);
    this.#logo.setCollideWorldBounds(true);

    emitter.startFollow(this.#logo);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      console.log('LEFT');
      this.#logo.setVelocity(this.#VELOCITY_FACTOR * -1, 0);
    } else if (cursors.right.isDown) {
      console.log('RIGHT');
      this.#logo.setVelocity(this.#VELOCITY_FACTOR * 1, 0);
    } else if (cursors.up.isDown) {
      console.log('UP');
      this.#logo.setVelocity(0, this.#VELOCITY_FACTOR * -1);
    } else if (cursors.down.isDown) {
      console.log('DOWN');
      this.#logo.setVelocity(0, this.#VELOCITY_FACTOR * 1);
    }
  }
}