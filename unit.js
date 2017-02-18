import {randomNumber} from './util';

export default class Unit {
  constructor(name, health, weapon, type, floor) {
    this.name = name;
    this.health = health;
    this.weapon = weapon;
    this.type = type;
    this.floor = floor;
    this.node = this.spawn();
  }

  spawn() {
    let node;

    while (true) {
        const {x, y} = this.randomLocation();
        node = this.floor.map[y][x];

        if (this.validNode(node)) break;
    }

    this.y = node.y;
    this.x = node.x;
    node.type = this.type;
    node.unit = this;

    return node;
  }

  validNode(node) {
    return node.type === 'd5';
  }

  damageEvent(def) {
    return (
      `${this.name} dealt ${this.weapon.damage} damage to ${def.name} using
      ${def.weapon.name}! ${def.name} health => ${def.health[0]}/${def.health[1]}`
    );
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
