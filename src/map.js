import TILES from './helpers/WorldTiles';

import MAPS from './config/maps.json';

const defaultConfig = {
  tileHeight: 24,
  tileWidth: 24,
  widthInTiles: 10,
  heightInTiles: 10,
  playerStartX: 0,
  playerStartY: 0,
  layout: [[]],
};

class Map {
  constructor(scene, config = {}) {
    this.config = { ...defaultConfig, ...config };

    this.width = this.config.tileWidth * this.config.widthInTiles;
    this.height = this.config.tileHeight * this.config.heightInTiles;

    this.scene = scene;
    this.map = this.scene.make.tilemap({
      tileWidth: this.config.tileWidth,
      tileHeight: this.config.tileHeight,
      width: this.config.widthInTiles,
      height: this.config.heightInTiles,
    });
    this.tileset = this.map.addTilesetImage(
      'tiles',
      null,
      this.config.tileWidth,
      this.config.tileHeight,
      0,
      0,
    );
    this.groundLayer = this.map.createBlankDynamicLayer('ground', this.tileset);
    this.groundLayer.fill(TILES.BLANK);
    // this.objectLayer = this.map.createDynamicLayer('objects', this.tileset);
    // this.shadowLayer = this.map.createDynamicLayer('shadow', this.tileset).fill(TILES.BLANK);
    this.fillMap();
    this.groundLayer.setCollisionByExclusion([-1, TILES.FLOOR.BASIC]);

    this.scene.physics.world.bounds.width = this.width;
    this.scene.physics.world.bounds.height = this.height;
  }

  fillMap() {
    const layout = this.config.layout || [[]];
    layout.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col === 1) {
          this.groundLayer.putTileAt(TILES.FLOOR.BASIC, x, y);
        }
      });
    });
  }

  addPlayer(player, x = null, y = null) {
    player.setPosition(
      this.map.tileToWorldX(this.config.playerStartX),
      this.map.tileToWorldY(this.config.playerStartY),
    );
    if (x !== null && y !== null) {
      player.setPosition(
        this.map.tileToWorldX(x),
        this.map.tileToWorldY(y),
      );
    }
    this.scene.physics.add.collider(player.sprite, this.groundLayer);
  }

  static create(scene, mapConfig = null) {
    let config = MAPS.maps[MAPS.default];
    if (mapConfig) {
      if (typeof mapConfig === 'string') {
        config = MAPS.maps[mapConfig];
      } else if (typeof mapConfig === 'number') {
        config = { seed: mapConfig };
      } else if (typeof mapConfig === 'object') {
        config = mapConfig;
      } else {
        throw new Error('Invalid Map Config');
      }
    }
    return new Map(scene, config);
  }
}

export default Map;
