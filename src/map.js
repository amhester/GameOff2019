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

const WALL_FLAGS = {
  TOP: 1,
  RIGHT: 2,
  BOTTOM: 4,
  LEFT: 8,
};

function getNeighbors(x, y) {
  return {
    tl: { x: x - 1, y: y - 1 },
    t: { x, y: y - 1 },
    tr: { x: x + 1, y: y - 1 },
    l: { x: x - 1, y },
    r: { x: x + 1, y },
    bl: { x: x - 1, y: y + 1 },
    b: { x, y: y + 1 },
    br: { x: x + 1, y: y + 1 },
  };
}

function isFloorTile(world, { x, y }) {
  if (x < 0
      || x >= world[0].length
      || y < 0
      || y >= world.length) {
    return false;
  }

  return world[y][x] === 1;
}

function isWallTile(world, { x, y }) {
  if (x < 0
      || x >= world[0].length
      || y < 0
      || y >= world.length) {
    return false;
  }

  return world[y][x] === 2;
}

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

  // This could probably use a more standard BFS ruled fill or something, but whatever, it's late
  fillMap() {
    const layout = this.config.layout || [[]];

    // First pass to assign basic walls
    layout.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col === 1) {
          this.groundLayer.putTileAt(TILES.FLOOR.BASIC, x, y);
          return;
        }

        const isWall = Object.values(getNeighbors(x, y))
          .reduce((a, pos) => isFloorTile(layout, pos) || a, false);

        if (isWall) {
          layout[y][x] = 2;
        }
      });
    });

    // Second pass to determine wall orientation
    layout.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col < 2) {
          return;
        }

        const neighbors = getNeighbors(x, y);

        let wallHash = 0;
        if (isWallTile(layout, neighbors.t)) {
          wallHash |= WALL_FLAGS.TOP;
        }
        if (isWallTile(layout, neighbors.r)) {
          wallHash |= WALL_FLAGS.RIGHT;
        }
        if (isWallTile(layout, neighbors.b)) {
          wallHash |= WALL_FLAGS.BOTTOM;
        }
        if (isWallTile(layout, neighbors.l)) {
          wallHash |= WALL_FLAGS.LEFT;
        }

        switch (wallHash) {
          case 1:
            this.groundLayer.putTileAt(TILES.WALL.VERTICAL.CAP_BOTTOM, x, y);
            break;
          case 2:
            this.groundLayer.putTileAt(TILES.WALL.HORIZONTAL.CAP_LEFT, x, y);
            break;
          case 3:
            this.groundLayer.putTileAt(TILES.CORNER.BOTTOM_LEFT, x, y);
            break;
          case 4:
            this.groundLayer.putTileAt(TILES.WALL.VERTICAL.CAP_TOP, x, y);
            break;
          case 5:
            this.groundLayer.putTileAt(TILES.WALL.VERTICAL.OPEN, x, y);
            break;
          case 6:
            this.groundLayer.putTileAt(TILES.CORNER.TOP_LEFT, x, y);
            break;
          case 7:
            this.groundLayer.putTileAt(TILES.T_CORNER.RIGHT, x, y);
            break;
          case 8:
            this.groundLayer.putTileAt(TILES.WALL.HORIZONTAL.CAP_RIGHT, x, y);
            break;
          case 9:
            this.groundLayer.putTileAt(TILES.CORNER.BOTTOM_RIGHT, x, y);
            break;
          case 10:
            this.groundLayer.putTileAt(TILES.WALL.HORIZONTAL.OPEN, x, y);
            break;
          case 11:
            this.groundLayer.putTileAt(TILES.T_CORNER.TOP, x, y);
            break;
          case 12:
            this.groundLayer.putTileAt(TILES.CORNER.TOP_RIGHT, x, y);
            break;
          case 13:
            this.groundLayer.putTileAt(TILES.T_CORNER.LEFT, x, y);
            break;
          case 14:
            this.groundLayer.putTileAt(TILES.T_CORNER.BOTTOM, x, y);
            break;
          case 15:
            this.groundLayer.putTileAt(TILES.T_CORNER.ALL, x, y);
            break;
          default:
            this.groundLayer.putTileAt(TILES.WALL.HORIZONTAL.CAP_BOTH, x, y);
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
