import Unit from './unit';

export default class Player extends Unit {
  constructor(name, type, floor) {
    super(type, floor);

    this.name = name;
    this.health = [100, 100];
    this.weapon = 'determination';
    this.experience = [0, 100];
    this.level = 1;
  }

  attackMove(e) {
    e.preventDefault();
    const coord = Object.assign({}, { x: this.node.x, y: this.node.y });

    switch (e.key) {
      case 'w':
      case 'ArrowUp':
        coord.y -= 1;
        break;
      case 's':
      case 'ArrowDown':
        coord.y += 1;
        break;
      case 'a':
      case 'ArrowLeft':
        coord.x -= 1;
        break;
      case 'd':
      case 'ArrowRight':
        coord.x += 1;
    }

    const nextNode = this.floor.map[coord.y][coord.x];
    if (!this.validMovement(nextNode)) return;

    this.move(nextNode);
  }

  move(nextNode) {
    nextNode.type = this.type;
    this.node.restoreType();
    this.node = nextNode;

    this.x = nextNode.x;
    this.y = nextNode.y;

    this.floor.cameraPos.cx = this.x;
    this.floor.cameraPos.cy = this.y;

    this.floor.update();
  }

  validMovement(node) {
    return node.type === 'd5';
  }

}
