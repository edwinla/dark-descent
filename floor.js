import Room from './room';

export default class Floor {
  constructor(canvasEl, tilesSrc, mapWidth, mapHeight) {
    this.tilesLoaded = 0;
    this.ctx = canvasEl.getContext('2d');
    this.tiles = {};
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.rooms = this.generateRooms(5, 10, 5, 10, 100, 7);

    this.map = this.getBackgroundMap(mapWidth, mapHeight);

    this.loadTiles(tilesSrc);
  }

  getBackgroundMap(mapWidth, mapHeight) {
    const backgroundMap = [];
    for (let y = 0; y < mapHeight; y++) {
      const row = [];
      for (let x = 0; x < mapWidth; x++) {
        row.push('w1');
      }
      backgroundMap.push(row);
    }
    return backgroundMap;
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
        this.mapWidth,
        this.mapHeight
      );

      for (let j = 0; j < rooms.length; j++) {
        if (newRoom.collidesWith(rooms[j])) {
          continue loop1;
        }
      }

      rooms.push(newRoom);
    }

    return rooms;
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
        if (tile !== 'w1') {
          this.ctx.drawImage(this.tiles.w1, j * w, i * h, w, h);
        }
        this.ctx.drawImage(this.tiles[tile], j * w, i * h, w, h);
      }
    }

    for (let i = 0; i < this.rooms.length; i++) {
      this.rooms[i].render(this.ctx, this.tiles, w, h);
    }
  }

}
