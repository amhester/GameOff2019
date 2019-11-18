import BaseScene from '../helpers/BaseScene';
import AlignGrid from '../helpers/AlignGrid';

export default class BlankScene extends BaseScene {
  constructor() {
    super('BlankScene');
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
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
  }
}
