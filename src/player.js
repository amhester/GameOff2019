import CREATURES from './helpers/CreatureSprites'
import EventBus from './helpers/EventBus';
import { EVENTS } from './helpers/enums';

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
  listenForInput: false,
};

class Player {
  constructor(config = {}) {
    this.config = { ...defaultConfig, ...config }

    this.EventBus = EventBus.getInstance();

    this.scene = this.config.scene;

    this.baseSprite = CREATURES.PC.ROLE[this.config.role];
    this.sprite = this.scene.physics.add
      .sprite(this.config.startX, this.config.startY, 'creatures', this.baseSprite.VARIATIONS[0].STATIC);

    this.sprite.setScale(0.9);

    this.setupAnimations();

    this.sprite.anims.play('idle');

    this.sprite.setCollideWorldBounds(true);

    this.subscribeEvents();
    if (this.config.listenForInput) {
      this.cursors = this.scene.input.keyboard.createCursorKeys();
    }
  }

  setupAnimations() {
    const anims = this.scene.anims;
    anims.create({
      key: 'idle',
      frames: anims.generateFrameNumbers('creatures', {
        frames: this.baseSprite.VARIATIONS[0].ANIMS.IDLE,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  update() {
    // reset current movement
    this.sprite.body.setVelocity(0);

    if (this.config.listenForInput) {
      const moveData = { id: this.config.username };
      let shouldMove = false;

      if (this.cursors.left.isDown) {
        moveData.left = true;
        shouldMove = true;
      }

      if (this.cursors.right.isDown) {
        moveData.right = true;
        shouldMove = true;
      }

      if (this.cursors.up.isDown) {
        moveData.up = true;
        shouldMove = true;
      }

      if (this.cursors.down.isDown) {
        moveData.down = true;
        shouldMove = true;
      }

      if (shouldMove) {
        this.EventBus.emit(EVENTS.MOVE, moveData);
      }
    }
  }

  subscribeEvents() {
    this.EventBus.on(EVENTS.MOVE, ({ id, up, down, left, right }) => {
      if (id !== this.config.username) {
        return;
      }

      // Horizontal logic
      if (left) {
        this.sprite.body.setVelocityX(this.config.baseSpeed * -1);
        this.sprite.setFlipX(false);
      } else if (right) {
        this.sprite.body.setVelocityX(this.config.baseSpeed);
        this.sprite.setFlipX(true);
      }

      // Vertical logic
      if (up) {
        this.sprite.body.setVelocityY(this.config.baseSpeed * -1);
      } else if (down) {
        this.sprite.body.setVelocityY(this.config.baseSpeed);
      }

      // Normalize and scale the velocity so that sprite can't move faster along a diagonal
      this.sprite.body.velocity.normalize().scale(this.config.baseSpeed);
    });
  }

  setPosition(x, y) {
    this.sprite.setX(x);
    this.sprite.setY(y);
  }

  static newPlayer(scene, username, role, controllable = false) {
    const config = {
      ...defaultConfig,
      scene,
      username,
      role,
      listenForInput: controllable,
    }
    return new Player(config);
  }
}

export default Player;
