export default class MapNode {
  constructor(y, x, type) {
    this.y = y;
    this.x = x;
    this.type = type;
    this.isDoor = false;
    this.parent = null;
    this.fCost = null;
  }

  traversable(map) {
    const indices = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 0],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [1, 1]
    ];

    if (this.isDoor) return true;
    if (this.type !== 'w1') return false;
  }

  getNeighbors(map) {
    const neighbors = [];
    if (this.y > 0) {
      neighbors.push(map[this.y - 1][this.x]);
    }
    if (this.y < map.length) {
      neighbors.push(map[this.y + 1][this.x]);
    }
    if (this.x > 0) {
      neighbors.push(map[this.y][this.x - 1]);
    }
    if (this.x < map[0].length) {
      neighbors.push(map[this.y][this.x + 1]);
    }

    return neighbors;
  }
}
