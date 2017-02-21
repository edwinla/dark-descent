import Unit from './unit';

export default class Enemy extends Unit {
  constructor(name, hp, weap, type) {
    super(name, hp, weap, type);
  }

  terminate() {
    this.node.restore();
    return this;
  }

}
