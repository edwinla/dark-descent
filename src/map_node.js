import Enemy from './enemy';
import Weapon from './weapon';

export default class MapNode {
  constructor(y, x, type) {
    this.y = y;
    this.x = x;
    this.type = type;
    this.object = null;
    this.isDoor = false;
    this.parent = null;
    this.fCost = null;
    this.gCost = null;
  }

  traversable(map, pos) {
    if (this.validPos(map, pos)) {
      const node = map[pos[0]][pos[1]];
      if (node.isDoor || node.type === 'w1') return true;
    }
    return false;
  }

  restore(item) {
    this.object = item ? item : null;
  }

  validPos(map, pos) {
    return (pos[0] > 0 && pos[0] < map.length) &&
    (pos[1] < map[0].length && pos[1] > 0);
  }

  getTraversableNeighbors(map) {
    const neighbors = [];
    const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    dirs.forEach(dir => {
      const y = this.y + dir[0];
      const x = this.x + dir[1];
      const pos = [y, x];

      if (this.traversable(map, pos)) neighbors.push(map[y][x]);
    });

    return neighbors;
  }

  isEnemyNode() {
    return (this.object instanceof Enemy);
  }

  hasItem() {
    return this.object instanceof Weapon;
  }

  allNeighbors(map) {
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [-1, -1],
      [0, -1],
    ];

    let neighbors = [];

    dirs.forEach(dir => {
      const neighbor = map[this.y + dir[0]][this.x + dir[1]];
      neighbors.push(neighbor);
    });

    return neighbors;
  }
}
