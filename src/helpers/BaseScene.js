import Phaser from 'phaser';
import EventBus from './EventBus';

// Things to be available to all scenes
export default class BaseScene extends Phaser.Scene {
  EventBus = EventBus.getInstance();

  constructor(...sceneParams) {
    super(...sceneParams);
  }

  create() {
    // Subscribe to relevant events
    // this.initListeners();
  }

  init() {
    this.initListeners();
  }

  initListeners() {
    this.input.keyboard.on('keydown', (data) => {
      console.log('KEYDOWN', data);
      try {
        const integer = parseInt(data.key, 10);
        this.EventBus.emit('hotkey', {
          char: integer
        });
      } catch (err) {}
    });
  }
}
