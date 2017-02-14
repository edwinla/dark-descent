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

    // A traversable tile must be water/solid rock, the only exception is if
    // the tile is a door.

    if (this.isDoor) return true;
    if (this.type !== 'w1') return false;

    // To prevent the door from moving too close to other rooms we want to have
    // a sufficient boundary in between.

    let doors = 0, boundaries = 0;

    for (let i = 0; i < indices.length; i++) {
      const neighbor = map[indices[i][0]][indices[i][1]];
      if (neighbor.isDoor) doors += 1;
      if (neighbor.type !== 'w1') boundaries += 1;
    }

    return (boundaries === 0) || (boundaries < 4 && doors === 1);
  }

  isValidIndex(map, indices) {
    const yCoord = this.y + indices[0];
    const xCoord = this.x + indices[1];
    return (yCoord > 0 && yCoord < map.length) &&
            (xCoord > 0 && xCoord < map[0].length);
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
