import Unit from './unit';

export default class Enemy extends Unit {
  constructor(name, hp, weap, type) {
    super(name, hp, weap, type);
  }

  terminate() {
    console.log(`${this.name} has been slain!`);
    this.node.restore();
    return this;
  }

}
