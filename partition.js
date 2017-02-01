import Room from './room.js';

export default class Partition {
  constructor(height = 10, width = 10, gapSize = 2, partitionNo) {
    this.height = height;
    this.width = width;
    this.gapSize = gapSize;
    this.partitionNo = partitionNo;
    const roomChance = Math.random(4);

    this.grid = roomChance > 3 ? this.createRoom() : null;
  }

  createRoom() {

    // The max dimensions of the room, where gap is on all four sides
    const roomMaxWidth = this.width - (2 * this.gapSize); // default: 6
    const roomMaxHeight = this.height - (2 * this.gapSize); // default: 6

    // Room minimum height should be at least 3 x 3
    const roomWidth = Math.floor(Math.random() * 4) + (roomMaxWidth - 3); // default 3 - 6
    const roomHeight = Math.floor(Math.random() * 4) + (roomMaxHeight - 3); // default 3 - 6

    // Random room placement that does not intrude partition gap
    const xOfPart = Math.floor(Math.random() * roomMaxWidth - roomWidth + 1); // default 0 - 3
    const yOfPart = Math.floor(Math.random() * roomMaxHeight - roomHeight + 1); // default 0 - 3

    // Place rooms
    const roomX = (this.partitionNo * this.width) + xOfPart + this.gapSize;
    const roomY = (this.partitionNo * this.height) + yOfPart + this.gapSize;


  }


}
