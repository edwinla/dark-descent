import {randomNumber} from './util';

export default class Unit {
  constructor(type, floor, ctx) {
    this.type = type;
    this.floor = floor;
    this.ctx = ctx;

    this.spawn();
  }

  spawn() {
    const location = this.randomLocation(),
    w = 32,
    h = 32;

    this.ctx.drawImage(
      this.floor.tiles[this.type],
      location.x * w, location.y * h,
      w, h
    );
  }

  move() {
    
  }

  randomLocation() {
    const room = this.floor.rooms[randomNumber(0, this.floor.rooms.length - 1)];
    let y = randomNumber(room.absPos.y, room.absPos.y + room.height - 1);
    let x = randomNumber(room.absPos.x, room.absPos.x + room.width - 1);

    return {
      y: y,
      x: x
    };
  }


}
