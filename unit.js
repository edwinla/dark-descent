export default class Unit {
  constructor(name, health, weapon, type) {
    this.name = name;
    this.health = health;
    this.weapon = weapon;
    this.type = type;
  }

  spawn(node) {
    node.type = this.type;
    node.unit = this;
    this.node = node;

    return node;
  }

  damageEvent(def) {
    return (
      `${this.name} dealt ${this.weapon.damage} damage to ${def.name} using
      ${def.weapon.name}! ${def.name} health => ${def.health[0]}/${def.health[1]}`
    );
  }
}
