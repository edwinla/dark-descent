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
  }

  start() {
    this.floor.render();
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
