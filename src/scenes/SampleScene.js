import Phaser from 'phaser';
import AlignGrid from '../helpers/AlignGrid';
import EventBus from '../helpers/EventBus';

import jeff from '../assets/jeff.png';

export default class SampleScene extends Phaser.Scene {
  constructor() {
    super('SampleScene');

    this.logo = null;
    this.VELOCITY_FACTOR = 100;
    this.EventBus = EventBus.getInstance();
  }

  preload() {
    // this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('jeff', jeff);
  }

  create() {
    this.grid = new AlignGrid({
      scene: this,
      cols: 10,
      rows: 10,
    });
    this.grid.showNumbers(); // Comment out to make lines disappear

    this.jeff = this.physics.add.image(0, 0, 'jeff');
    this.grid.scaleToCell(this.jeff);
    this.grid.placeAtIndex(13, this.jeff);

    this.jeff.setVelocity(0, 0);
    this.jeff.setBounce(1, 1);
    this.jeff.setCollideWorldBounds(true);

    this.EventBus.on('ARROW_LEFT', () => {
      console.log('LEFT');
      this.jeff.setVelocity(this.VELOCITY_FACTOR * -1, 0);
    });

    this.EventBus.on('ARROW_RIGHT', () => {
      console.log('RIGHT');
      this.jeff.setVelocity(this.VELOCITY_FACTOR * 1, 0);
    });

    this.EventBus.on('ARROW_UP', () => {
      console.log('UP');
      this.jeff.setVelocity(0, this.VELOCITY_FACTOR * -1);
    });

    this.EventBus.on('ARROW_DOWN', () => {
      console.log('DOWN');
      this.jeff.setVelocity(0, this.VELOCITY_FACTOR * 1);
    });

    this.input.keyboard.on('keydown', (data) => {
      console.log('KEYDOWN', data);
      try {
        const integer = parseInt(data.key, 10);
        this.EventBus.emit('hotkey', { char: integer });
      } catch (err) {}
    });
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.EventBus.emit('ARROW_LEFT');
    } else if (cursors.right.isDown) {
      this.EventBus.emit('ARROW_RIGHT');
    } else if (cursors.up.isDown) {
      this.EventBus.emit('ARROW_UP');
    } else if (cursors.down.isDown) {
      this.EventBus.emit('ARROW_DOWN');
    }
  }
}
