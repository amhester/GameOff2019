import Phaser from 'phaser';
import AlignGrid from '../helpers/AlignGrid';
import EventBus from '../helpers/EventBus';
import Host from '../helpers/Host';
import Client from '../helpers/Client';

import jeff from '../assets/jeff.png';

export default class SampleScene extends Phaser.Scene {
  #logo = null;
  #VELOCITY_FACTOR = 100;

  constructor() {
    super('SampleScene');

    this.EventBus = EventBus.getInstance();
    this.Host = null;
  }

  preload() {
    // this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('jeff', jeff);
  }

  create() {
    this.grid = new AlignGrid({
      scene: this,
      cols: 10,
      rows: 10,
    });
    this.grid.showNumbers(); // Comment out to make lines disappear

    this.jeff = this.physics.add.image(0, 0, 'jeff');
    this.grid.scaleToCell(this.jeff);
    this.grid.placeAtIndex(13, this.jeff);

    this.jeff.setVelocity(0, 0);
    this.jeff.setBounce(1, 1);
    this.jeff.setCollideWorldBounds(true);

    this.EventBus.on('ARROW_LEFT', () => {
      console.log('LEFT');
      this.jeff.setVelocity(this.#VELOCITY_FACTOR * -1, 0);
    });

    this.EventBus.on('ARROW_RIGHT', () => {
      console.log('RIGHT');
      this.jeff.setVelocity(this.#VELOCITY_FACTOR * 1, 0);
    });

    this.EventBus.on('ARROW_UP', () => {
      console.log('UP');
      this.jeff.setVelocity(0, this.#VELOCITY_FACTOR * -1);
    });

    this.EventBus.on('ARROW_DOWN', () => {
      console.log('DOWN');
      this.jeff.setVelocity(0, this.#VELOCITY_FACTOR * 1);
    });
    var el = document.getElementById('host-id');
    el.onchange = this.textAreaChanged.bind(this);

    const startHostEl = document.getElementById('start-host');
    startHostEl.onclick = this.startHost.bind(this);

    const joinGameEl = document.getElementById('join');
    joinGameEl.onclick = this.joinGame.bind(this);

    const m = document.getElementById('m');
    m.onclick = this.sendMessage.bind(this);

    const sendAll = document.getElementById('send-all');
    sendAll.onclick = this.sendAllMessages.bind(this);

  }

  textAreaChanged() {
    var text = document.getElementById("host-id");
    console.log(text.value);
  }

  startHost() {
      if (!this.Host) {
        this.Host = Host.getInstance();
        this.Host.peer.on('open', id => console.log(id)); 
      }
  }

  joinGame() {
    const el = document.getElementById('host-id');
    this.client = new Client(el.value);
  }

  sendMessage() {
    const el = document.getElementById('m');
    this.client.sendMessage('hi');
  }

  sendAllMessages() {
    const el = document.getElementById('send-all');
    this.Host.sendMessage('All yeah')
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.EventBus.emit('ARROW_LEFT');
    } else if (cursors.right.isDown) {
      this.EventBus.emit('ARROW_RIGHT');
    } else if (cursors.up.isDown) {
      this.EventBus.emit('ARROW_UP');
    } else if (cursors.down.isDown) {
      this.EventBus.emit('ARROW_DOWN');
    }
  }
}