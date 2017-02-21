export default class Unit {
  constructor(name, hp, weap, type) {
    this.name = name;
    this.hp = hp;
    this.weap = weap;
    this.type = type;
  }

  spawn(node) {
    node.type = this.type;
    node.unit = this;
    this.node = node;

    return node;
  }

  damages(enemy) {
    enemy.hp[0] -= this.weap.damage;
    if (enemy.hp[0] < 0) enemy.hp[0] = 0;
  }
}
