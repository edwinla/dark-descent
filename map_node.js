export default class MapNode {
  constructor(yCoord, xCoord, tile) {
    this.yCoord = yCoord;
    this.xCoord = xCoord;
    this.tile = tile;
    this.parent = null;
  }

  getNeighbors(nodes) {
    const neighbors = [];
    if (this.yCoord > 0) {
      neighbors.push(nodes[this.yCoord - 1][this.xCoord]);
    }
    if (this.yCoord < nodes.length) {
      neighbors.push(nodes[this.yCoord + 1][this.xCoord]);
    }
    if (this.xCoord > 0) {
      neighbors.push(nodes[this.yCoord][this.xCoord - 1]);
    }
    if (this.xCoord < nodes[0].length) {
      neighbors.push(nodes[this.yCoord][this.xCoord + 1]);
    }

    return neighbors;
  }
}
