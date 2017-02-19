import Game from './game';

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
  w2: "./assets/images/tiles/paving_01_tile_256_01.png",
  d1: "./assets/images/tiles/ground_tile_water_256_nw.png",
  d2: "./assets/images/tiles/ground_tile_water_256_north_1.png",
  d3: "./assets/images/tiles/ground_tile_water_256_ne.png",
  d4: "./assets/images/tiles/ground_tile_water_256_west_1.png",
  d5: "./assets/images/tiles/ground_tile_256_1.png",
  d6: "./assets/images/tiles/ground_tile_water_256_east_1.png",
  d7: "./assets/images/tiles/ground_tile_water_256_sw.png",
  d8: "./assets/images/tiles/ground_tile_water_256_south_1.png",
  d9: "./assets/images/tiles/ground_tile_water_256_se.png",
  u1: "./assets/images/tiles/snow_02_tile_256_01.png",
  u2: "./assets/images/tiles/lava_tile_256_02.png"
};

const CaveTileset = {
  w1: "./assets/images/cave/cave_void.png",
  wb: "./assets/images/cave/cave_solid.png",
  wn: "./assets/images/cave/cave_solid_n.png",
  we: "./assets/images/cave/cave_solid_e.png",
  ww: "./assets/images/cave/cave_solid_w.png",
  wnw: "./assets/images/cave/cave_solid_nw.png",
  wne: "./assets/images/cave/cave_solid_ne.png",
  ws: "./assets/images/cave/cave_solid_s.png",
  wsw: "./assets/images/cave/cave_solid_sw.png",
  wse: "./assets/images/cave/cave_solid_se.png",
  d5: "./assets/images/cave/cave_base.png",
  u1: "./assets/images/char/char_s_b.png",
  u2: "./assets/images/imposter/imposter_s_b.png"
};

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('main');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;

  const game = new Game(canvas, ctx, CaveTileset);

  window.canvas = canvas;
  window.game = game;
});
