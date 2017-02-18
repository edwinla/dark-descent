export default class Hud {
  constructor(player, ctx) {
    this.player = player;
    player.hud = this;
    this.ctx = ctx;
    this.ts = 20;
    this.width = 15;
    this.height = 15;
    this.currentFloor = 1;
  }

  updateFloor(details) {
    this.currentFloor = details.floor;
    this.enemiesRemaining = details.enemyCount;
    this.boss = details.boss;

    this.render();
  }

  updateSize(ts, width, height) {
    this.ts = ts;
    this.width = width;
    this.height = height;
  }

  render() {

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.ts * this.width, this.ts);
    this.ctx.fillRect(
      0,
      (this.height - 1) * this.ts,
      this.ts * this.width,
      this.ts
    );

    this.topDisplay();
  }

  topDisplay() {
    const display = (
      `Name: ${this.player.name}  ` +
      `Health: ${this.player.health[0]}/${this.player.health[1]}  ` +
      `Mana: ${this.player.mana[0]}/${this.player.mana[1]}  ` +
      `Level: ${this.player.level}  ` +
      `Exp: ${this.player.exp[0]}/${this.player.exp[1]}  ` +
      `Weapon: ${this.player.weapon.name} (Atk: ${this.player.weapon.damage})`
    );

    this.ctx.font = `${this.ts * .3}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = 'white';

    this.ctx.fillText(
      display,
      ((this.ts * this.width) / 2),
      (this.ts / 2)
    );
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
