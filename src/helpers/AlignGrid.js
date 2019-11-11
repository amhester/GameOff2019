import gameConfig from '../config/gameConfig';

export default class AlignGrid {
  constructor({
    cols = 3,
    height = gameConfig.height,
    rows = 3,
    scene,
    width = gameConfig.width,
  } = {}) {
    if (!scene) {
      throw new Error('missing scene!');
    }
    this.h = height;
    this.w = width;
    this.rows = rows;
    this.cols = cols;
    this.scene = scene;

    this.cw = this.w / this.cols;
    this.ch = this.h / this.rows;
  }

  // mostly for planning and debugging this will
  // create a visual representation of the grid
  show(a = 1) {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(4, 0xff0000, a);

    this.graphics.beginPath();
    for (let i = 0; i < this.w; i += this.cw) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.h);
    }
    for (let i = 0; i < this.h; i += this.ch) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.w, i);
    }
    this.graphics.strokePath();
  }
}
