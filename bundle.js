/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.randomNumber = randomNumber;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BinaryMinHeap = exports.BinaryMinHeap = function () {
  function BinaryMinHeap(comparator) {
    _classCallCheck(this, BinaryMinHeap);

    this.store = [];
    this.comparator = comparator;
  }

  _createClass(BinaryMinHeap, [{
    key: "count",
    value: function count() {
      return this.store.length;
    }
  }, {
    key: "push",
    value: function push(node) {
      this.store.push(node);
      this.heapifyUp(this.store.length - 1);
    }
  }, {
    key: "extract",
    value: function extract() {
      var extracted = this.store[0];
      var maxNode = this.store.pop();

      if (this.store.length > 0) {
        this.store[0] = maxNode;
        this.heapifyDown(0);
      }

      return extracted;
    }
  }, {
    key: "remove",
    value: function remove(node) {
      for (var i = 0; i < this.store.length; i++) {
        if (this.store[i] !== node) continue;

        var max = this.store.pop();

        if (i === this.store.length - 1) break;

        this.store[i] = max;
        this.heapifyUp(i);
        this.heapifyDown(i);
        break;
      }
    }
  }, {
    key: "recompareNode",
    value: function recompareNode(node) {
      this.heapifyDown(this.store.indexOf(node));
    }
  }, {
    key: "heapifyDown",
    value: function heapifyDown(index) {
      var _this = this;

      var heapifyNode = this.store[index],
          childIndices = this.getChildIndices(index);
      if (childIndices.length > 0) {
        var swapIndex = null;

        childIndices.forEach(function (childIndex) {
          var child = _this.store[childIndex];
          if (_this.comparator(heapifyNode, child) === 1) {
            swapIndex = childIndex;
          }
        });

        if (!swapIndex) return;

        this.swapNodes(heapifyNode, index, swapIndex);

        this.heapifyDown(swapIndex);
      }
    }
  }, {
    key: "heapifyUp",
    value: function heapifyUp(index) {
      if (index > 0) {
        var heapifyNode = this.store[index],
            parentIndex = this.getParentIndex(index);
        var parent = this.store[parentIndex];

        if (this.comparator(heapifyNode, parent) === 1) return;

        this.swapNodes(heapifyNode, index, parentIndex);

        this.heapifyUp(parentIndex);
      }
    }
  }, {
    key: "swapNodes",
    value: function swapNodes(heapifyNode, currentIndex, swapIndex) {
      this.store[currentIndex] = this.store[swapIndex];
      this.store[swapIndex] = heapifyNode;
    }
  }, {
    key: "getParentIndex",
    value: function getParentIndex(index) {
      return Math.floor((index + 1) / 2) - 1;
    }
  }, {
    key: "getChildIndices",
    value: function getChildIndices(index) {
      var indices = [],
          storeSize = this.store.length,
          childIndex2 = (index + 1) * 2,
          childIndex1 = childIndex2 - 1;

      if (childIndex2 < storeSize) indices.push(childIndex2);
      if (childIndex1 < storeSize) indices.push(childIndex1);
      return indices;
    }
  }]);

  return BinaryMinHeap;
}();

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _unit = __webpack_require__(4);

var _unit2 = _interopRequireDefault(_unit);

var _weapon = __webpack_require__(2);

var _weapon2 = _interopRequireDefault(_weapon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Enemy = function (_Unit) {
  _inherits(Enemy, _Unit);

  function Enemy(name, hp, weap, type, num) {
    _classCallCheck(this, Enemy);

    var _this = _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, name, hp, weap, type));

    _this.generateItem(num);
    return _this;
  }

  _createClass(Enemy, [{
    key: 'generateItem',
    value: function generateItem(num) {
      if (Math.random() * 10 > 9) {
        this.item = new _weapon2.default(num);
      } else return null;
    }
  }, {
    key: 'terminate',
    value: function terminate() {
      this.node.restore(this.item);
      this.node = null;
      return this;
    }
  }]);

  return Enemy;
}(_unit2.default);

exports.default = Enemy;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WEAPONTYPES = {
  isw00: 'knife',
  isw01: 'cobalt knife',
  isw02: 'golden knife',
  isw03: 'demonic knife',
  isw04: 'short sword',
  isw05: 'iron sword',
  isw06: 'steel sword',
  isw07: 'empowered blade',
  isw08: 'royal sword',
  isw09: 'emerald blade',
  isw10: 'draconic sword',
  isw11: 'knights sword',
  isw12: 'cobalt sword',
  isw13: 'golden sword',
  isw14: 'demonic sword',
  isw15: 'frizuhasa',
  isw16: 'champions broadsword',
  isw17: 'heroic broadsword',
  isw18: 'legendary broadsword',
  isw19: 'terrakuugi',
  isw20: 'izakugaken',
  isw21: 'underworld slayer',
  isw22: 'ragikagukenmasa'
};

var Weapon = function () {
  function Weapon(num) {
    _classCallCheck(this, Weapon);

    this.calcWeapon(num);
  }

  _createClass(Weapon, [{
    key: 'calcWeapon',
    value: function calcWeapon(num) {
      var identifier = num % 23;
      var type = identifier > 9 ? 'isw' + identifier : 'isw0' + identifier;
      this.type = type;
      this.name = WEAPONTYPES[this.type];
      this.damage = this.rngDamage(num);
    }
  }, {
    key: 'rngDamage',
    value: function rngDamage(num) {
      return num * 7 + (0, _util.randomNumber)(0, Math.floor(num * 3 / 2)) + 5;
    }
  }]);

  return Weapon;
}();

exports.default = Weapon;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _unit = __webpack_require__(4);

var _unit2 = _interopRequireDefault(_unit);

var _weapon = __webpack_require__(2);

var _weapon2 = _interopRequireDefault(_weapon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = function (_Unit) {
  _inherits(Player, _Unit);

  function Player(name) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, name));

    _this.type = 'hs';
    _this.hp = [100, 100];
    _this.weap = new _weapon2.default(0);
    _this.lvl = 1;
    _this.xp = 0;
    return _this;
  }

  _createClass(Player, [{
    key: 'moveAttempt',
    value: function moveAttempt(eventKey) {
      var pos = Object.assign({}, { x: this.node.x, y: this.node.y });

      switch (eventKey) {
        case 'w':
        case 'ArrowUp':
          pos.y -= 1;
          this.type = 'hn';
          break;
        case 's':
        case 'ArrowDown':
          pos.y += 1;
          this.type = 'hs';
          break;
        case 'a':
        case 'ArrowLeft':
          pos.x -= 1;
          this.type = 'hw';
          break;
        case 'd':
        case 'ArrowRight':
          this.type = 'he';
          pos.x += 1;
      }

      return pos;
    }
  }, {
    key: 'addEvent',
    value: function addEvent(event) {
      this.hud.updateEvents(event);
    }
  }, {
    key: 'attack',
    value: function attack(enemy) {
      this.damages(enemy);

      this.hud.addBattleEvent(this, enemy);

      if (enemy.hp[0] === 0) {
        this.xpGainedFrom(enemy);
        return enemy.terminate();
      } else {
        enemy.damages(this);

        this.hud.addBattleEvent(enemy, this);
        this.updateHud('hp');

        if (this.hp[0] === 0) return this;
      }
    }
  }, {
    key: 'xpGainedFrom',
    value: function xpGainedFrom(enemy) {
      var xpGained = enemy.hp[1] / 2 + enemy.weap.damage;
      this.xp += xpGained;

      this.updateHud('xp', enemy);
      this.hud.addXPEvent(xpGained, enemy);

      if (this.xpTnl()) this.lvlUp();
    }
  }, {
    key: 'xpTnl',
    value: function xpTnl() {
      return this.xp >= this.lvl * 100;
    }
  }, {
    key: 'lvlUp',
    value: function lvlUp() {
      this.lvl += 1;
      this.xp = 0;
      this.hp = [this.lvl * 100, this.lvl * 100];

      this.updateHud('xp');
      this.updateHud('lvl');
      this.updateHud('hp');
      this.hud.addLvlUpEvent();
    }
  }, {
    key: 'pickupItem',
    value: function pickupItem(item) {
      if (item instanceof _weapon2.default) {
        this.weap = item;
      }

      this.updateHud('weap');
      this.hud.addItemPickupEvent(item);
    }
  }, {
    key: 'updateHud',
    value: function updateHud(attr) {
      this.hud.updatePlayer(attr);
    }
  }, {
    key: 'move',
    value: function move(nextNode) {
      nextNode.object = this;

      this.node.restore();
      this.node = nextNode;
    }
  }]);

  return Player;
}(_unit2.default);

exports.default = Player;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Unit = function () {
  function Unit(name, hp, weap, type) {
    _classCallCheck(this, Unit);

    this.name = name;
    this.hp = hp;
    this.weap = weap;
    this.type = type;
  }

  _createClass(Unit, [{
    key: "spawn",
    value: function spawn(node) {
      node.object = this;
      this.node = node;

      return node;
    }
  }, {
    key: "damages",
    value: function damages(enemy) {
      enemy.hp[0] -= this.weap.damage;
      if (enemy.hp[0] < 0) enemy.hp[0] = 0;
    }
  }]);

  return Unit;
}();

exports.default = Unit;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _floor = __webpack_require__(6);

var _floor2 = _interopRequireDefault(_floor);

var _enemy = __webpack_require__(1);

var _enemy2 = _interopRequireDefault(_enemy);

var _player = __webpack_require__(3);

var _player2 = _interopRequireDefault(_player);

var _hud = __webpack_require__(7);

var _hud2 = _interopRequireDefault(_hud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(playerName, canvas, ctx, tileSet) {
    _classCallCheck(this, Game);

    this.playerName = playerName;
    this.canvas = canvas;
    this.ctx = ctx;
    this.tileSet = tileSet;
    this.keydownEnabled = false;
    this.floors = 0;

    this.playerAction = this.playerAction.bind(this);

    this.enterNewLevel();
  }

  _createClass(Game, [{
    key: 'enterNewLevel',
    value: function enterNewLevel() {
      this.floors += 1;
      this.initNewFloor();
      this.floor.fov = {
        x: Math.floor(window.innerWidth / 64),
        y: Math.floor(window.innerHeight / 64)
      };

      if (!this.player) {
        window.addEventListener('resize', this.resize.bind(this));
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.initPlayer();
        this.initHud();
      } else {
        this.floor.spawnPlayer(this.player);
        this.hud.updateFloor(this.floor);
      }
      this.hud.addFloorEvent();

      this.floor.render();
    }
  }, {
    key: 'initNewFloor',
    value: function initNewFloor() {
      this.floor = new _floor2.default(this.floors, this.ctx, this.tileSet);
    }
  }, {
    key: 'initPlayer',
    value: function initPlayer() {
      this.player = new _player2.default(this.playerName);
      this.floor.spawnPlayer(this.player);
      this.toggleKeydown();
    }
  }, {
    key: 'initHud',
    value: function initHud() {
      this.hud = new _hud2.default(this.player, this.ctx);
      this.hud.updateFloor(this.floor);
    }
  }, {
    key: 'resize',
    value: function resize() {
      this.floor.fov = {
        x: Math.floor(window.innerWidth / 64),
        y: Math.floor(window.innerHeight / 64)
      };
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      this.floor.render();
    }
  }, {
    key: 'playerAction',
    value: function playerAction() {
      event.preventDefault();

      if (event.code === 'Space') {
        this.playerAttack();
        return;
      } else {
        var pos = this.player.moveAttempt(event.key);
        var nextNode = this.floor.map[pos.y][pos.x];

        if (nextNode.hasItem()) {
          this.playerPickup(nextNode);
        } else if (this.floor.validNode(nextNode)) {
          this.playerMove(nextNode);
        }

        this.floor.update();

        if (this.player.node.isHole) {
          this.enterNewLevel();
        }
      }
    }
  }, {
    key: 'animateBasicAttack',
    value: function animateBasicAttack() {
      this.toggleKeydown();
      var idx = 0,
          fps = 10,
          now = void 0,
          then = Date.now(),
          interval = 1000 / fps,
          delta = void 0;

      (function animate() {
        var animation = requestAnimationFrame(animate.bind(this));
        now = Date.now();
        delta = now - then;

        if (delta > interval) {
          then = now - delta % interval;
          this.floor.updateSingleTile('cutd0' + idx % 5);

          idx++;
          if (idx % 5 === 0) {
            cancelAnimationFrame(animation);
            this.floor.updateSingleTile('empty');
            this.toggleKeydown();
          }
        }
      }).bind(this)();
    }
  }, {
    key: 'playerMove',
    value: function playerMove(node) {
      this.player.move(node);
      this.floor.updateCameraPos();
    }
  }, {
    key: 'playerAttack',
    value: function playerAttack() {
      this.animateBasicAttack();

      var attackNode = this.floor.getPlayerFacingNode();
      var enemy = attackNode.object;
      if (!(enemy instanceof _enemy2.default)) return;

      debugger;

      var result = this.player.attack(enemy);

      if (result instanceof _enemy2.default) {
        this.floor.removeEnemy(result);
        this.hud.updateEnemies(this.floor.enemies);
      } else if (result instanceof _player2.default) {
        this.gameOver();
      }
    }
  }, {
    key: 'playerPickup',
    value: function playerPickup(node) {
      this.player.pickupItem(node.object);
      node.restore();
    }
  }, {
    key: 'toggleKeydown',
    value: function toggleKeydown() {
      if (this.keydownEnabled) {
        this.keydownEnabled = false;
        window.removeEventListener('keydown', this.playerAction);
        return;
      }
      window.addEventListener('keydown', this.playerAction);
      this.keydownEnabled = true;
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      this.toggleKeydown();
      this.hud.updateEvents('You have died.');

      var modal = document.querySelector('.modal-gameover');
      modal.style.display = 'block';

      window.onclick = function () {
        if (event.target !== modal) {
          location.reload(true);
        }
      };
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _room = __webpack_require__(10);

var _room2 = _interopRequireDefault(_room);

var _map_node = __webpack_require__(8);

var _map_node2 = _interopRequireDefault(_map_node);

var _path = __webpack_require__(9);

var _path2 = _interopRequireDefault(_path);

var _enemy = __webpack_require__(1);

var _enemy2 = _interopRequireDefault(_enemy);

var _player = __webpack_require__(3);

var _player2 = _interopRequireDefault(_player);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Floor = function () {
  function Floor(num, ctx, tileSet) {
    var mapWidth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
    var mapHeight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 50;

    _classCallCheck(this, Floor);

    this.number = num;
    this.tilesLoaded = 0;
    this.tileSet = tileSet;
    this.tSize = 64;
    this.fov = { x: 15, y: 15 };
    this.ctx = ctx;
    this.tiles = {};
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;
    this.cameraPos = { cx: 0, cy: 0 };
    this.enemies = [];
    this.initialRender = true;
    window.updateSingleTile = this.updateSingleTile.bind(this);
    this.initialize();
  }

  _createClass(Floor, [{
    key: 'initialize',
    value: function initialize() {
      this.map = this.getBackgroundMap(this.mapWidth, this.mapHeight);
      this.rooms = this.generateRooms(5, 8, 5, 8, 400, 12);
      this.paths = this.generatePaths();
      this.removeGaps();
      this.generateWalls();
      this.placeHole();
      this.spawnEnemies(20);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.initialRender) {
        this.initialRender = false;
        this.loadTiles(this.tileSet);
      } else this.update();
    }
  }, {
    key: 'init',
    value: function init(count) {
      this.tilesLoaded++;
      if (this.tilesLoaded === count) {
        this.update();
      }
    }
  }, {
    key: 'updateSingleTile',
    value: function updateSingleTile(type) {
      var ts = this.tSize;
      var diff = { x: 0, y: 0 };
      var _cameraPos = this.cameraPos,
          cx = _cameraPos.cx,
          cy = _cameraPos.cy;


      switch (this.player.type) {
        case 'hn':
          diff.y = -1;
          break;
        case 'hs':
          diff.y = 1;
          break;
        case 'hw':
          diff.x = -1;
          break;
        case 'he':
          diff.x = 1;
          break;
      }

      var posX = this.playerCanvasPos.x + diff.x;
      var posY = this.playerCanvasPos.y + diff.y;

      var tile = this.map[cy + diff.y][cx + diff.x];

      this.ctx.clearRect(posX * ts, posY * ts, ts, ts);
      this.ctx.drawImage(this.tiles[tile.type], posX * ts, posY * ts, ts, ts);
      if (tile.object) {
        this.ctx.drawImage(this.tiles[tile.object.type], posX * ts, posY * ts, ts, ts);
      }
      this.ctx.drawImage(this.tiles[type], posX * ts, posY * ts, ts, ts);
    }
  }, {
    key: 'update',
    value: function update() {
      var ts = this.tSize;

      var _calcBounds = this.calcBounds(),
          camX = _calcBounds.camX,
          camY = _calcBounds.camY;

      this.drawOuterBounds();

      for (var i = 0; i < this.fov.y; i++) {
        for (var j = 0; j < this.fov.x; j++) {
          var tile = this.map[camY + i][camX + j];
          var xPos = j * ts;
          var yPos = i * ts;

          this.ctx.webkitImageSmoothingEnabled = false;
          this.ctx.mozImageSmoothingEnabled = false;
          this.ctx.imageSmoothingEnabled = false;
          this.ctx.clearRect(xPos, yPos, ts, ts);

          if (tile.object instanceof _player2.default) {
            this.playerCanvasPos = { x: j, y: i };
          }

          if (tile.object || tile.isHole) {
            this.ctx.drawImage(this.tiles.cb, xPos, yPos, ts, ts);

            if (tile.isHole) this.ctx.drawImage(this.tiles.ch, xPos, yPos, ts, ts);
            if (tile.object) this.ctx.drawImage(this.tiles[tile.object.type], xPos, yPos, ts, ts);
          } else {
            this.ctx.drawImage(this.tiles[tile.type], xPos, yPos, ts, ts);
          }

          this.darken(tile, xPos, yPos, ts);
        }
      }
    }
  }, {
    key: 'drawOuterBounds',
    value: function drawOuterBounds() {
      var ts = this.tSize;

      for (var i = 0; i < window.innerHeight / ts; i++) {
        for (var j = 0; j < window.innerWidth / ts; j++) {
          var xPos = j * ts;
          var yPos = i * ts;
          this.ctx.drawImage(this.tiles.wb, xPos, yPos, ts, ts);
          this.darken(this.tiles.wb, xPos, yPos, ts);
        }
      }
    }
  }, {
    key: 'calcBounds',
    value: function calcBounds() {
      var _cameraPos2 = this.cameraPos,
          cx = _cameraPos2.cx,
          cy = _cameraPos2.cy;

      var fovX = Math.floor(this.fov.x / 2);
      var fovY = Math.floor(this.fov.y / 2);

      var camX = void 0,
          camY = void 0,
          fov = {};

      if (cx + fovX >= this.mapWidth) {
        camX = this.mapWidth - this.fov.x;
      } else if (cx - fovX < 0) {
        camX = 0;
      } else camX = cx - fovX;

      if (cy + fovY >= this.mapHeight) {
        camY = this.mapHeight - this.fov.y;
      } else if (cy - fovY < 0) {
        camY = 0;
      } else camY = cy - fovY;

      return { camX: camX, camY: camY };
    }
  }, {
    key: 'darken',
    value: function darken(tile, xPos, yPos, ts) {
      var xDiff = Math.abs(this.cameraPos.cx - tile.x);
      var yDiff = Math.abs(this.cameraPos.cy - tile.y);
      var alpha = 0.75;

      this.ctx.fillStyle = 'black';
      if (yDiff === 5 && xDiff <= 1) {
        alpha = 0.15;
      } else if (yDiff === 4 && xDiff <= 2) {
        alpha = xDiff < 2 ? 0 : 0.15;
      } else if (yDiff === 3 && xDiff <= 3) {
        alpha = xDiff < 3 ? 0 : 0.15;
      } else if (yDiff === 2 && xDiff <= 4) {
        alpha = xDiff < 4 ? 0 : 0.15;
      } else if (yDiff <= 1 && xDiff <= 5) {
        alpha = xDiff < 5 ? 0 : 0.15;
      }

      this.ctx.globalAlpha = alpha;
      this.ctx.fillRect(xPos, yPos, ts, ts);
      this.ctx.globalAlpha = 1;
    }
  }, {
    key: 'loadTiles',
    value: function loadTiles(tileSet) {
      var _this = this;

      var tileSetKeys = Object.keys(tileSet);
      for (var i = 0; i < tileSetKeys.length; i++) {
        var tile = tileSetKeys[i];
        this.tiles[tile] = new Image();
        this.tiles[tile].src = tileSet[tile];
        this.tiles[tile].onload = function () {
          _this.init(tileSetKeys.length);
        };
      }
    }
  }, {
    key: 'getBackgroundMap',
    value: function getBackgroundMap(mapWidth, mapHeight) {
      var backgroundMap = [];
      for (var y = 0; y < mapHeight; y++) {
        var row = [];
        for (var x = 0; x < mapWidth; x++) {
          var newMapNode = new _map_node2.default(y, x, 'w1');
          row.push(newMapNode);
        }
        backgroundMap.push(row);
      }
      return backgroundMap;
    }
  }, {
    key: 'removeGaps',
    value: function removeGaps() {
      var _this2 = this;

      var dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

      var removed = true;

      while (removed) {
        removed = false;

        var _loop = function _loop(i) {
          var _loop2 = function _loop2(j) {
            var tile = _this2.map[i][j];
            if (tile.type !== 'w1') return 'continue';

            var count = 0,
                n = 0,
                s = 0,
                e = 0,
                w = 0,
                solids = [];

            dirs.forEach(function (dir) {
              if (_this2.map[i + dir[0]][j + dir[1]].type === 'cb') {
                count += 1;
                solids.push(dir);
              }
            });

            if (count > 5) {
              removed = true;
              tile.type = 'cb';
            } else if (count === 5) {
              var y = 0,
                  x = 0;

              solids.forEach(function (dir) {
                y += dir[0];
                x += dir[1];
              });

              if (Math.abs(y) === 3 || Math.abs(x) === 3) {
                tile.type = 'cb';
              }
            }
          };

          for (var j = 1; j < _this2.mapWidth - 1; j++) {
            var _ret2 = _loop2(j);

            if (_ret2 === 'continue') continue;
          }
        };

        for (var i = 1; i < this.mapHeight - 1; i++) {
          _loop(i);
        }
      }
    }
  }, {
    key: 'generateWalls',
    value: function generateWalls() {
      var validwalls = ['wn', 'ws', 'we', 'ww', 'wnw', 'wne', 'wsw', 'wse'];
      for (var i = 0; i < this.mapHeight; i++) {
        for (var j = 0; j < this.mapWidth; j++) {
          var c = this.map[i][j];

          if (i === 0 || i === this.mapHeight - 1 || j === 0 || j === this.mapWidth - 1) {
            c.type = 'wb';
            continue;
          }

          if (c.type !== 'w1') continue;

          var newtype = 'w';

          var n = this.map[i - 1][j];
          var s = this.map[i + 1][j];
          var e = this.map[i][j + 1];
          var w = this.map[i][j - 1];

          if (n.type === 'cb') newtype += 'n';
          if (s.type === 'cb') newtype += 's';
          if (e.type === 'cb') newtype += 'e';
          if (w.type === 'cb') newtype += 'w';

          if (validwalls.indexOf(newtype) !== -1) {
            c.type = newtype;
          } else {
            c.type = 'wb';
          }
        }
      }
    }
  }, {
    key: 'generateRooms',
    value: function generateRooms(minWidth, maxWidth, minHeight, maxHeight, attempts, maxRooms) {
      var rooms = [];
      var i = 0;

      loop1: while (rooms.length < maxRooms && i < attempts) {
        i++;

        var newRoom = new _room2.default(minWidth, maxWidth, minHeight, maxHeight, this.map);

        for (var j = 0; j < rooms.length; j++) {
          if (newRoom.collidesWith(rooms[j])) {
            continue loop1;
          }
        }

        newRoom.render();
        rooms.push(newRoom);
      }
      return rooms;
    }
  }, {
    key: 'generatePaths',
    value: function generatePaths() {
      var paths = [];
      for (var i = 0; i < this.rooms.length - 1; i++) {
        var door1 = this.rooms[i].generateDoorLocation();
        var door2 = this.rooms[i + 1].generateDoorLocation();
        var path = new _path2.default(door1, door2, this.map);
        paths.push(path);
      }

      paths.forEach(function (path) {
        return path.render();
      });

      return paths;
    }
  }, {
    key: 'placeHole',
    value: function placeHole() {
      var holeNode = null;

      while (!holeNode) {
        var pos = this.randomLocation();
        var node = this.map[pos.y][pos.x];

        if (node.type === 'cb') holeNode = node;
      }

      holeNode.isHole = true;

      this.hole = holeNode;
    }
  }, {
    key: 'randomLocation',
    value: function randomLocation() {
      var node = void 0;

      do {
        var room = this.rooms[(0, _util.randomNumber)(0, this.rooms.length - 1)];
        var y = (0, _util.randomNumber)(room.absPos.y, room.absPos.y + room.height - 1);
        var x = (0, _util.randomNumber)(room.absPos.x, room.absPos.x + room.width - 1);

        node = this.map[y][x];
      } while (!this.validNode(node));

      return node;
    }
  }, {
    key: 'removeEnemy',
    value: function removeEnemy(enemy) {
      var enemyIdx = this.enemies.indexOf(enemy);
      this.enemies.splice(enemyIdx, 1);
    }
  }, {
    key: 'spawnEnemies',
    value: function spawnEnemies(n) {
      var weapon = {
        name: "maul",
        damage: 5
      };

      for (var i = 0; i < n; i++) {
        var monsterhp = this.number * 20;
        var monsterweap = {
          name: 'maul',
          damage: 4 * this.number
        };
        var enemy = new _enemy2.default('monster', [monsterhp, monsterhp], monsterweap, 'm' + this.number % 24, this.number);

        var node = this.randomLocation();

        enemy.spawn(node);

        this.enemies.push(enemy);
      }
    }
  }, {
    key: 'spawnPlayer',
    value: function spawnPlayer(player) {
      player.spawn(this.randomLocation());
      this.player = player;

      this.updateCameraPos();
    }
  }, {
    key: 'getPlayerFacingNode',
    value: function getPlayerFacingNode() {
      var _cameraPos3 = this.cameraPos,
          cx = _cameraPos3.cx,
          cy = _cameraPos3.cy;

      var diff = { x: 0, y: 0 };

      switch (this.player.type) {
        case 'hn':
          diff.y = -1;
          break;
        case 'hs':
          diff.y = 1;
          break;
        case 'hw':
          diff.x = -1;
          break;
        case 'he':
          diff.x = 1;
          break;
      }

      return this.map[cy + diff.y][cx + diff.x];
    }
  }, {
    key: 'updateCameraPos',
    value: function updateCameraPos() {
      var node = this.player.node;
      this.cameraPos = Object.assign({}, { cx: node.x, cy: node.y });
    }
  }, {
    key: 'validNode',
    value: function validNode(node) {
      return node.type === 'cb' && (!node.object || node.isHole);
    }
  }]);

  return Floor;
}();

exports.default = Floor;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hud = function () {
  function Hud(player, ctx) {
    _classCallCheck(this, Hud);

    this.player = player;
    player.hud = this;
    this.ctx = ctx;
    this.currentFloor = 0;
    this.events = [];
    this.classes = ['name', 'lvl', 'xp', 'hp', 'weap', 'events', 'floor-num', 'remain'];

    this.initialize();
  }

  _createClass(Hud, [{
    key: 'initialize',
    value: function initialize() {
      for (var i = 0; i < this.classes.length; i++) {
        var clss = this.classes[i];
        this[clss + 'DOM'] = document.querySelector('.' + clss);

        if (i < 6) this.updatePlayer(clss);
      }
    }
  }, {
    key: 'updateFloor',
    value: function updateFloor(floor) {
      this.currentFloor += 1;
      this['floor-numDOM'].firstChild.nodeValue = this.currentFloor;

      this.updateEnemies(floor.enemies);
    }
  }, {
    key: 'updateEnemies',
    value: function updateEnemies(enemies) {
      this.enemiesRemaining = enemies.length;
      this['remainDOM'].firstChild.nodeValue = this.enemiesRemaining;
    }
  }, {
    key: 'updatePlayer',
    value: function updatePlayer(attr) {
      var value = this.player[attr];
      switch (attr) {
        case 'name':
        case 'lvl':
        case 'xp':
          this[attr + 'DOM'].firstChild.nodeValue = value;
          break;
        case 'hp':
          this[attr + 'DOM'].firstChild.nodeValue = value[0] + ' / ' + value[1];
          break;
        case 'weap':
          this[attr + 'DOM'].firstChild.nodeValue = value.name;
      }
    }
  }, {
    key: 'addBattleEvent',
    value: function addBattleEvent(off, def) {
      var event = off.name + ' dealt ' + off.weap.damage + ' dmg to ' + def.name + '!';
      this.updateEvents(event);
    }
  }, {
    key: 'addXPEvent',
    value: function addXPEvent(xp, enemy) {
      var event = 'You gained ' + xp + 'xp from slaying ' + enemy.name + '.';
      this.updateEvents(event);
    }
  }, {
    key: 'addLvlUpEvent',
    value: function addLvlUpEvent() {
      var currentlvl = this.player.lvl;
      var event = 'You leveled up from ' + (currentlvl - 1) + ' to ' + currentlvl;
      this.updateEvents(event);
    }
  }, {
    key: 'addFloorEvent',
    value: function addFloorEvent() {
      var event = 'You descend into the dungeon...';
      if (this.currentFloor > 1) {
        event = 'You fall down a hole, deeper into the dungeon.';
      }
      this.updateEvents(event);
    }
  }, {
    key: 'addItemPickupEvent',
    value: function addItemPickupEvent(item) {
      var event = 'You have found a(n) ' + item.name + '!';
      this.updateEvents(event);
    }
  }, {
    key: 'updateEvents',
    value: function updateEvents(event) {
      this.events.push(event);

      var eventsNode = document.querySelector('.events');
      var span = document.createElement('span');
      var text = document.createTextNode(event);

      span.appendChild(text);
      eventsNode.insertBefore(span, eventsNode.firstChild);

      if (eventsNode.childNodes.length > 5) {
        eventsNode.removeChild(eventsNode.lastChild);
      }
    }
  }]);

  return Hud;
}();

exports.default = Hud;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _enemy = __webpack_require__(1);

var _enemy2 = _interopRequireDefault(_enemy);

var _weapon = __webpack_require__(2);

var _weapon2 = _interopRequireDefault(_weapon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapNode = function () {
  function MapNode(y, x, type) {
    _classCallCheck(this, MapNode);

    this.y = y;
    this.x = x;
    this.type = type;
    this.object = null;
    this.isDoor = false;
    this.parent = null;
    this.fCost = null;
    this.gCost = null;
  }

  _createClass(MapNode, [{
    key: 'traversable',
    value: function traversable(map, pos) {
      if (this.validPos(map, pos)) {
        var node = map[pos[0]][pos[1]];
        if (node.isDoor || node.type === 'w1') return true;
      }
      return false;
    }
  }, {
    key: 'restore',
    value: function restore(item) {
      this.object = item ? item : null;
    }
  }, {
    key: 'validPos',
    value: function validPos(map, pos) {
      return pos[0] > 0 && pos[0] < map.length && pos[1] < map[0].length && pos[1] > 0;
    }
  }, {
    key: 'getTraversableNeighbors',
    value: function getTraversableNeighbors(map) {
      var _this = this;

      var neighbors = [];
      var dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

      dirs.forEach(function (dir) {
        var y = _this.y + dir[0];
        var x = _this.x + dir[1];
        var pos = [y, x];

        if (_this.traversable(map, pos)) neighbors.push(map[y][x]);
      });

      return neighbors;
    }
  }, {
    key: 'isEnemyNode',
    value: function isEnemyNode() {
      return this.object instanceof _enemy2.default;
    }
  }, {
    key: 'hasItem',
    value: function hasItem() {
      return this.object instanceof _weapon2.default;
    }
  }, {
    key: 'allNeighbors',
    value: function allNeighbors(map) {
      var _this2 = this;

      var dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [-1, -1], [0, -1]];

      var neighbors = [];

      dirs.forEach(function (dir) {
        var neighbor = map[_this2.y + dir[0]][_this2.x + dir[1]];
        neighbors.push(neighbor);
      });

      return neighbors;
    }
  }]);

  return MapNode;
}();

exports.default = MapNode;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Path = function () {
  function Path(startNode, targetNode, map) {
    _classCallCheck(this, Path);

    this.startNode = startNode;
    this.targetNode = targetNode;
    this.map = map;
    this.path = [];

    this.aStarPathFinder();
  }

  _createClass(Path, [{
    key: 'fCostComparator',
    value: function fCostComparator(node1, node2) {
      if (node1.fCost > node2.fCost) {
        return 1;
      } else if (node1.fCost < node2.fCost) {
        return -1;
      } else return 0;
    }
  }, {
    key: 'aStarPathFinder',
    value: function aStarPathFinder() {
      var open = new _util.BinaryMinHeap(this.fCostComparator),
          closed = [];

      this.startNode.gCost = 0;
      this.startNode.fCost = this.calculateHCost(this.startNode);

      open.push(this.startNode);
      while (open.count() > 0) {
        var current = open.extract();
        closed.push(current);

        if (current === this.targetNode) {
          return this.reconstructPath();
        }

        var neighbors = current.getTraversableNeighbors(this.map);
        for (var i = 0; i < neighbors.length; i++) {
          var neighbor = neighbors[i];

          if (closed.indexOf(neighbor) !== -1) continue;

          var newGCost = current.gCost + 1;
          if (open.store.indexOf(neighbor) === -1) {
            open.push(neighbor);
          } else if (newGCost >= neighbor.gCost) {
            continue;
          }
          neighbor.gCost = newGCost;
          neighbor.fCost = newGCost + this.calculateHCost(neighbor);
          neighbor.parent = current;
          open.recompareNode(neighbor);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      this.path.forEach(function (node) {
        node.type = 'cb';
      });
    }
  }, {
    key: 'reconstructPath',
    value: function reconstructPath(closed) {
      var currentNode = this.targetNode;

      while (currentNode !== this.startNode) {
        var parentNode = currentNode.parent;
        this.path.push(parentNode);
        currentNode = parentNode;
      }
    }
  }, {
    key: 'calculateHCost',
    value: function calculateHCost(node) {
      var dx = Math.abs(node.x - this.targetNode.x);
      var dy = Math.abs(node.y - this.targetNode.y);
      return dx + dy;
    }
  }]);

  return Path;
}();

exports.default = Path;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Room = function () {
  function Room(minWidth, maxWidth, minHeight, maxHeight, map) {
    _classCallCheck(this, Room);

    this.id = null;
    this.width = (0, _util.randomNumber)(minWidth, maxWidth);
    this.height = (0, _util.randomNumber)(minHeight, maxHeight);
    this.map = map;
    this.absPos = this.getRandomPosition(map[0].length, map.length);
    this.corners = this.getCorners();
  }

  _createClass(Room, [{
    key: 'render',
    value: function render() {
      this.edges = this.linearizeEdges();
      this.drawMain();
    }
  }, {
    key: 'getRandomPosition',
    value: function getRandomPosition(mapWidth, mapHeight) {
      var xUpperLimit = mapWidth - this.width - 3;
      var yUpperLimit = mapHeight - this.height - 3;
      return {
        x: (0, _util.randomNumber)(3, xUpperLimit),
        y: (0, _util.randomNumber)(3, yUpperLimit)
      };
    }
  }, {
    key: 'generateDoorLocation',
    value: function generateDoorLocation() {
      var door = this.edges[Math.floor(Math.random() * this.edges.length)];
      this.openPath(door);
      door.isDoor = true;
      return door;
    }
  }, {
    key: 'openPath',
    value: function openPath(door) {
      var coords = [[-1, 0], [0, 1], [1, 0], [0, -1]];

      for (var i = 0; i < coords.length; i++) {
        var x = door.x + coords[i][1];
        var y = door.y + coords[i][0];
        var node = this.map[y][x];
        if (node.type === 'w2') {
          node.type = 'w1';
          return;
        }
      }
    }
  }, {
    key: 'linearizeEdges',
    value: function linearizeEdges() {
      var absX = this.absPos.x,
          absY = this.absPos.y;
      var absXLimit = absX + this.width - 1;
      var absYLimit = absY + this.height - 1;

      var edges = [];

      for (var y = absY; y <= absYLimit; y += this.height - 1) {
        for (var x = absX; x <= absXLimit; x++) {
          var node = this.map[y][x];
          edges.push(node);
        }
      }

      for (var _y = absY + 1; _y < absYLimit; _y++) {
        for (var _x = absX; _x <= absXLimit; _x += this.width - 1) {
          var _node = this.map[_y][_x];
          edges.push(_node);
        }
      }

      return edges;
    }
  }, {
    key: 'drawMain',
    value: function drawMain() {
      var absX = this.absPos.x,
          absY = this.absPos.y;
      var absXLimit = absX + this.width - 1;
      var absYLimit = absY + this.height - 1;
      for (var y = absY; y <= absYLimit; y++) {
        for (var x = absX; x <= absXLimit; x++) {
          var node = this.map[y][x];
          node.type = 'cb';
        }
      }
    }
  }, {
    key: 'getCorners',
    value: function getCorners() {
      return {
        nw: {
          x: this.absPos.x - 2,
          y: this.absPos.y - 2
        },
        ne: {
          x: this.absPos.x + this.width + 1,
          y: this.absPos.y - 2
        },
        sw: {
          x: this.absPos.x - 2,
          y: this.absPos.y + this.height + 1
        },
        se: {
          x: this.absPos.x + this.width + 1,
          y: this.absPos.y + this.height + 1
        }
      };
    }
  }, {
    key: 'collidesWith',
    value: function collidesWith(room) {
      var _corners = this.corners,
          nw = _corners.nw,
          ne = _corners.ne,
          sw = _corners.sw,
          se = _corners.se;

      return nw.x <= room.corners.ne.x && ne.x >= room.corners.nw.x && nw.y <= room.corners.sw.y && sw.y >= room.corners.nw.y;
    }
  }]);

  return Room;
}();

exports.default = Room;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(5);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CaveTileset = {
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
  isw00: './assets/images/items/weapons/sword_00.png',
  isw01: './assets/images/items/weapons/sword_01.png',
  isw02: './assets/images/items/weapons/sword_02.png',
  isw03: './assets/images/items/weapons/sword_03.png',
  isw04: './assets/images/items/weapons/sword_04.png',
  isw05: './assets/images/items/weapons/sword_05.png',
  isw06: './assets/images/items/weapons/sword_06.png',
  isw07: './assets/images/items/weapons/sword_07.png',
  isw08: './assets/images/items/weapons/sword_08.png',
  isw09: './assets/images/items/weapons/sword_09.png',
  isw10: './assets/images/items/weapons/sword_10.png',
  isw11: './assets/images/items/weapons/sword_11.png',
  isw12: './assets/images/items/weapons/sword_12.png',
  isw13: './assets/images/items/weapons/sword_13.png',
  isw14: './assets/images/items/weapons/sword_14.png',
  isw15: './assets/images/items/weapons/sword_15.png',
  isw16: './assets/images/items/weapons/sword_16.png',
  isw17: './assets/images/items/weapons/sword_17.png',
  isw18: './assets/images/items/weapons/sword_18.png',
  isw19: './assets/images/items/weapons/sword_19.png',
  isw20: './assets/images/items/weapons/sword_20.png',
  isw21: './assets/images/items/weapons/sword_21.png',
  isw22: './assets/images/items/weapons/sword_22.png',
  cuta00: './assets/images/effects/cut_a/cut_a_0001.png',
  cuta01: './assets/images/effects/cut_a/cut_a_0002.png',
  cuta02: './assets/images/effects/cut_a/cut_a_0003.png',
  cuta03: './assets/images/effects/cut_a/cut_a_0004.png',
  cuta04: './assets/images/effects/cut_a/cut_a_0005.png',
  cutd00: './assets/images/effects/cut_d/cut_d_0001.png',
  cutd01: './assets/images/effects/cut_d/cut_d_0002.png',
  cutd02: './assets/images/effects/cut_d/cut_d_0003.png',
  cutd03: './assets/images/effects/cut_d/cut_d_0004.png',
  cutd04: './assets/images/effects/cut_d/cut_d_0005.png',
  empty: './assets/images/effects/empty.png'
};

var newGame = function newGame(playerName) {
  if (!/\w/.test(playerName)) playerName = 'player1';

  var canvas = document.getElementById('main');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext('2d');
  var game = new _game2.default(playerName, canvas, ctx, CaveTileset);
};

var enterGameScreen = function enterGameScreen() {
  var hud = document.querySelector('.hud');
  var modal = document.querySelector('.modal-main');
  var entergame = document.querySelector('.enter-game');
  var playerName = document.querySelector('.player-name');
  playerName.focus();

  entergame.addEventListener('submit', function () {
    event.preventDefault();

    hud.style.display = 'flex';
    modal.style.display = 'none';
    newGame(playerName.value);
  });
};

document.addEventListener('DOMContentLoaded', function () {

  var mainmenu = document.querySelector('.main-menu');
  var menubuttons = document.getElementsByClassName('menu-button');

  var newgame = document.querySelector('.new-game');
  var howto = document.querySelector('.how-to');
  var about = document.querySelector('.about');

  menubuttons[0].addEventListener('click', function () {
    mainmenu.style.display = 'none';
    newgame.style.display = 'flex';
    enterGameScreen();
  });

  menubuttons[1].addEventListener('click', function () {
    mainmenu.style.display = 'none';
    howto.style.display = 'flex';
  });

  menubuttons[2].addEventListener('click', function () {
    mainmenu.style.display = 'none';
    about.style.display = 'flex';
  });

  var backbuttons = document.getElementsByClassName('back-menu');

  Array.from(backbuttons).forEach(function (el) {
    el.addEventListener('click', function () {
      el.parentElement.style.display = 'none';
      mainmenu.style.display = 'flex';
    });
  });

  var bgmusic = document.querySelector('audio');
  var toggleAudio = document.querySelector('.toggle-audio');
  bgmusic.play();

  var isPlaying = true;
  toggleAudio.addEventListener('click', function () {
    if (isPlaying) {
      bgmusic.pause();
      toggleAudio.style.backgroundImage = "url('./assets/images/other/audio_off.png')";
      isPlaying = false;
    } else {
      bgmusic.play();
      toggleAudio.style.backgroundImage = "url('./assets/images/other/audio_on.png')";
      isPlaying = true;
    }
  });
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map