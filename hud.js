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
      'floor'
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
    this.enemiesRemaining = floor.enemies.length;
    // this.boss = floor.boss;
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

  updateEvents(event) {
    const eventsNode = document.getElementById('events');
    const span = document.createElement('span');
    const text = document.createTextNode(event);
    span.appendChild(text);
    eventsNode.appendChild(span);
    eventsNode.scrollTop = eventsNode.scrollHeight;
  }

}
