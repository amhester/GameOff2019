import Phaser from 'phaser';
import SampleScene from './scenes/SampleScene';
import SampleShipScene from './scenes/SampleShipScene';
import EventBus from './helpers/EventBus';

class App {
  start(config = {}) {
    const defaultConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {
            // y: 200,
          },
        },
      },
      // scene: scenes,
    };

    this.scenes = config.scene;
    this.currentScene = config.scene[0].name;

    this.game = new Phaser.Game({
      ...defaultConfig,
      ...config,
    });

    this.eventBus = EventBus.getInstance();

    this.eventBus.on('scene:change', ({ id, data = {} }) => {
      if (!this.hasScene(id)) {
        throw new Error(`Invalid scene id "${id}"`);
      }

      this.game.scene.stop(this.currentScene);
      this.currentScene = id;
      this.game.scene.start(id, data);
    });

    this.eventBus.on('hotkey', ({ char }) => {
      let sceneIndex = char - 1;
      if (sceneIndex > -1) {
        if (!this.scenes[sceneIndex]) {
          throw new Error(`No scene found at index ${sceneIndex}`);
        }
        this.eventBus.emit('scene:change', {
          id: this.scenes[sceneIndex].name
        });
      }
    });
  }

  hasScene(id) {
    return this.scenes.find(scene => scene.name === id);
  }
}

const scenes = [
  // First scene gets loaded first
  SampleScene,
  SampleShipScene,
];

const app = new App();
if (window) {
  window.app = app;
}
app.start({
  scene: scenes,
});
