import Unit from './unit';

class Player extends Unit {
  constructor(name) {
    this.name = name;
    this.health = [100, 100];
    this.weapon = 'determination';
    this.experience = [0, 100];
    this.level = 1;
  }
}
