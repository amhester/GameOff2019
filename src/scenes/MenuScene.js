import BaseScene from '../helpers/BaseScene';
import AlignGrid from '../helpers/AlignGrid';
import EventBus from '../helpers/EventBus';

export default class MenuScene extends BaseScene {
  constructor() {
    super('MenuScene');
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

    this.input.keyboard.on('keydown', data => {
      console.log('KEYDOWN', data);
      try {
        const integer = parseInt(data.key, 10);
        this.EventBus.emit('hotkey', { char: integer });
      } catch (err) {
        console.error(err);
      }
    });
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
  }
}
