import Floor from './floor';
import Unit from './unit';

export default class Game {
  constructor(canvas, ctx, tileSet) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.tSize = 20;
    this.tileSet = tileSet;
    this.floor = new Floor(ctx, tileSet, this.tSize, {x: 15, y: 15}, 50, 50);
    this.player = new Unit('u1', this.floor, ctx);
    this.floor.cameraPos = {
      cx: this.player.x,
      cy: this.player.y
    };
    this.movementEnabled = false;

    this.start();
    this.toggleMovement();
    window.addEventListener('resize', this.resize.bind(this));
  }

  start() {
    this.resize();
  }

  resize() {
    let ts, fov = {};

    if (window.innerWidth > window.innerHeight) {
      ts = Math.floor(window.innerWidth / 15);
      fov.x = 15;

      let tempY = Math.floor(window.innerHeight / ts);

      if (tempY < 7) {
        fov.y = 7;
      } else if (tempY % 2 === 0) {
        fov.y = tempY - 1;
      } else fov.y = tempY;

    } else {
      ts = Math.floor(window.innerHeight / 15);
      fov.y = 15;

      let tempX = Math.floor(window.innerWidth / ts);

      if (tempX < 7) {
        fov.x = 7;
      } else if (tempX % 2 === 0) {
        fov.x = tempX - 1;
      } else fov.x = tempX;

    }

    this.canvas.width = ts * fov.x;
    this.canvas.height = ts * fov.y;

    this.floor.tSize = ts;
    this.floor.fov = fov;

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
