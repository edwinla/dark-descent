import {randomNumber} from './util';

export default class Room {
  constructor(minWidth, maxWidth, minHeight, maxHeight, map) {
    this.width = randomNumber(minWidth, maxWidth);
    this.height = randomNumber(minHeight, maxHeight);
    this.map = map;
    this.absPos = this.getRandomPosition(map[0].length, map.length);
    this.corners = this.getCorners();
  }

  render() {
    this.edges = this.linearizeEdges();
    this.drawMain();
    this.addBuffer();
  }

  getRandomPosition(mapWidth, mapHeight) {
    const xUpperLimit = mapWidth - this.width - 3;
    const yUpperLimit = mapHeight - this.height - 3;
    return {
      x: randomNumber(3, xUpperLimit),
      y: randomNumber(3, yUpperLimit)
    };
  }

  generateDoorLocation() {
    const door = this.edges[Math.floor(Math.random() * (this.edges.length))];
    this.openPath(door);
    door.isDoor = true;
    return door;
  }

  openPath(door) {
    const coords = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    for (let i = 0; i < coords.length; i++) {
      const x = door.x + coords[i][1];
      const y = door.y + coords[i][0];
      const node = this.map[y][x];
      if (node.type === 'w2') {
        node.type = 'w1';
        return;
      }
    }
  }

  linearizeEdges() {
    const absX = this.absPos.x, absY = this.absPos.y;
    const absXLimit = absX + this.width - 1;
    const absYLimit = absY + this.height - 1;

    const edges = [];

    for (let y = absY; y <= absYLimit; y += (this.height - 1)) {
      for (let x = absX; x <= absXLimit; x++) {
        const node = this.map[y][x];
        edges.push(node);
      }
    }

    for (let y = absY + 1; y < absYLimit; y++) {
      for (let x = absX; x <= absXLimit; x += (this.width - 1)) {
        const node = this.map[y][x];
        edges.push(node);
      }
    }

    return edges;
  }

  addBuffer() {
    const absX = this.absPos.x - 1,
    absY = this.absPos.y - 1,
    absXLimit = absX + this.width + 1,
    absYLimit = absY + this.height + 1;

    let y = absY;
    while (y <= absYLimit) {
      let x = absX;
      while (x <= absXLimit) {
        const node = this.map[y][x];
        node.type = 'w2';

        switch (y) {
          case absY:
          case absYLimit:
            x++;
            break;
          default:
            x += this.width + 1;
        }
      }
      y++;
    }
  }

  drawMain() {
    const absX = this.absPos.x, absY = this.absPos.y;
    const absXLimit = absX + this.width - 1;
    const absYLimit = absY + this.height - 1;
    for (let y = absY ; y <=  absYLimit; y++) {
      for (let x = absX ; x <= absXLimit; x++) {
        const node = this.map[y][x];
        node.type = 'd5';
      }
    }
  }

  getCorners() {
    return {
      nw: {
        x: this.absPos.x - 2,
        y: this.absPos.y - 2
      },
      ne: {
        x: this.absPos.x + this.width + 1,
        y: this.absPos.y - 2
      },
      sw: {
        x: this.absPos.x - 2,
        y: this.absPos.y + this.height + 1,
      },
      se: {
        x: this.absPos.x + this.width + 1,
        y: this.absPos.y + this.height + 1
      }
    };
  }

  collidesWith(room) {
    const {nw, ne, sw, se} = this.corners;
    return (
      (nw.x <= room.corners.ne.x && ne.x >= room.corners.nw.x) &&
      (nw.y <= room.corners.sw.y && sw.y >= room.corners.nw.y)
    );
  }
}
