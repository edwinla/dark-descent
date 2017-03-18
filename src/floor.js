import Room from './room';
import MapNode from './map_node';
import Path from './path';
import Enemy from './enemy';
import Player from './player';
import {randomNumber} from './util';


export default class Floor {
  constructor(num, ctx, tileSet, mapWidth = 50, mapHeight = 50) {
    this.number = num;
    this.tilesLoaded = 0;
    this.tileSet = tileSet;
    this.tSize = 64;
    this.fov = {x: 15, y: 15};
    this.ctx = ctx;
    this.tiles = {};
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.cameraPos = {cx: 0, cy: 0};
    this.enemies = [];
    this.initialRender = true;
    window.updateSingleTile = this.updateSingleTile.bind(this);
    this.initialize();
  }

  initialize() {
    this.map = this.getBackgroundMap(this.mapWidth, this.mapHeight);
    this.rooms = this.generateRooms(5, 8, 5, 8, 400, 12);
    this.paths = this.generatePaths();
    this.removeGaps();
    this.generateWalls();
    this.placeHole();
    this.spawnEnemies(20);
  }

  render() {
    if (this.initialRender) {
      this.initialRender = false;
      this.loadTiles(this.tileSet);
    } else this.update();
  }

  init(count) {
    this.tilesLoaded++;
    if (this.tilesLoaded === count) {
      this.update();
    }
  }

  updateSingleTile(type) {
    const ts = this.tSize;
    const diff = { x: 0, y:0 };
    const {cx, cy} = this.cameraPos;

    switch (this.player.type) {
      case 'hn':
        diff.y = -1;
        break;
      case 'hs':
        diff.y = 1;
        break;
      case 'hw':
        diff.x = -1;
        break;
      case 'he':
        diff.x = 1;
        break;
    }

    const posX = this.playerCanvasPos.x + diff.x;
    const posY = this.playerCanvasPos.y + diff.y;

    const tile = this.map[cy + diff.y][cx + diff.x];

    this.ctx.clearRect(posX*ts, posY*ts, ts, ts);
    this.ctx.drawImage(this.tiles[tile.type], posX*ts, posY*ts, ts, ts);
    if (tile.object) {
      this.ctx.drawImage(this.tiles[tile.object.type], posX*ts, posY*ts, ts, ts);
    }
    this.ctx.drawImage(this.tiles[type], posX*ts, posY*ts, ts, ts);
  }

  update() {
    const ts = this.tSize;
    const {camX, camY} = this.calcBounds();

    this.drawOuterBounds();

    for (let i = 0; i < this.fov.y; i++) {
      for (let j = 0; j < this.fov.x; j++) {
        const tile = this.map[camY + i][camX + j];
        const xPos = j * ts;
        const yPos = i * ts;

        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.clearRect(xPos, yPos, ts, ts);

        if (tile.object instanceof Player) {
          this.playerCanvasPos = {x: j, y: i};
        }

        if (tile.object || tile.isHole) {
          this.ctx.drawImage(this.tiles.cb, xPos, yPos, ts, ts);

          if (tile.isHole) this.ctx.drawImage(this.tiles.ch, xPos, yPos, ts, ts);
          if (tile.object) this.ctx.drawImage(this.tiles[tile.object.type], xPos, yPos, ts, ts);
        } else {
          this.ctx.drawImage(this.tiles[tile.type], xPos, yPos, ts, ts);
        }

        this.darken(tile, xPos, yPos, ts);
      }
    }

  }

  drawOuterBounds() {
    const ts = this.tSize;

    for (let i = 0; i < window.innerHeight / ts; i++) {
      for (let j = 0; j < window.innerWidth / ts; j++) {
        const xPos = j * ts;
        const yPos = i * ts;
        this.ctx.drawImage(this.tiles.wb, xPos, yPos, ts, ts);
        this.darken(this.tiles.wb, xPos, yPos, ts);
      }
    }
  }

  calcBounds() {
    const {cx, cy} = this.cameraPos;
    const fovX = Math.floor(this.fov.x / 2);
    const fovY = Math.floor(this.fov.y / 2);

    let camX, camY, fov = {};

    if (cx + fovX >= this.mapWidth) {
      camX = this.mapWidth - this.fov.x;
    } else if (cx - fovX < 0) {
      camX = 0;
    } else camX = cx - fovX;

    if (cy + fovY >= this.mapHeight) {
      camY = this.mapHeight - this.fov.y;
    } else if (cy - fovY < 0) {
      camY = 0;
    } else camY = cy - fovY;

    return {camX: camX, camY: camY};
  }

  darken(tile, xPos, yPos, ts) {
    const xDiff = Math.abs(this.cameraPos.cx - tile.x);
    const yDiff = Math.abs(this.cameraPos.cy - tile.y);
    let alpha = 0.75;

    this.ctx.fillStyle = 'black';
    if (yDiff === 5 && xDiff <= 1) {
      alpha = 0.15;
    } else if (yDiff === 4 && xDiff <= 2) {
      alpha = xDiff < 2 ? 0 : 0.15;
    } else if (yDiff === 3 && xDiff <= 3) {
      alpha = xDiff < 3 ? 0 : 0.15;
    } else if (yDiff === 2 && xDiff <= 4) {
      alpha = xDiff < 4 ? 0 : 0.15;
    } else if (yDiff <= 1 && xDiff <= 5) {
      alpha = xDiff < 5 ? 0 : 0.15;
    }

    this.ctx.globalAlpha = alpha;
    this.ctx.fillRect(xPos, yPos, ts, ts);
    this.ctx.globalAlpha = 1;

  }

  loadTiles(tileSet) {
    const tileSetKeys = Object.keys(tileSet);
    for (let i = 0; i < tileSetKeys.length; i++) {
      const tile = tileSetKeys[i];
      this.tiles[tile] = new Image();
      this.tiles[tile].src = tileSet[tile];
      this.tiles[tile].onload = () => {
        this.init(tileSetKeys.length);
      };
    }
  }

  getBackgroundMap(mapWidth, mapHeight) {
    const backgroundMap = [];
    for (let y = 0; y < mapHeight; y++) {
      const row = [];
      for (let x = 0; x < mapWidth; x++) {
        const newMapNode = new MapNode(y, x, 'w1');
        row.push(newMapNode);
      }
      backgroundMap.push(row);
    }
    return backgroundMap;
  }

  removeGaps() {
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];

    let removed = true;

    while (removed) {
      removed = false;
      for (let i = 1; i < this.mapHeight - 1; i++) {
        for (let j = 1; j < this.mapWidth - 1; j++) {
          const tile = this.map[i][j];
          if (tile.type !== 'w1') continue;

          let count = 0, n = 0, s = 0, e = 0, w = 0, solids = [];

          dirs.forEach(dir => {
            if (this.map[i + dir[0]][j + dir[1]].type === 'cb') {
              count +=1;
              solids.push(dir);
            }
          });

          if (count > 5) {
            removed = true;
            tile.type = 'cb';
          } else if (count === 5) {
            let y = 0, x = 0;

            solids.forEach(dir => {
              y += dir[0];
              x += dir[1];
            });

            if (Math.abs(y) === 3 || Math.abs(x) === 3) {
              tile.type = 'cb';
            }
          }
        }
      }
    }
  }

  generateWalls() {
    const validwalls = ['wn', 'ws', 'we', 'ww', 'wnw', 'wne', 'wsw', 'wse'];
    for (let i = 0; i < this.mapHeight; i++) {
      for (let j = 0; j < this.mapWidth; j++) {
        const c = this.map[i][j];

        if (i === 0 || i === this.mapHeight - 1 || j === 0 || j === this.mapWidth - 1) {
          c.type = 'wb';
          continue;
        }

        if (c.type !== 'w1') continue;

        let newtype = 'w';

        const n = this.map[i - 1][j];
        const s = this.map[i + 1][j];
        const e = this.map[i][j + 1];
        const w = this.map[i][j - 1];

        if (n.type === 'cb') newtype += 'n';
        if (s.type === 'cb') newtype += 's';
        if (e.type === 'cb') newtype += 'e';
        if (w.type === 'cb') newtype += 'w';

        if (validwalls.indexOf(newtype) !== -1) {
          c.type = newtype;
        } else {
          c.type = 'wb';
        }
      }
    }
  }

  generateRooms(minWidth, maxWidth, minHeight, maxHeight, attempts, maxRooms) {
    const rooms = [];
    let i = 0;

    loop1:
    while (rooms.length < maxRooms && i < attempts) {
      i++;

      const newRoom = new Room(
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        this.map
      );

      for (let j = 0; j < rooms.length; j++) {
        if (newRoom.collidesWith(rooms[j])) {
          continue loop1;
        }
      }

      newRoom.render();
      rooms.push(newRoom);
    }
    return rooms;
  }

  generatePaths() {
    const paths = [];
    for (let i = 0; i < this.rooms.length - 1; i++) {
      const door1 = this.rooms[i].generateDoorLocation();
      const door2 = this.rooms[i + 1].generateDoorLocation();
      const path = new Path(door1, door2, this.map);
      paths.push(path);
    }

    paths.forEach(path => path.render());

    return paths;
  }

  placeHole() {
    let holeNode = null;

    while (!holeNode) {
      const pos = this.randomLocation();
      const node = this.map[pos.y][pos.x];

      if (node.type === 'cb') holeNode = node;
    }

    holeNode.isHole = true;

    this.hole = holeNode;
  }

  randomLocation() {
    let node;

    do {
      const room = this.rooms[randomNumber(0, this.rooms.length - 1)];
      let y = randomNumber(room.absPos.y, room.absPos.y + room.height - 1);
      let x = randomNumber(room.absPos.x, room.absPos.x + room.width - 1);

      node = this.map[y][x];
    } while (!this.validNode(node));

    return node;
  }

  removeEnemy(enemy) {
    const enemyIdx = this.enemies.indexOf(enemy);
    this.enemies.splice(enemyIdx, 1);
  }

  spawnEnemies(n) {
    const weapon = {
      name: "maul",
      damage: 5
    };

    for (let i = 0; i < n; i++) {
      const monsterhp = this.number * 20;
      const monsterweap = {
        name: 'maul',
        damage: 4 * this.number
      };
      const enemy = new Enemy(
        'monster',
        [monsterhp, monsterhp],
        monsterweap,
        `m${this.number % 24}`,
        this.number
      );

      const node = this.randomLocation();

      enemy.spawn(node);

      this.enemies.push(enemy);
    }
  }

  spawnPlayer(player) {
    player.spawn(this.randomLocation());
    this.player = player;

    this.updateCameraPos();
  }

  getPlayerFacingNode() {
    const {cx, cy} = this.cameraPos;
    const diff = { x: 0, y:0 };

    switch (this.player.type) {
      case 'hn':
        diff.y = -1;
        break;
      case 'hs':
        diff.y = 1;
        break;
      case 'hw':
        diff.x = -1;
        break;
      case 'he':
        diff.x = 1;
        break;
    }

    return this.map[cy + diff.y][cx + diff.x];
  }

  updateCameraPos() {
    const node = this.player.node;
    this.cameraPos = Object.assign({}, {cx: node.x, cy: node.y});
  }

  validNode(node) {
    return node.type === 'cb' && (!node.object || node.isHole);
  }
}
