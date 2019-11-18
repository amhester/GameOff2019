import buttonsJson from '../assets/sprites/buttons.json';
import EventBus from '../helpers/EventBus';

export default class UIButton {
  EventBus = EventBus.getInstance();

  constructor({
    id,
    x,
    y,
    size,
    text,
    textOffset,
    scene,
  }) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.size = size;
    this.text = text;
    this.textOffset = textOffset;
    this.scene = scene;
  }

  create() {
    const {
      id,
      x,
      y,
      size,
      text,
      textOffset,
      scene,
    } = this;
    const containerWidth = size * 3 + 5;
    const containerLeft = x + (containerWidth / 2) - 10;
    this.rect = scene.add.rectangle(containerLeft, y, containerWidth, size).setInteractive();

    const btnOne = scene.add.sprite(x, y, 'buttons', 'gui_0001.png');
    const btnTwo = scene.add.sprite(x + size, y, 'buttons', 'gui_0002.png');
    const btnThree = scene.add.sprite(x + (2 * size), y, 'buttons', 'gui_0003.png');
    const btnFour = scene.add.sprite(x + (3 * size), y, 'buttons', 'gui_0004.png');

    btnOne.setDisplaySize(size, size);
    btnTwo.setDisplaySize(size, size);
    btnThree.setDisplaySize(size, size);
    btnFour.setDisplaySize(size, size);

    this.textVal = scene.add.text(x + textOffset, y - 5, text).setInteractive();

    // button.textVal
    this.textVal.on('pointerdown', () => {
      // Could make UIButton a subclass of Phaser.Events.EventEmitter if desired
      this.EventBus.emit('UIButton:click', { id });
    });
  }

  preload() {
    this.scene.load.multiatlas('buttons', buttonsJson, 'src/assets/sprites');
  }
}
