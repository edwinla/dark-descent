import Unit from './unit';

export default class Player extends Unit {
  constructor(name) {
    super(name);
    this.type = 'hs';
    this.hp = [100, 100];
    this.weap = {name: 'iron sword', damage: 15};
    this.mana = [100, 100];
    this.lvl = 1;
    this.xp = 0;
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

    this.node.type = this.type;

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
      this.xpGainedFrom(enemy);
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

  xpGainedFrom(enemy) {
    const xpGained = (enemy.hp[1] / 2) + enemy.weap.damage;
    this.xp += xpGained;
    this.updateHud('xp');

    if (this.xpTnl()) this.lvlUp();
  }

  xpTnl() {
    return this.xp >= ((this.lvl + 1) * 100);
  }

  lvlUp() {
    this.lvl += 1;
    this.hp = [(this.lvl * 100), (this.lvl * 100)];

    this.updateHud('xp');
    this.updateHud('lvl');
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
