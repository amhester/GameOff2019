import Phaser from 'phaser';
import AlignGrid from '../helpers/AlignGrid';
import EventBus from '../helpers/EventBus';

import sampleShip from '../assets/SampleShip_white.png';

export default class SampleShipScene extends Phaser.Scene {
  constructor() {
    super('SampleShipScene');

    this.EventBus = EventBus.getInstance();
  }

  init(options) {
    console.log('init SampleShipScene', options);
    this.options = options;

    this.backgroundImages = {};
  }

  preload() {
    console.log('preload SampleShipScene', this.options);

    this.load.image('sampleShip', sampleShip);
  }

  create() {
    console.log('create SampleShipScene');
    this.graphics = this.add.graphics();
    this.grid = new AlignGrid({
      scene: this,
      cols: 16,
      rows: 14,
    });
    this.grid.showNumbers(); // Comment out to make lines disappear

    this.backgroundImages.sampleShip = this.add.image(0, 0, 'sampleShip');
    this.grid.scaleToCellRange(this.backgroundImages.sampleShip, 14, 11);
    this.grid.placeOriginAtIndex(17, this.backgroundImages.sampleShip);

    this.input.keyboard.on('keydown', (data) => {
      console.log('KEYDOWN', data);
      try {
        const integer = parseInt(data.key, 10);
        this.EventBus.emit('hotkey', { char: integer });
      } catch (err) {}
    });
  }

  update() {
    // console.log('update SampleShipScene', this.options);
    // const cursors = this.input.keyboard.createCursorKeys();
  }

  shutdown() {
    console.log('shutdown SampleShipScene');
  }

  getThis() {
    return this;
  }
}