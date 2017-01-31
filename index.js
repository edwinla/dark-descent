class Board {
  constructor(canvasId, map, tilesSrc) {
    this.map = map;
    this.tiles = this.initTiles(tilesSrc);
    this.tilesLoaded = 0;
    this.ctx = document.getElementById(canvasId).getContext('2d');
  }

  initTiles(tilesSrc) {
    const tilesSrcKeys = Object.keys(tilesSrc), tiles = {};
    for (let i = 0; i < tilesSrcKeys.length; i++) {
      const tile = tilesSrcKeys[i];
      tiles[tile] = new Image();
      tiles[tile].src = tilesSrc[tile];
    }

    return tiles;
  }

  loadTiles() {
    const tilesSrcKeys = Object.keys(this.tilesSrc);
    for (let i = 0; i < tilesSrcKeys.length; i++) {
      const tile = tilesSrcKeys[i];
      this.tiles[tile] = new Image();
      this.tiles[tile].src = this.tilesSrc[tile];
      this.tiles[tile].onload = () => {
        this.tilesLoaded++;
        if (this.tilesLoaded === this.tilesSrc.length) {
          this.render();
        }
      };
    }
  }

  render() {
    const w = 64, h = 64;

    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        const tile = this.map[i][j];
        if (tile) {
          this.ctx.drawImage(this.tiles[tile], j * w, i * h);
        }
      }
    }
  }

  draw(x, y, tile) {
    this.ctx.drawImage(this.tiles[tile], x, y);
  }

}

const tilesSrc = {
  w1: "./assets/images/PNG/mapTile_187.png",
  d1: "./assets/images/PNG/mapTile_001.png",
  d2: "./assets/images/PNG/mapTile_002.png",
  d3: "./assets/images/PNG/mapTile_003.png",
  d4: "./assets/images/PNG/mapTile_016.png",
  d5: "./assets/images/PNG/mapTile_017.png",
  d6: "./assets/images/PNG/mapTile_018.png",
  d7: "./assets/images/PNG/mapTile_031.png",
  d8: "./assets/images/PNG/mapTile_032.png",
  d9: "./assets/images/PNG/mapTile_033.png",
};

const map = [
  ['w1','w1','w1','w1','w1'],
  ['w1','d1','d2','d3','w1'],
  ['w1','d4','d5','d6','w1'],
  ['w1','d7','d8','d9','w1'],
  ['w1','w1','w1','w1','w1']
];

window.tilesSrc = tilesSrc;
window.map = map;
window.Board = Board;
