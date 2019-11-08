import Phaser from 'phaser'

const config = {
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
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
}

const game = new Phaser.Game(config)
let logo
const VELOCITY_FACTOR = 100

function preload() {
  this.load.setBaseURL('http://labs.phaser.io')

  this.load.image('sky', 'assets/skies/space3.png')
  this.load.image('logo', 'assets/sprites/phaser3-logo.png')
  this.load.image('red', 'assets/particles/red.png')
}

function create() {
  this.add.image(400, 300, 'sky')

  const particles = this.add.particles('red')

  const emitter = particles.createEmitter({
    speed: 100,
    scale: {
      start: 1,
      end: 0,
    },
    blendMode: 'ADD',
  })

  logo = this.physics.add.image(400, 100, 'logo')

  logo.setVelocity(0, 0)
  logo.setBounce(1, 1)
  logo.setCollideWorldBounds(true)

  emitter.startFollow(logo)
}

function update() {
  const cursors = this.input.keyboard.createCursorKeys()

  if (cursors.left.isDown) {
    console.log('LEFT')
    logo.setVelocity(VELOCITY_FACTOR * -1, 0)
  } else if (cursors.right.isDown) {
    console.log('RIGHT')
    logo.setVelocity(VELOCITY_FACTOR * 1, 0)
  } else if (cursors.up.isDown) {
    console.log('UP')
    logo.setVelocity(0, VELOCITY_FACTOR * -1)
  } else if (cursors.down.isDown) {
    console.log('DOWN')
    logo.setVelocity(0, VELOCITY_FACTOR * 1)
  } else if (cursors.space.isDown) {
    console.log('space')
    logo.setVelocity(0, 0)
  }
}
