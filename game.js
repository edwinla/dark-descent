import Floor from './floor';
import Enemy from './enemy';
import Player from './player';
import Hud from './hud';

export default class Game {
  constructor(canvas, ctx, tileSet) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.tileSet = tileSet;
    this.movementEnabled = false;
    this.start();
  }

  start() {
    this.initNewFloor();
    this.initPlayer();
    this.spawnEnemies(10);
    this.initHud();
    this.floor.hud = this.hud;

    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
  }

  initNewFloor() {
    this.floor = new Floor(this.ctx, this.tileSet);
  }

  initPlayer() {
    const health = [100, 100];
    const weapon = {
      name: 'determination',
      damage: 10
    };
    this.player = new Player('YG', health, weapon, 'hs', this.floor);
    this.floor.cameraPos = {
      cx: this.player.x,
      cy: this.player.y
    };

    this.toggleMovement();
  }

  initHud() {
    this.hud = new Hud(this.player, this.ctx);
  }

  spawnEnemies(n) {
    const enemies = [];
    const weapon = {
      name: "swipe",
      damage: "5"
    };
    for (let i = 0; i < n; i++) {
      const enemy = new Enemy('Warden', [50, 50], weapon, 'u2', this.floor);
      enemies.push(enemy);
    }
    this.floor.enemies = enemies;
  }

  resize() {
    this.floor.fov = {
      x: Math.floor(window.innerWidth / 64),
      y: Math.floor(window.innerHeight / 64)
    };
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    const canvas = document.getElementById("main");

    canvas.style.justifyContent = 'center';

    // this.hud.updateSize(ts, fov.x, fov.y);
    this.floor.render();
  }

  // resize() {
  //   let ts, fov = {};
  //
  //   if (window.innerWidth > window.innerHeight) {
  //     ts = Math.floor(window.innerWidth / 15);
  //     fov.x = 15;
  //
  //     let tempY = Math.floor(window.innerHeight / ts);
  //
  //     if (tempY < 7) {
  //       fov.y = 7;
  //     } else if (tempY % 2 === 0) {
  //       fov.y = tempY - 1;
  //     } else fov.y = tempY;
  //
  //   } else {
  //     ts = Math.floor(window.innerHeight / 15);
  //     fov.y = 15;
  //
  //     let tempX = Math.floor(window.innerWidth / ts);
  //
  //     if (tempX < 7) {
  //       fov.x = 7;
  //     } else if (tempX % 2 === 0) {
  //       fov.x = tempX - 1;
  //     } else fov.x = tempX;
  //
  //   }
  //
  //   this.canvas.width = ts * fov.x;
  //   this.canvas.height = ts * fov.y;
  //
  //   this.floor.tSize = ts;
  //   this.floor.fov = fov;
  //
  //   this.hud.updateSize(ts, fov.x, fov.y);
  //   this.floor.render();
  // }

  toggleMovement() {
    const movePlayer = this.player.attackMove.bind(this.player);

    if (this.movementEnabled) {
      this.movementEnabled = false;
      window.removeEventListener('keydown', movePlayer);
      return;
    }
    window.addEventListener('keydown', movePlayer);
    this.movementEnabled = true;
  }
}
