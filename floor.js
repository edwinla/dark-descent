import Partition from './partition';

/*

1. A new floor instantiates with n partitions of h height and w width
2. Floor pieces the partitions together
3. Floor connects rooms together
4. Floor generates enemies, items

*/


export default class Floor {
  constructor(canvasEl, map, tilesSrc) {
    this.map = map;
    this.tilesLoaded = 0;
    this.ctx = canvasEl.getContext('2d');
    this.tiles = {};

    this.loadTiles(tilesSrc);
  }

  loadTiles(tilesSrc) {
    const tilesSrcKeys = Object.keys(tilesSrc), tiles = {};
    for (let i = 0; i < tilesSrcKeys.length; i++) {
      const tile = tilesSrcKeys[i];
      this.tiles[tile] = new Image();
      this.tiles[tile].src = tilesSrc[tile];
      this.tiles[tile].onload = () => {
        this.init(tilesSrcKeys.length);
      };
    }

    return tiles;
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
  }

  draw(x, y, tile) {
    this.ctx.drawImage(this.tiles[tile], x, y);
  }

}
