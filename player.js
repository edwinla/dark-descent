import Unit from './unit';

export default class Player extends Unit {
  constructor(name) {
    super(name);
    this.type = 'hs';
    this.hp = [100, 100];
    this.weap = {name: 'determination', damage: 10};
    this.mana = [100, 100];
    this.lvl = 1;
    this.xp = [0, 100];
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

  attack(node) {
    const enemy = node.unit;
    enemy.hp[0] -= this.weap.damage;
    console.log(enemy.hp);
    // let damageEvent = this.damageEvent(enemy);
    // this.addEvent(damageEvent);

    if (enemy.hp[0] === 0) {
      return enemy.terminate();
    } else {
      this.hp[0] -= enemy.weap.damage;
      console.log(this.hp);

      this.updateHud('hp');
      return false;
      // damageEvent = enemy.damageEvent(this);
      // this.addEvent(damageEvent);
    }

  }

  updateHud(attr) {
    this.hud.updatePlayer(attr);
  }

  move(nextNode) {
    nextNode.type = this.type;
    nextNode.unit = this;

    this.node.restore();
    this.node = nextNode;
  }

}
