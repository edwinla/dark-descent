import Floor from './floor';
import Unit from './unit';

export default class Game {
  constructor(canvas, ctx, tileSet, tileSize) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.tileSize = tileSize;
    this.tileSet = tileSet;
    this.floor = new Floor(ctx, tileSet, tileSize, 50, 50);
    this.player = new Unit('u1', this.floor, ctx);
    this.movementEnabled = false;

    this.start();
    this.toggleMovement();
    window.addEventListener('resize', this.resize.bind(this));
  }

  draw() {
    this.floor.draw();
  }

  start() {
    this.floor.render();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.floor.draw();
  }

  toggleMovement() {
    const movePlayer = this.player.move.bind(this.player);

    if (this.movementEnabled) {
      this.movementEnabled = false;
      window.removeEventListener('keydown', movePlayer);
      return;
    }
    window.addEventListener('keydown', movePlayer);
    this.movementEnabled = true;
  }
}
