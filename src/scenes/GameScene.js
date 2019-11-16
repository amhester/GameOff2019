import Phaser from 'phaser';
import EventBus from '../helpers/EventBus';
import { ROLES } from '../helpers/enums';
import TILES from '../helpers/WorldTiles';
import MAPS from '../config/maps.json';
import Player from '../player';

import mapTilesImage from '../assets/tilesets/world_tiles.png';
import creatureSpritesheet from '../assets/tilesets/creature_sprites.png';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');

    this.EventBus = EventBus.getInstance();

    this.mapConfig = MAPS.maps[MAPS.default];
  }

  preload() {
    this.load.image('tiles', mapTilesImage);
    this.load.spritesheet('creatures', creatureSpritesheet, {
      frameWidth: 24,
      frameHeight: 24,
    });
    // TODO: Add tilemap for map tiles
    // TODO: Add real player sprites
    // TODO: Add some basic interactive objects
  }

  create() {
    // Create map
    this.map = this.make.tilemap({
      tileWidth: this.mapConfig.tileWidth,
      tileHeight: this.mapConfig.tileHeight,
      width: this.mapConfig.widthInTiles,
      height: this.mapConfig.heightInTiles,
    });
    this.tileset = this.map.addTilesetImage('tiles', null, 24, 24, 0, 0);
    this.groundLayer = this.map.createBlankDynamicLayer('ground', this.tileset);
    this.groundLayer.fill(TILES.BLANK);
    // this.objectLayer = this.map.createDynamicLayer('objects', this.tileset);
    // this.shadowLayer = this.map.createDynamicLayer('shadow', this.tileset).fill(TILES.BLANK);
    this.fillMap();
    this.groundLayer.setCollisionByExclusion([-1, TILES.FLOOR.BASIC]);

    // Set map physics
    const worldWidth = this.mapConfig.tileWidth * this.mapConfig.widthInTiles;
    const worldHeight = this.mapConfig.tileHeight * this.mapConfig.heightInTiles;
    this.physics.world.bounds.width = worldWidth;
    this.physics.world.bounds.height = worldHeight;

    // Create player and set characteristics
    this.player = Player.newPlayer(this, 'Player1', ROLES.NORMAL, true);
    this.player.setPosition(
      this.map.tileToWorldX(this.mapConfig.playerStartX),
      this.map.tileToWorldY(this.mapConfig.playerStartY),
    );
    this.physics.add.collider(this.player.sprite, this.groundLayer);

    // Set camera movement on player
    this.cameras.main.setZoom(2.5);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.startFollow(this.player.sprite);
    this.cameras.main.setRoundPixels(true); // Prevents some weird rendering effects

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

  fillMap() {
    const layout = this.mapConfig.layout || [[]];
    layout.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col === 1) {
          this.groundLayer.putTileAt(TILES.FLOOR.BASIC, x, y);
        }
      });
    });
  }
}
