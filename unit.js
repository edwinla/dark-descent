import {randomNumber} from './util';

export default class Unit {
  constructor(type, floor, ctx) {
    this.type = type;
    this.prevType = 'd5';
    this.floor = floor;
    this.ctx = ctx;
    this.node = this.spawn();
  }

  spawn() {
    const {x, y} = this.randomLocation();
    const node = this.floor.map[y][x];
    node.type = this.type;

    return node;
  }

  move(e) {
    e.preventDefault();

    const coord = Object.assign({}, { x: this.node.x, y: this.node.y });

    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        coord.y -= 1;
        break;
      case 's':
      case 'ArrowDown':
        coord.y += 1;
        break;
      case 'a':
      case 'ArrowLeft':
        coord.x -= 1;
        break;
      case 'd':
      case 'ArrowRight':
        coord.x += 1;
    }

    // only allow movement on ground

    const nextNode = this.floor.map[coord.y][coord.x];
    if (!this.validMovement(nextNode)) return;

    // remove unit from current node
    this.floor.drawSingle(this.prevType, { x: this.node.x, y: this.node.y });

    // save type of node before drawing
    this.prevType = nextNode.type;
    this.node = this.floor.drawSingle(this.type, coord);
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
