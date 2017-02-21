import Floor from './floor';
import Enemy from './enemy';
import Player from './player';
import Hud from './hud';

export default class Game {
  constructor(playerName, canvas, ctx, tileSet) {
    this.playerName = playerName;
    this.canvas = canvas;
    this.ctx = ctx;
    this.tileSet = tileSet;
    this.movementEnabled = false;
    this.floors = 0;

    this.enterNewLevel();
  }

  enterNewLevel() {
    this.floors += 1;
    this.initNewFloor();

    if (!this.player) {
      this.resize();
      window.addEventListener('resize', this.resize.bind(this));

      this.initPlayer();
      this.initHud();
    } else {
      this.floor.spawnPlayer(this.player);
      this.hud.updateFloor(this.floor);
    }
    this.hud.addFloorEvent();
    this.floor.render();
  }

  initNewFloor() {
    this.floor = new Floor(this.floors, this.ctx, this.tileSet);
  }

  initPlayer() {
    // create a new player
    this.player = new Player(this.playerName);

    // add player to floor at random location
    this.floor.spawnPlayer(this.player);

    // enable movement by adding an event listener
    this.toggleMovement();
  }

  initHud() {
    this.hud = new Hud(this.player, this.ctx);
    this.hud.updateFloor(this.floor);
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
      this.playerAttack(nextNode);
    } else if (this.floor.validNode(nextNode)) {
      this.playerMove(nextNode);
    }

    this.floor.update();

    if (this.player.node.isHole) {
      this.enterNewLevel();
    }
  }

  playerMove(node) {
    this.player.move(node);
    this.floor.updateCameraPos();
  }

  playerAttack(node) {
    const enemyDefeated = this.player.attack(node);
    if (enemyDefeated) this.floor.removeEnemy(enemyDefeated);
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
