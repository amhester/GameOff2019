import Phaser from 'phaser';
import SampleScene from '../scenes/SampleScene';

export default {
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
  scene: SampleScene,
};
