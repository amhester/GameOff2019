import BaseScene from '../helpers/BaseScene';
import EventBus from '../helpers/EventBus';
import { ROLES } from '../helpers/enums';
import Player from '../player';
import Map from '../map';

import mapTilesImage from '../assets/tilesets/world_tiles.png';
import creatureSpritesheet from '../assets/tilesets/creature_sprites.png';
import gameMusic from '../assets/sounds/music/game_track.mp3';

export default class GameScene extends BaseScene {
  constructor() {
    super('GameScene');
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
  }

  update() {
    this.player.update();
  }
}
