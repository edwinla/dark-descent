import Floor from './floor';

export default class Game {
  constructor(canvas, ctx, tileSet) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.tileSet = tileSet;

    this.start();
  }

  start() {
    this.floor = new Floor(this.ctx, this.tileSet, 50, 50);
    this.floor.render();
  }

}
