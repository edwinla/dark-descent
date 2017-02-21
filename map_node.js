import Enemy from './enemy';

export default class MapNode {
  constructor(y, x, type) {
    this.y = y;
    this.x = x;
    this.type = type;
    this.restoreType = type;
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

  restore() {
    this.unit = null;
    this.type = this.restoreType;
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
    return (this.unit instanceof Enemy);
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
