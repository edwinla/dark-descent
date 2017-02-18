import Unit from './unit';

export default class Player extends Unit {
  constructor(name, health, weapon, type, floor) {
    super(name, health, weapon, type, floor);

    this.mana = [100, 100];
    this.level = 1;
    this.exp = [0, 100];
  }

  attackMove(e) {
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

    const nextNode = this.floor.map[coord.y][coord.x];

    if (this.isEnemyNode(nextNode)) {
      this.attack(nextNode.unit);
      this.updateHud();
    } else if (!this.validNode(nextNode)) {
      return;
    } else {
      this.move(nextNode);
    }
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

  isEnemyNode(node) {
    return node.type === 'u2';
  }

  move(nextNode) {
    nextNode.type = this.type;
    nextNode.unit = this;
    this.node.restore();
    this.node = nextNode;

    this.x = nextNode.x;
    this.y = nextNode.y;

    this.floor.cameraPos.cx = this.x;
    this.floor.cameraPos.cy = this.y;

    this.floor.update();
  }

}
