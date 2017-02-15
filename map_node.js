export default class MapNode {
  constructor(y, x, type) {
    this.y = y;
    this.x = x;
    this.type = type;
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

  validPos(map, pos) {
    return (pos[0] > 0 && pos[0] < map.length) &&
    (pos[1] < map[0].length && pos[1] > 0);
  }

  getNeighbors(map) {
    const neighbors = [];
    const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    dirs.forEach(dir => {
      const y = this.y + dir[0];
      const x = this.x + dir[1];
      const pos = [y, x];

      if (this.traversable(map, pos)) neighbors.push(map[y][x]);
    });

    //
    //
    // if (this.y > 0) {
    //   const north = map[this.y - 1][this.x];
    //
    //   neighbors.push(map[this.y - 1][this.x]);
    // }
    // if (this.y < map.length) {
    //   neighbors.push(map[this.y + 1][this.x]);
    // }
    // if (this.x > 0) {
    //   neighbors.push(map[this.y][this.x - 1]);
    // }
    // if (this.x < map[0].length) {
    //   neighbors.push(map[this.y][this.x + 1]);
    // }

    return neighbors;
  }
}
