export default class Hud {
  constructor(player, ctx) {
    this.player = player;
    player.hud = this;
    this.ctx = ctx;
    this.currentFloor = 0;
    this.events = [];
    this.classes = [
      'name',
      'lvl',
      'xp',
      'hp',
      'mana',
      'weap',
      'events',
      'floor-num',
      'remain'
    ];

    this.initialize();
  }

  initialize() {
    for (let i = 0; i < this.classes.length; i++) {
      const clss = this.classes[i];
      this[clss + 'DOM'] = document.querySelector(`.${clss}`);

      if (i < 6) this.updatePlayer(clss);
    }
  }

  updateFloor(floor) {
    this.currentFloor += 1;
    this['floor-numDOM'].firstChild.nodeValue = this.currentFloor;

    this.updateEnemies(floor.enemies);
  }

  updateEnemies(enemies) {
    this.enemiesRemaining = enemies.length;
    this['remainDOM'].firstChild.nodeValue = this.enemiesRemaining;
  }

  updatePlayer(attr) {
    const value = this.player[attr];
    switch (attr) {
      case 'name':
      case 'lvl':
      case 'xp':
        this[attr + 'DOM'].firstChild.nodeValue = value;
        break;
      case 'hp':
      case 'mana':
        this[attr + 'DOM'].firstChild.nodeValue = `${value[0]} / ${value[1]}`;
        break;
      case 'weap':
        this[attr + 'DOM'].firstChild.nodeValue = value.name;
    }
  }

  addBattleEvent(off, def) {
    const event = `${off.name} dealt ${off.weap.damage} to ${def.name}!`;
    this.updateEvents(event);
  }

  addXPEvent(xp, enemy) {
    const event = `You gained ${xp}xp from slaying ${enemy.name}.`;
    this.updateEvents(event);
  }

  addLvlUpEvent() {
    const currentlvl = this.player.lvl;
    const event = `You lvled up from ${currentlvl - 1} to ${currentlvl}`;
    this.updateEvents(event);
  }

  addFloorEvent() {
    let event = `You descend into the dungeon...`;
    if (this.currentFloor > 1) {
      event = `You fall down a hole, deeper into the dungeon.`;
    }
    this.updateEvents(event);
  }

  addItemPickupEvent(item) {
    const event = `You have found a(n) ${item.name}!`;
    this.updateEvents(event);
  }

  updateEvents(event) {
    this.events.push(event);

    const eventsNode = document.querySelector('.events');
    const span = document.createElement('span');
    const text = document.createTextNode(event);

    span.appendChild(text);
    eventsNode.insertBefore(span, eventsNode.firstChild);

    if (eventsNode.childNodes.length > 5) {
      eventsNode.removeChild(eventsNode.lastChild);
    }
  }
}
