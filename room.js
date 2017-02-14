export default class Room {
  constructor(minWidth, maxWidth, minHeight, maxHeight, map) {
    this.width = this.getRandomNumber(minWidth, maxWidth);
    this.height = this.getRandomNumber(minHeight, maxHeight);
    this.map = map;
    this.absolutePosition = this.getRandomPosition(map[0].length, map.length);
    this.corners = this.getCorners();
    this.edges = this.linearizeEdges();
    this.door = null;
  }

  getRandomPosition(mapWidth, mapHeight) {
    const xUpperLimit = mapWidth - this.width - 3;
    const yUpperLimit = mapHeight - this.height - 3;
    return {
      x: this.getRandomNumber(3, xUpperLimit),
      y: this.getRandomNumber(3, yUpperLimit)
    };
  }

  generateDoorLocation() {
    this.door = this.edges[Math.floor(Math.random() * (this.edges.length + 1))];
    return this.door;
  }

  openPath() {

  }

  linearizeEdges() {
    const absX = this.absolutePosition.x, absY = this.absolutePosition.y;
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
    const absX = this.absolutePosition.x - 1,
    absY = this.absolutePosition.y - 1,
    absXLimit = absX + this.width + 1,
    absYLimit = absY + this.height + 1;

    let y = absX;
    while (y <= absYLimit) {
      let x = absX;
      while (x <= absXLimit) {
        const node = this.map[y][x];
        node.type = 'w2';

        switch (x) {
          case absX:
          case absXLimit:
            x += this.width + 1;
            break;
          default:
            x++;
        }
      }
      y++;
    }
  }

  updateNodes() {
    const absX = this.absolutePosition.x, absY = this.absolutePosition.y;
    const absXLimit = absX + this.width - 1;
    const absYLimit = absY + this.height - 1;
    for (let y = absY ; y <=  absYLimit; y++) {
      for (let x = absX ; x <= absXLimit; x++) {
        const node = this.map[y][x];
        node.type = 'd5';

        // if (y === absY) {
        //   switch (x) {
        //     case (absX):
        //       node.type = 'd1';
        //       break;
        //     case (absXLimit):
        //       node.type = 'd3';
        //       break;
        //     default:
        //       node.type = 'd2';
        //   }
        // } else if (y === absYLimit) {
        //   switch (x) {
        //     case (absX):
        //       node.type = 'd7';
        //       break;
        //     case (absXLimit):
        //       node.type = 'd9';
        //       break;
        //     default:
        //       node.type = 'd8';
        //   }
        // } else {
        //   switch (x) {
        //     case (absX):
        //       node.type = 'd4';
        //       break;
        //     case (absXLimit):
        //       node.type = 'd6';
        //       break;
        //     default:
        //       node.type = 'd5';
        //   }
        // }
      }
    }
  }

  getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getCorners() {
    // We add a gap size of '1' so that rooms are not directly touching
    // Note: Adding the height/width accounts for the gap size already
    return {
      nw: {
        x: this.absolutePosition.x - 2,
        y: this.absolutePosition.y - 2
      },
      ne: {
        x: this.absolutePosition.x + this.width + 1,
        y: this.absolutePosition.y - 2
      },
      sw: {
        x: this.absolutePosition.x - 2,
        y: this.absolutePosition.y + this.height + 1,
      },
      se: {
        x: this.absolutePosition.x + this.width + 1,
        y: this.absolutePosition.y + this.height + 1
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
