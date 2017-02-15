import Room from './room';
import MapNode from './map_node';
import Path from './path';

export default class Floor {
  constructor(canvasEl, tilesSrc, mapWidth, mapHeight) {
    this.tilesLoaded = 0;
    this.ctx = canvasEl.getContext('2d');
    this.tiles = {};
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.map = this.getBackgroundMap(mapWidth, mapHeight);
    this.rooms = this.generateRooms(8, 14, 8, 14, 200, 7);
    this.paths = this.generatePaths();

    this.loadTiles(tilesSrc);
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

  loadTiles(tilesSrc) {
    const tilesSrcKeys = Object.keys(tilesSrc);
    for (let i = 0; i < tilesSrcKeys.length; i++) {
      const tile = tilesSrcKeys[i];
      this.tiles[tile] = new Image();
      this.tiles[tile].src = tilesSrc[tile];
      this.tiles[tile].onload = () => {
        this.init(tilesSrcKeys.length);
      };
    }
  }

  init(count) {
    this.tilesLoaded++;
    if (this.tilesLoaded === count) {
      this.render();
    }
  }

  render() {
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

  draw(path) {
    const w = 32, h = 32;

    for (let i = 0; i < path.length; i++) {
      const node = path[i];
      this.ctx.drawImage(this.tiles.d5, node.x * w, node.y * h, w, h);
      this.ctx.strokeRect(node.x * w, node.y * h, w, h);
    }
  }

}
