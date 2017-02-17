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
    } else if (!this.validNode(nextNode)) {
      return;
    } else {
      this.move(nextNode);
    }
  }

  attack(enemy) {
    enemy.health[0] -= this.weapon.damage;
    console.log(`You dealt ${this.weapon.damage} to ${enemy.name} using ${this.weapon.name}!`);
    console.log(`${enemy.name} health: ${enemy.health[0]}/${enemy.health[1]}`);
    if (enemy.health[0] <= 0) {
      enemy.terminate();
    } else {
      this.health[0] -= enemy.weapon.damage;
      console.log(`${enemy.name} struck you for ${enemy.weapon.damage} HP.`);
      console.log(`Your health: ${this.health[0]}/${this.health[1]}`);
    }

    this.updateHud();
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
