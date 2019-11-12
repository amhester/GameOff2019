import Phaser from 'phaser';
import AlignGrid from '../helpers/AlignGrid';
import EventBus from '../helpers/EventBus';

export default class SampleShipScene extends Phaser.Scene {
  constructor() {
    super('SampleShipScene');

    this.EventBus = EventBus.getInstance();
  }

  init(options) {
    console.log('init SampleShipScene', options);
    this.options = options;
  }

  preload() {
    console.log('preload SampleShipScene', this.options);
  }

  create() {
    console.log('create SampleShipScene');
    this.grid = new AlignGrid({
      scene: this,
      cols: 10,
      rows: 10,
    });
    this.grid.showNumbers(); // Comment out to make lines disappear
  }

  update() {
    console.log('update SampleShipScene', this.options);
    // const cursors = this.input.keyboard.createCursorKeys();
  }

  shutdown() {
    console.log('shutdown SampleShipScene');
  }
}