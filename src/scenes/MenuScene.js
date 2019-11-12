import Phaser from 'phaser';
import AlignGrid from '../helpers/AlignGrid';
import EventBus from '../helpers/EventBus';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');

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

    this.text = this.add.bitmapText(0, 0, 'supermercado', 'MY GAME!', 64);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
  }
}