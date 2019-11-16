const WORLD_TILES = {
  BLANK: 1120,
  FLOOR: {
    BASIC: 0,
  },
  WALL: {
    VERTICAL: {
      OPEN: 11,
      CAP_TOP: 10,
      CAP_BOTTOM: 12,
    },
    HORIZONTAL: {
      OPEN: 8,
      CAP_LEFT: 7,
      CAP_RIGHT: 9,
      CAP_BOTH: 6,
    },
  },
  CORNER: {
    TOP_LEFT: 13,
    TOP_RIGHT: 14,
    BOTTOM_RIGHT: 16,
    BOTTOM_LEFT: 15,
  },
  T_CORNER: {
    ALL: 17,
    BOTTOM: 18,
    LEFT: 19,
    RIGHT: 20,
    TOP: 21,
  },
};

export default WORLD_TILES;
