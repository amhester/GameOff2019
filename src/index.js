import Phaser from 'phaser';
import LobbyScene from './scenes/LobbyScene';
import SampleScene from './scenes/SampleScene';
import GameScene from './scenes/GameScene';
import EventBus from './helpers/EventBus';
import {EVENTS} from './helpers/enums';

// Hacky way to load all pngs for phaser to use.
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('./assets', true, /\.png$/));

class App {
  start(config = {}) {
    const defaultConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {
            y: 0,
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

    this.eventBus.on(EVENTS.SCENE_CHANGE, ({ id, data = {} }) => {
      if (!this.hasScene(id)) {
        throw new Error(`Invalid scene id "${id}"`);
      }

      this.game.scene.stop(this.currentScene);
      this.currentScene = id;
      this.game.scene.start(id, data);
    });

    this.eventBus.on(EVENTS.HOTKEY, ({ char }) => {
      const sceneIndex = char - 1;
      if (sceneIndex > -1) {
        if (!this.scenes[sceneIndex]) {
          throw new Error(`No scene found at index ${sceneIndex}`);
        }
        this.eventBus.emit('scene:change', {
          id: this.scenes[sceneIndex].name,
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
  LobbyScene,
  GameScene,
  SampleScene,
];

const app = new App();
if (window) {
  window.app = app;
}
app.start({
  scene: scenes,
});
