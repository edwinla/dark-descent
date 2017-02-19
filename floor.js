import Room from './room';
import MapNode from './map_node';
import Path from './path';

export default class Floor {
  constructor(ctx, tileSet, mapWidth = 50, mapHeight = 50) {
    this.tilesLoaded = 0;
    this.tileSet = tileSet;
    this.tSize = 64;
    this.fov = {x: 15, y: 15};
    this.ctx = ctx;
    this.tiles = {};
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.cameraPos = {cx: 0, cy: 0};
    this.initialRender = true;
    this.initialize();
  }

  initialize() {
    this.map = this.getBackgroundMap(this.mapWidth, this.mapHeight);
    this.rooms = this.generateRooms(5, 8, 5, 8, 400, 12);
    this.paths = this.generatePaths();
    this.removeGaps();
    this.generateWalls();
  }

  render() {
    if (this.initialRender) {
      this.initialRender = false;
      this.loadTiles(this.tileSet);
    } else this.update();
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
            if (this.map[i + dir[0]][j + dir[1]].type === 'd5') {
              count +=1;
              solids.push(dir);
            }
          });

          if (count > 5) {
            removed = true;
            tile.restoreType = 'd5';
            tile.type = 'd5';
          } else if (count === 5) {
            let y = 0, x = 0;

            solids.forEach(dir => {
              y += dir[0];
              x += dir[1];
            });

            if (Math.abs(y) === 3 || Math.abs(x) === 3) {
              tile.restoreType = 'd5';
              tile.type = 'd5';
            }
          }
        }
      }
    }
  }

  generateWalls() {
    const validwalls = ['wn', 'ws', 'we', 'ww', 'wnw', 'wne', 'wsw', 'wse'];
    for (let i = 1; i < this.mapHeight - 1; i++) {
      for (let j = 1; j < this.mapWidth - 1; j++) {
        const c = this.map[i][j];
        if (c.type !== 'w1') continue;

        let newtype = 'w';

        const n = this.map[i - 1][j];
        const s = this.map[i + 1][j];
        const e = this.map[i][j + 1];
        const w = this.map[i][j - 1];

        if (n.type === 'd5') newtype += 'n';
        if (s.type === 'd5') newtype += 's';
        if (e.type === 'd5') newtype += 'e';
        if (w.type === 'd5') newtype += 'w';

        if (validwalls.indexOf(newtype) !== -1) {
          c.type = newtype;
          c.restoreType = newtype;
        } else {
          c.type = 'wb';
          c.restoreType = 'wb';
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

  init(count) {
    this.tilesLoaded++;
    if (this.tilesLoaded === count) {
      this.update();
    }
  }

  calcBounds(tX, tY) {

    const fovX = Math.floor(this.fov.x / 2);
    const fovY = Math.floor(this.fov.y / 2);

    let camX, camY, fov = {};

    if (tX + fovX >= this.mapWidth) {
      camX = this.mapWidth - this.fov.x;
    } else if (tX - fovX < 0) {
      camX = 0;
    } else camX = tX - fovX;

    if (tY + fovY >= this.mapHeight) {
      camY = this.mapHeight - this.fov.y;
    } else if (tY - fovY < 0) {
      camY = 0;
    } else camY = tY - fovY;

    return {camX: camX, camY: camY};
  }

  update(direction) {
    const ts = this.tSize;
    const {cy, cx} = this.cameraPos;
    const {dy, dx} = direction || {dy: 0, dx: 0};

    const {camX, camY} = this.calcBounds(cx + dx, cy + dy);

    for (let i = 0; i < this.fov.y; i++) {
      for (let j = 0; j < this.fov.x; j++) {
        const tile = this.map[camY + i][camX + j];

        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;

        this.ctx.drawImage(this.tiles[tile.type], j * ts, i * ts, ts, ts);
        // this.ctx.strokeRect(j * ts, i * ts, ts, ts);
      }
    }

    // this.hud.render();
  }
}
