import Unit from './unit';

export default class Player extends Unit {
  constructor(name) {
    super(name);
    this.type = 'hs';
    this.health = [100, 100];
    this.weapon = {name: 'determination', damage: 10};
    this.mana = [100, 100];
    this.level = 1;
    this.exp = [0, 100];
  }

  moveAttempt() {
    event.preventDefault();
    const pos = Object.assign({}, { x: this.node.x, y: this.node.y });

    switch (event.key) {
      case 'w':
      case 'ArrowUp':
        pos.y -= 1;
        this.type = 'hn';
        break;
      case 's':
      case 'ArrowDown':
        pos.y += 1;
        this.type = 'hs';
        break;
      case 'a':
      case 'ArrowLeft':
        pos.x -= 1;
        this.type = 'hw';
        break;
      case 'd':
      case 'ArrowRight':
        this.type = 'he';
        pos.x += 1;
    }

    return pos;
  }

  addEvent(event) {
    this.hud.updateEvents(event);
  }

  attack(enemy) {
    enemy.health[0] -= this.weapon.damage;
    let damageEvent = this.damageEvent(enemy);
    this.addEvent(damageEvent);

    if (enemy.health[0] === 0) {
      enemy.terminate();
    } else {
      this.health[0] -= enemy.weapon.damage;
      damageEvent = enemy.damageEvent(this);
      this.addEvent(damageEvent);
    }
  }

  updateHud() {
    this.hud.render();
  }


  move(nextNode) {
    nextNode.type = this.type;
    nextNode.unit = this;

    this.node.restore();
    this.node = nextNode;
  }

}
