import {randomNumber} from './util';

export default class Unit {
  constructor(type, floor) {
    this.type = type;
    this.floor = floor;
    this.node = this.spawn();
  }

  spawn() {
    const {x, y} = this.randomLocation();
    this.y = y;
    this.x = x;
    const node = this.floor.map[y][x];
    node.type = this.type;

    return node;
  }

  validMovement(node) {
    return node.type === 'd5';
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
