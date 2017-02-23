import Unit from './unit';
import Weapon from './weapon';

export default class Enemy extends Unit {
  constructor(name, hp, weap, type, num) {
    super(name, hp, weap, type);

    this.generateItem(num);
  }

  generateItem(num) {
    if (Math.random() * 10  > 9) {
      this.item = new Weapon(num);
    } else return null;
  }

  terminate() {
    this.node.restore(this.item);
    this.node = null;
    return this;
  }
}
