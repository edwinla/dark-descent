export default class Room {
  constructor(minWidth, maxWidth, minHeight, maxHeight, map) {
    this.width = this.getRandomNumber(minWidth, maxWidth);
    this.height = this.getRandomNumber(minHeight, maxHeight);
    this.map = map;
    this.absolutePosition = this.getRandomPosition(map[0].length, map.length);
    this.corners = this.getCorners();
  }

  getRandomPosition(mapWidth, mapHeight) {
    const xUpperLimit = mapWidth - this.width - 1;
    const yUpperLimit = mapHeight - this.height - 1;
    return {
      x: this.getRandomNumber(1, xUpperLimit),
      y: this.getRandomNumber(1, yUpperLimit)
    };
  }

  updateNodes() {
    const absX = this.absolutePosition.x, absY = this.absolutePosition.y;
    const absXLimit = absX + this.width - 1;
    const absYLimit = absY + this.height - 1;
    for (let y = absY ; y <=  absYLimit; y++) {
      for (let x = absX ; x <= absXLimit; x++) {
        const node = this.map[y][x];
        if (y === absY) {
          switch (x) {
            case (absX):
              node.type = 'd1';
              break;
            case (absXLimit):
              node.type = 'd3';
              break;
            default:
              node.type = 'd2';
          }
        } else if (y === absYLimit) {
          switch (x) {
            case (absX):
              node.type = 'd7';
              break;
            case (absXLimit):
              node.type = 'd9';
              break;
            default:
              node.type = 'd8';
          }
        } else {
          switch (x) {
            case (absX):
              node.type = 'd4';
              break;
            case (absXLimit):
              node.type = 'd6';
              break;
            default:
              node.type = 'd5';
          }
        }
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
        x: this.absolutePosition.x - 1,
        y: this.absolutePosition.y - 1
      },
      ne: {
        x: this.absolutePosition.x + this.width,
        y: this.absolutePosition.y - 1
      },
      sw: {
        x: this.absolutePosition.x - 1,
        y: this.absolutePosition.y + this.height,
      },
      se: {
        x: this.absolutePosition.x + this.width,
        y: this.absolutePosition.y + this.height
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
