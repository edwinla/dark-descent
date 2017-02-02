import Room from './room.js';

export default class Partition {
  constructor(height = 10, width = 10, gapSize = 1) {
    this.height = height;
    this.width = width;
    this.gapSize = gapSize;
    const roomChance = Math.random() * 4;

    // this.grid = this.createRoom();
    this.grid = roomChance > 2 ? this.createRoom() : this.solidPartition();
  }

  solidPartition() {
    const grid = [];

    for (let i = 0; i < this.height; i++) {
      const row = [];
      for (let j = 0; j < this.width; j++) {
        row.push('w1');
      }
      grid.push(row);
    }

    return grid;
  }

  generate(partRoomX, partRoomY, partRoomXEnd, partRoomYEnd) {
    const grid = [];

    for (let i = 0; i < this.height; i++) {
      const row = [];
      for (let j = 0; j < this.width; j++) {
        // conditionals for rendering edges of rooms
        if (
          (i >= partRoomY && i <= partRoomYEnd) &&
          (j >= partRoomX && j <= partRoomXEnd)
        ) {
          if (i === partRoomY) {
            switch (j) {
              case partRoomX:
                row.push('d1');
                break;
              case (partRoomXEnd):
                row.push('d3');
                break;
              default:
                row.push('d2');
            }
          } else if (i === partRoomYEnd) {
            switch(j) {
              case partRoomX:
                row.push('d7');
                break;
              case (partRoomXEnd):
                row.push('d9');
                break;
              default:
                row.push('d8');
            }
          } else {
            switch(j) {
              case partRoomX:
                row.push('d4');
                break;
              case (partRoomXEnd):
                row.push('d6');
                break;
              default:
                row.push('d5');
            }
          }
        }
        else {
          row.push('w1');
        }
      }
      // push the row into the grid
      grid.push(row);
    }

    return grid;
  }

  createRoom() {
    // The max dimensions of the room, where gap is on all four sides
    const roomMaxWidth = this.width - (2 * this.gapSize);
    const roomMaxHeight = this.height - (2 * this.gapSize);

    // Room minimum height should be at least 3 x 3
    const roomWidth = Math.floor(Math.random() * (roomMaxWidth - 4)) + 3;
    const roomHeight = Math.floor(Math.random() * (roomMaxHeight - 4)) + 3;

    // Random room placement that does not intrude partition gap
    const partRoomX = Math.floor(Math.random() * (roomMaxWidth - roomWidth)) + this.gapSize;
    const partRoomY = Math.floor(Math.random() * (roomMaxHeight - roomHeight)) + this.gapSize;

    // End of the room subtracts 1 because we count the initial position in size
    const partRoomXEnd = partRoomX + roomWidth - 1;
    const partRoomYEnd = partRoomY + roomHeight - 1;

    return this.generate(partRoomX, partRoomY, partRoomXEnd, partRoomYEnd);
  }


}
