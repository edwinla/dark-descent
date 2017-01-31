const tiles = [];

function loadTiles() {

    const tilesSrc = [
      "/assets/images/PNG/mapTile_187.png",
      "/assets/images/PNG/mapTile_001.png",
      "/assets/images/PNG/mapTile_002.png",
      "/assets/images/PNG/mapTile_003.png",
      "/assets/images/PNG/mapTile_016.png",
      "/assets/images/PNG/mapTile_017.png",
      "/assets/images/PNG/mapTile_018.png",
      "/assets/images/PNG/mapTile_031.png",
      "/assets/images/PNG/mapTile_032.png",
      "/assets/images/PNG/mapTile_033.png",
    ],
    tilesLoaded = 0;

    for (let i = 0; i < tilesSrc.length; i++) {
      tiles[i] = new Image();
      tiles[i].src = tilesSrc[i];
      tiles[i].onload = function() {
        tilesLoaded++;
        if (tilesLoaded === tilesSrc.length) {
            render();
        }
      };
    }

  }

function render() {
    const map = [
      [0,0,0,0,0],
      [0,1,2,3,0],
      [0,4,5,6,0],
      [0,7,8,9,0]
      [0,0,0,0,0]
    ];

    const ctx = document.getElementById('main').getContext('2d');

    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        const tile = map[i][j];
        if (tile) {
          ctx.fillStyle = '#FF0000';
          ctx.fillRect(j * 20, i * 20, 20, 20);
        }
      }
    }
}

window.render = render;
