export default class MapNode {
  constructor(y, x, type) {
    this.y = y;
    this.x = x;
    this.type = type;
    this.isDoor = false;
    this.parent = null;
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

    let doors = 0, boundaries = 0;

    for (let i = 0; i < indices.length; i++) {
      const neighbor = map[indices[i][0]][indices[i][1]];
      if (neighbor.door) doors += 1;
      if (neighbor.type !== 'w1') boundaries += 1;
    }

    return (boundaries === 0) || (boundaries < 4 && doors === 1);
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
