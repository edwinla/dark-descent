import Floor from './floor';
import Partition from './partition';

const tilesSrc = {
  w1: "./assets/images/PNG/mapTile_187.png",
  d1: "./assets/images/PNG/mapTile_001.png",
  d2: "./assets/images/PNG/mapTile_002.png",
  d3: "./assets/images/PNG/mapTile_003.png",
  d4: "./assets/images/PNG/mapTile_016.png",
  d5: "./assets/images/PNG/mapTile_017.png",
  d6: "./assets/images/PNG/mapTile_018.png",
  d7: "./assets/images/PNG/mapTile_031.png",
  d8: "./assets/images/PNG/mapTile_032.png",
  d9: "./assets/images/PNG/mapTile_033.png",
};

document.addEventListener('DOMContentLoaded', () => {
  const canvasEl = document.getElementById('main');
  const partition = new Partition();
  const floor = new Floor(canvasEl, tilesSrc);
  window.floor = floor;
});
