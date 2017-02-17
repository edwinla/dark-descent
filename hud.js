export default class Hud {
  constructor(player, ctx) {
    this.player = player;
    player.hud = this;
    this.ctx = ctx;
    this.ts = 20;
    this.length = 15;
  }

  updateSize(ts, length) {
    this.ts = ts;
    this.length = length;
  }

  render() {

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.ts * this.length, this.ts);

    this.ctx.font = `${this.ts * .3}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(
      this.display(),
      ((this.ts * this.length) / 2),
      (this.ts / 2)
    );

    // for (let j = 0; j < this.length; j++) {
    //     this.ctx.fillRect(j * ts, 0, ts, ts);
    //     this.ctx.fillStyle = 'white';
    //     this.ctx.font="30px Arial";
    //     this.ctx.fillText('TEST TEST TEST', j * this.ts, this.ts);
    // }
  }

  display() {
    return (
      `Name: ${this.player.name}  ` +
      `Health: ${this.player.health[0]}/${this.player.health[1]}  ` +
      `Mana: ${this.player.mana[0]}/${this.player.mana[1]}  ` +
      `Level: ${this.player.level}  ` +
      `Exp: ${this.player.exp[0]}/${this.player.exp[1]}  ` +
      `Weapon: ${this.player.weapon.name} (Atk: ${this.player.weapon.damage})`
    );
  }
}
