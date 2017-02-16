import Room from './room';
import MapNode from './map_node';
import Path from './path';

export default class Floor {
  constructor(ctx, tileSet, mapWidth, mapHeight) {
    this.tilesLoaded = 0;
    this.tileSet = tileSet;
    this.ctx = ctx;
    this.tiles = {};
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
  }

  render() {
    this.map = this.getBackgroundMap(this.mapWidth, this.mapHeight);
    this.rooms = this.generateRooms(8, 14, 8, 14, 200, 7);
    this.paths = this.generatePaths();
    this.loadTiles(this.tileSet);
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
      this.draw();
    }
  }

  draw() {
    const w = 32, h = 32;

    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        const tile = this.map[i][j];
        if (tile.type !== 'w1') {
          this.ctx.drawImage(this.tiles.w1, j * w, i * h, w, h);
        }
        this.ctx.drawImage(this.tiles[tile.type], j * w, i * h, w, h);
        this.ctx.strokeRect(j * w, i * h, w, h);
      }
    }
  }

}
