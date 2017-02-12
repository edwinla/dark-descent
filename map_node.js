export default class MapNode {
  constructor(y, x, type) {
    this.y = y;
    this.x = x;
    this.type = type;
    this.parent = null;
  }

  getNeighbors(nodes) {
    const neighbors = [];
    if (this.y > 0) {
      neighbors.push(nodes[this.y - 1][this.x]);
    }
    if (this.y < nodes.length) {
      neighbors.push(nodes[this.y + 1][this.x]);
    }
    if (this.x > 0) {
      neighbors.push(nodes[this.y][this.x - 1]);
    }
    if (this.x < nodes[0].length) {
      neighbors.push(nodes[this.y][this.x + 1]);
    }

    return neighbors;
  }
}
