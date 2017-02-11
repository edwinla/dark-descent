import Floor from './floor';
import Room from './room';

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

const tileSet1 = {
  w1: "./assets/images/tiles/ground_tile_water_256_water.png",
  d1: "./assets/images/tiles/ground_tile_water_256_nw.png",
  d2: "./assets/images/tiles/ground_tile_water_256_north_1.png",
  d3: "./assets/images/tiles/ground_tile_water_256_ne.png",
  d4: "./assets/images/tiles/ground_tile_water_256_west_1.png",
  d5: "./assets/images/tiles/ground_tile_256_1.png",
  d6: "./assets/images/tiles/ground_tile_water_256_east_1.png",
  d7: "./assets/images/tiles/ground_tile_water_256_sw.png",
  d8: "./assets/images/tiles/ground_tile_water_256_south_1.png",
  d9: "./assets/images/tiles/ground_tile_water_256_se.png"
};

document.addEventListener('DOMContentLoaded', () => {
  const canvasEl = document.getElementById('main');
  const floor = new Floor(canvasEl, tileSet1, 30, 30);
  window.floor = floor;
});
