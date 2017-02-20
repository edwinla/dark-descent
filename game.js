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

    this.enterNewLevel();
  }

  enterNewLevel() {
    this.initNewFloor();

    if (!this.player) {
      this.resize();
      window.addEventListener('resize', this.resize.bind(this));

      this.initPlayer();
      this.initHud();
    } else {
      this.floor.spawnPlayer(this.player);
    }

    this.floor.render();
  }

  initNewFloor() {
    this.floor = new Floor(this.ctx, this.tileSet);
  }

  initPlayer() {
    // create a new player
    this.player = new Player('YG');

    // add player to floor at random location
    this.floor.spawnPlayer(this.player);

    // enable movement by adding an event listener
    this.toggleMovement();
  }

  initHud() {
    this.hud = new Hud(this.player, this.ctx);
    this.floor.hud = this.hud;
  }

  resize() {
    this.floor.fov = {
      x: Math.floor(window.innerWidth / 64),
      y: Math.floor(window.innerHeight / 64)
    };
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.floor.render();
  }

  playerAction() {
    const pos = this.player.moveAttempt();
    const nextNode = this.floor.map[pos.y][pos.x];

    if (nextNode.isEnemyNode()) {
      this.player.attack(nextNode);
    } else if (!this.floor.validNode(nextNode)) {
      return;
    } else {
      this.player.move(nextNode);
      this.floor.updateCameraPos();
    }

    this.floor.update();

    if (this.player.node.isHole) {
      this.enterNewLevel();
    }
  }

  toggleMovement() {
    if (this.movementEnabled) {
      this.movementEnabled = false;
      window.removeEventListener('keydown', this.playerAction.bind(this));
      return;
    }
    window.addEventListener('keydown', this.playerAction.bind(this));
    this.movementEnabled = true;
  }
}
