import Game from './game';

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
  ch: "./assets/images/cave/cave_hole1.png",
  cb: "./assets/images/cave/cave_base.png",
  cv: "./assets/images/cave/cave_void.png",
  hs: "./assets/images/char/char_s.png",
  he: "./assets/images/char/char_e.png",
  hn: "./assets/images/char/char_n.png",
  hw: "./assets/images/char/char_w.png",
  m0: "./assets/images/monsters/monster_23.png",
  m1: "./assets/images/monsters/monster_00.png",
  m2: "./assets/images/monsters/monster_01.png",
  m3: "./assets/images/monsters/monster_02.png",
  m4: "./assets/images/monsters/monster_03.png",
  m5: "./assets/images/monsters/monster_04.png",
  m6: "./assets/images/monsters/monster_05.png",
  m7: "./assets/images/monsters/monster_06.png",
  m8: "./assets/images/monsters/monster_07.png",
  m9: "./assets/images/monsters/monster_08.png",
  m10: "./assets/images/monsters/monster_09.png",
  m11: "./assets/images/monsters/monster_10.png",
  m12: "./assets/images/monsters/monster_11.png",
  m13: "./assets/images/monsters/monster_12.png",
  m14: "./assets/images/monsters/monster_13.png",
  m15: "./assets/images/monsters/monster_14.png",
  m16: "./assets/images/monsters/monster_15.png",
  m17: "./assets/images/monsters/monster_16.png",
  m18: "./assets/images/monsters/monster_17.png",
  m19: "./assets/images/monsters/monster_18.png",
  m20: "./assets/images/monsters/monster_19.png",
  m21: "./assets/images/monsters/monster_20.png",
  m22: "./assets/images/monsters/monster_21.png",
  isw00 : '/assets/images/items/weapons/sword_00.png',
  isw01 : '/assets/images/items/weapons/sword_01.png',
  isw02 : '/assets/images/items/weapons/sword_02.png',
  isw03 : '/assets/images/items/weapons/sword_03.png',
  isw04 : '/assets/images/items/weapons/sword_04.png',
  isw05 : '/assets/images/items/weapons/sword_05.png',
  isw06 : '/assets/images/items/weapons/sword_06.png',
  isw07 : '/assets/images/items/weapons/sword_07.png',
  isw08 : '/assets/images/items/weapons/sword_08.png',
  isw09 : '/assets/images/items/weapons/sword_09.png',
  isw10 : '/assets/images/items/weapons/sword_10.png',
  isw11 : '/assets/images/items/weapons/sword_11.png',
  isw12 : '/assets/images/items/weapons/sword_12.png',
  isw13 : '/assets/images/items/weapons/sword_13.png',
  isw14 : '/assets/images/items/weapons/sword_14.png',
  isw15 : '/assets/images/items/weapons/sword_15.png',
  isw16 : '/assets/images/items/weapons/sword_16.png',
  isw17 : '/assets/images/items/weapons/sword_17.png',
  isw18 : '/assets/images/items/weapons/sword_18.png',
  isw19 : '/assets/images/items/weapons/sword_19.png',
  isw20 : '/assets/images/items/weapons/sword_20.png',
  isw21 : '/assets/images/items/weapons/sword_21.png',
  isw22 : '/assets/images/items/weapons/sword_22.png'
};

const newGame = (playerName) => {
  if (!(/\w/).test(playerName)) playerName = 'player1';

  const canvas = document.getElementById('main');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');
  const game = new Game(playerName, canvas, ctx, CaveTileset);
};

const displayMenuScreen = () => {
  const hud = document.querySelector('.hud');
  const modal = document.querySelector('.modal-main');
  const entergame = document.querySelector('.enter-game');
  const playerName = document.querySelector('.player-name');
  playerName.focus();

  entergame.addEventListener('submit', () => {
    event.preventDefault();

    hud.style.display = 'flex';
    modal.style.display = 'none';
    newGame(playerName.value);
  });
};

document.addEventListener('DOMContentLoaded', () => {

  const mainmenu = document.querySelector('.main-menu');
  const menubuttons = document.getElementsByClassName('menu-button');

  const newgame = document.querySelector('.new-game');
  const howto = document.querySelector('.how-to');
  const about = document.querySelector('.about');

  menubuttons[0].addEventListener('click', () => {
    mainmenu.style.display = 'none';
    newgame.style.display = 'flex';
  });

  menubuttons[1].addEventListener('click', () => {
    mainmenu.style.display = 'none';
    howto.style.display = 'flex';
  });

  menubuttons[2].addEventListener('click', () => {
    mainmenu.style.display = 'none';
    about.style.display = 'flex';
  });

  const backbuttons = document.getElementsByClassName('back-menu');

  Array.from(backbuttons).forEach((el) => {
    el.addEventListener('click', () => {
      el.parentElement.style.display = 'none';
      mainmenu.style.display = 'flex';
    });
  });

  displayMenuScreen();
});
