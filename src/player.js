import Unit from './unit';
import Weapon from './weapon';

export default class Player extends Unit {
  constructor(name) {
    super(name);
    this.type = 'hs';
    this.hp = [100, 100];
    this.weap = new Weapon(0);
    this.lvl = 1;
    this.xp = 0;
  }

  moveAttempt(eventKey) {
    const pos = Object.assign({}, { x: this.node.x, y: this.node.y });

    switch (eventKey) {
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
    this.damages(enemy);

    this.hud.addBattleEvent(this, enemy);

    if (enemy.hp[0] === 0) {
      this.xpGainedFrom(enemy);
      return enemy.terminate();
    } else {
      enemy.damages(this);

      this.hud.addBattleEvent(enemy, this);
      this.updateHud('hp');

      if (this.hp[0] === 0) return this;
    }
  }

  xpGainedFrom(enemy) {
    const xpGained = (enemy.hp[1] / 2) + enemy.weap.damage;
    this.xp += xpGained;

    this.updateHud('xp', enemy);
    this.hud.addXPEvent(xpGained, enemy);

    if (this.xpTnl()) this.lvlUp();
  }

  xpTnl() {
    return this.xp >= (this.lvl * 100);
  }

  lvlUp() {
    this.lvl += 1;
    this.xp = 0;
    this.hp = [(this.lvl * 100), (this.lvl * 100)];

    this.updateHud('xp');
    this.updateHud('lvl');
    this.updateHud('hp');
    this.hud.addLvlUpEvent();
  }

  pickupItem(item) {
    if (item instanceof Weapon) {
      this.weap = item;
    }

    this.updateHud('weap');
    this.hud.addItemPickupEvent(item);
  }

  updateHud(attr) {
    this.hud.updatePlayer(attr);
  }

  move(nextNode) {
    nextNode.object = this;

    this.node.restore();
    this.node = nextNode;
  }

}
