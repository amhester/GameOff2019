import Phaser from 'phaser';
import AlignGrid from '../helpers/AlignGrid';
import EventBus from '../helpers/EventBus';

export default class BlankScene extends Phaser.Scene {
  constructor() {
    super('BlankScene');

    this.EventBus = EventBus.getInstance();
  }

  preload() {

  }

  create() {
    this.grid = new AlignGrid({
      scene: this,
      cols: 10,
      rows: 10,
    });
    this.grid.showNumbers(); // Comment out to make lines disappear
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
  }
}