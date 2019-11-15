import Phaser from 'phaser';
import AlignGrid from '../helpers/AlignGrid';
import EventBus from '../helpers/EventBus';

export default class BlankScene extends Phaser.Scene {
  constructor() {
    super('BlankScene');

    this.EventBus = EventBus.getInstance();
  }

  // preload() {

  // }

  create() {
    this.grid = new AlignGrid({
      scene: this,
      cols: 10,
      rows: 10,
    });
    this.grid.showNumbers(); // Comment out to make lines disappear

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
  }
}
