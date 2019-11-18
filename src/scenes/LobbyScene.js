import BaseScene from '../helpers/BaseScene';
import AlignGrid from '../helpers/AlignGrid';
import Client from '../helpers/Client';
import Host from '../helpers/Host';
import buttonsJson from '../assets/sprites/buttons.json';

const PLACE_HOLDER_TEXT = 'Enter Host Id';

export default class LobbyScene extends BaseScene {
  constructor() {
    super('LobbyScene');
  }

  preload() {
    this.load.multiatlas('buttons', buttonsJson, 'src/assets/sprites');
  }

  create() {
    this.grid = new AlignGrid({
      scene: this,
      cols: 10,
      rows: 10,
    });
    // this.grid.showNumbers(); // Comment out to make lines disappear
    this.generateButton(100, 200, 50, 'Host Game', 30).textVal.on('pointerdown', () => this.startHost());

    const input = this.generateButton(350, 260, 50, PLACE_HOLDER_TEXT, 2);
    input.textVal.on('pointerdown', () => {
      this.updateLobbyText(input.rect, input.textVal);
    });

    const joinGameObject = this.generateButton(350, 200, 50, 'Join Game', 30);
    joinGameObject.textVal.on('pointerdown', () => this.joinGame(input.textVal.text));
  }

  updateLobbyText(rect, textVal) {
    if (!this.listening) {
      this.listening = true;
      textVal.text = '';
      this.input.keyboard.on('keyup', event => {
        if (event.key === 'Backspace') {
          if (textVal.text.length > 0) {
            textVal.text = textVal.text.substring(0, textVal.text.length - 1);
          }
        } else if (textVal.text.length < 16) {
          textVal.text = `${textVal.text}${event.key}`;
        }
      });
    }
  }

  // Hacky-ish way to get buttons working. Probably will want to refactor eventually
  generateButton(initialX, y, size, buttonText, textOffset) {
    const containerWidth = size * 3 + 5;
    const containerLeft = initialX + (containerWidth / 2) - 10;
    const rect = this.add.rectangle(containerLeft, y, containerWidth, size).setInteractive();

    const btnOne = this.add.sprite(initialX, y, 'buttons', 'gui_0001.png');
    const btnTwo = this.add.sprite(initialX + size, y, 'buttons', 'gui_0002.png');
    const btnThree = this.add.sprite(initialX + (2 * size), y, 'buttons', 'gui_0003.png');
    const btnFour = this.add.sprite(initialX + (3 * size), y, 'buttons', 'gui_0004.png');

    btnOne.setDisplaySize(size, size);
    btnTwo.setDisplaySize(size, size);
    btnThree.setDisplaySize(size, size);
    btnFour.setDisplaySize(size, size);

    const textVal = this.add.text(initialX + textOffset, y - 5, buttonText).setInteractive();
    return { rect, textVal };
  }

  joinGame(hostId) {
    if (!this.client) {
      this.client = new Client(hostId);
    } else {
      this.client.sendMessage('Hi');
    }
  }

  startHost() {
    if (!this.Host) {
      this.Host = Host.getInstance();
      this.Host.peer.on('open', id => {
        console.log(id);
        this.add.text(100, 260, id).setZ(10);
      });
    }
  }
}
