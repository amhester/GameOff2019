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

  // Should help devs plan better
  showNumbers(a = 1) {
    this.show(a);
    let n = 0;
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.cols; j += 1) {
        const numText = this.scene.add.text(0, 0, n, {
          color: 'red',
        });
        numText.setOrigin(0.5, 0.5);
        this.placeAt(j, i, numText);
        n += 1;
      }
    }
  }

  placeAt(xx, yy, obj) {
    // calculate the center of the cell
    // by adding half of the height and width
    // to the x and y of the coordinates
    const x2 = this.cw * xx + this.cw / 2;
    const y2 = this.ch * yy + this.ch / 2;
    obj.x = x2;
    obj.y = y2;
  }

  placeOriginAt(xx, yy, obj) {
    const x2 = this.cw * xx + obj.displayWidth / 2;
    const y2 = this.ch * yy + obj.displayHeight / 2;
    obj.x = x2;
    obj.y = y2;
  }

  placeOriginAtIndex(index, obj) {
    const yy = Math.floor(index / this.cols);
    const xx = index - (yy * this.cols);
    this.placeOriginAt(xx, yy, obj);
  }

  // Useful if using showNumbers in development
  placeAtIndex(index, obj) {
    const yy = Math.floor(index / this.cols);
    const xx = index - (yy * this.cols);
    this.placeAt(xx, yy, obj);
  }

  scaleToCell(obj) {
    obj.displayWidth = this.cw;
    obj.scaleY = obj.scaleX;
  }

  scaleToCellRange(obj, width, height) {
    obj.displayWidth = this.cw * width;
    obj.displayHeight = this.ch * height;
  }
}
