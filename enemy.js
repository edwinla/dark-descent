import Unit from './unit';

export default class Enemy extends Unit {
  constructor(name, health, weapon, type) {
    super(name, health, weapon, type);
  }

  terminate() {
    console.log(`${this.name} has been slain!`);
    const selfId = this.floor.enemies.indexOf(this);
    this.floor.enemies.splice(selfId, 1);
    this.node.restore();
    this.floor.update();
  }

}
