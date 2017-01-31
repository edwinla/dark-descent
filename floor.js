import Room from './room';
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
    this.tiles = this.initTiles(tilesSrc);
    this.tilesLoaded = 0;
    this.ctx = canvasEl.getContext('2d');
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
