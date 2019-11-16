import Phaser from 'phaser';
import EventBus from '../helpers/EventBus';
import { ROLES } from '../helpers/enums';
import Player from '../player';
import Map from '../map';

import mapTilesImage from '../assets/tilesets/world_tiles.png';
import creatureSpritesheet from '../assets/tilesets/creature_sprites.png';
import gameMusic from '../assets/sounds/music/game_track.mp3';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');

    this.EventBus = EventBus.getInstance();
  }

  preload() {
    this.load.image('tiles', mapTilesImage);
    this.load.spritesheet('creatures', creatureSpritesheet, {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.audio('game_bg', gameMusic);
    // TODO: Add some basic interactive objects
  }

  create() {
    // Create map
    this.map = Map.create(this);

    // Create player and set characteristics
    this.player = Player.newPlayer(this, 'Player1', ROLES.NORMAL, true);

    // Add player to the map
    this.map.addPlayer(this.player);

    // Set camera movement on player
    this.cameras.main.setZoom(2.5);
    this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setRoundPixels(true); // Prevents some weird rendering effects

    // Start music
    this.sound.play('game_bg', { loop: -1 });

    // Subscribe to relevant events
    this.initListeners();
  }

  update() {
    this.player.update();
  }

  initListeners() {
    this.input.keyboard.on('keydown', data => {
      try {
        const integer = parseInt(data.key, 10);
        this.EventBus.emit('hotkey', { char: integer });
      } catch (err) {
        console.error(err);
      }
    });
  }
}
