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
    this.keydownEnabled = false;
    this.floors = 0;

    this.playerAction = this.playerAction.bind(this);

    this.enterNewLevel();
  }

  enterNewLevel() {
    this.floors += 1;
    this.initNewFloor();
    this.floor.fov = {
      x: Math.floor(window.innerWidth / 64),
      y: Math.floor(window.innerHeight / 64)
    };

    if (!this.player) {
      window.addEventListener('resize', this.resize.bind(this));
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

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
    this.player = new Player(this.playerName);
    this.floor.spawnPlayer(this.player);
    this.toggleKeydown();
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
    event.preventDefault();

    if (event.code === 'Space') {
      this.playerAttack();
      return;
    } else {
      const pos = this.player.moveAttempt(event.key);
      const nextNode = this.floor.map[pos.y][pos.x];

      if (nextNode.hasItem()) {
        this.playerPickup(nextNode);
      } else if (this.floor.validNode(nextNode)) {
        this.playerMove(nextNode);
      }

      this.floor.update();

      if (this.player.node.isHole) {
        this.enterNewLevel();
      }
    }
  }

  animateBasicAttack() {
    this.toggleKeydown();
    let idx = 0, fps = 10, now, then = Date.now(), interval = 1000/fps, delta;

    (function animate() {
      const animation = requestAnimationFrame(animate.bind(this));
      now = Date.now();
      delta = now - then;

      if (delta > interval) {
        then = now - (delta % interval);
        this.floor.updateSingleTile(`cutd0${idx % 5}`);

        idx++;
        if (idx % 5 === 0) {
          cancelAnimationFrame(animation);
          this.floor.updateSingleTile('empty');
          this.toggleKeydown();
        }
      }
    }.bind(this))();
  }

  playerMove(node) {
    this.player.move(node);
    this.floor.updateCameraPos();
  }

  playerAttack() {
    this.animateBasicAttack();

    const attackNode = this.floor.getPlayerFacingNode();
    const enemy = attackNode.object;
    if (!(enemy instanceof Enemy)) return;

    debugger;

    const result = this.player.attack(enemy);

    if (result instanceof Enemy) {
      this.floor.removeEnemy(result);
      this.hud.updateEnemies(this.floor.enemies);
    } else if (result instanceof Player) {
      this.gameOver();
    }
  }

  playerPickup(node) {
    this.player.pickupItem(node.object);
    node.restore();
  }

  toggleKeydown() {
    if (this.keydownEnabled) {
      this.keydownEnabled = false;
      window.removeEventListener('keydown', this.playerAction);
      return;
    }
    window.addEventListener('keydown', this.playerAction);
    this.keydownEnabled = true;
  }

  gameOver() {
    this.toggleKeydown();
    this.hud.updateEvents('You have died.');

    const modal = document.querySelector('.modal-gameover');
    modal.style.display = 'block';

    window.onclick = function() {
      if (event.target !== modal) {
        location.reload(true);
      }
    };
  }
}
