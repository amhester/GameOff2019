import Phaser from 'phaser';

const defaultConfig = {
  scene: null,
  startX: 0,
  startY: 0,
  texture: '',
  frame: undefined,
  health: 10,
  baseSpeed: 80,
  username: 'player1',
  role: 'player',
};

class Player extends Phaser.Physics.Arcade.Image {
  constructor(config = defaultConfig) {
    super(config.scene, config.startX, config.startY, config.texture, config.frame);
  }

  static new(scene, username, role) {
    const config = {
      ...defaultConfig,
      scene,
      username,
      role
    }
    return new Player(config);
  }
}
