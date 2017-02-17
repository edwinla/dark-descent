import Room from './room';
import MapNode from './map_node';
import Path from './path';

export default class Floor {
  constructor(ctx, tileSet, tSize, mapWidth = 50, mapHeight = 50) {
    this.tilesLoaded = 0;
    this.tileSet = tileSet;
    this.tSize = tSize;
    this.fov = {x: 15, y: 15};
    this.ctx = ctx;
    this.tiles = {};
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.cameraPos = {cx: 0, cy: 0};
    this.initialRender = true;
    this.map = this.getBackgroundMap(this.mapWidth, this.mapHeight);
    this.rooms = this.generateRooms(8, 14, 8, 14, 200, 7);
    this.paths = this.generatePaths();
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

  generateRooms(minWidth, maxWidth, minHeight, maxHeight, attempts, maxRooms) {
    const rooms = [];
    let i = 0;

    loop1:
    while (rooms.length < 7 && i < attempts) {
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
        if (tile.type !== 'w1') {
          this.ctx.drawImage(this.tiles.w1, j * ts, i * ts, ts, ts);
        }
        this.ctx.drawImage(this.tiles[tile.type], j * ts, i * ts, ts, ts);
        this.ctx.strokeRect(j * ts, i * ts, ts, ts);
      }
    }

    this.hud.render();
  }
}
