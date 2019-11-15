import Phaser from 'phaser';
import AlignGrid from '../helpers/AlignGrid';
import EventBus from '../helpers/EventBus';
import TILES from '../helpers/WorldTiles';
import MAPS from '../config/maps.json';

import jeff from '../assets/jeff.png';
import mapTilesImage from '../assets/tilesets/world_tiles.png';

const VELOCITY_FACTOR = 100;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');

    this.EventBus = EventBus.getInstance();

    this.mapConfig = MAPS.maps[MAPS.default];
  }

  preload() {
    this.load.image('jeff', jeff);
    this.load.image('tiles', mapTilesImage);
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
    this.player = this.physics.add.image(
      this.map.tileToWorldX(this.mapConfig.playerStartX),
      this.map.tileToWorldY(this.mapConfig.playerStartY),
      'jeff',
    );
    this.player.setScale(.07, .07);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.groundLayer);

    // Set camera movement on player
    this.cameras.main.setZoom(2.5);
    this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setRoundPixels(true); // Prevents some weird rendering effects

    // Subscribe to relevant events
    this.cursors = this.input.keyboard.createCursorKeys();
    this.initListeners();
  }

  update() {
    // Reset velocity so we don't have to manually listen for key up events
    this.player.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.EventBus.emit('ARROW_LEFT');
    } else if (this.cursors.right.isDown) {
      this.EventBus.emit('ARROW_RIGHT');
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.EventBus.emit('ARROW_UP');
    } else if (this.cursors.down.isDown) {
      this.EventBus.emit('ARROW_DOWN');
    }
  }

  initListeners() {
    this.EventBus.on('ARROW_LEFT', () => {
      this.player.setVelocity(VELOCITY_FACTOR * -1, 0);
    });

    this.EventBus.on('ARROW_RIGHT', () => {
      this.player.setVelocity(VELOCITY_FACTOR * 1, 0);
    });

    this.EventBus.on('ARROW_UP', () => {
      this.player.setVelocity(0, VELOCITY_FACTOR * -1);
    });

    this.EventBus.on('ARROW_DOWN', () => {
      this.player.setVelocity(0, VELOCITY_FACTOR * 1);
    });

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
