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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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

var _unit = __webpack_require__(2);

var _unit2 = _interopRequireDefault(_unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Enemy = function (_Unit) {
  _inherits(Enemy, _Unit);

  function Enemy(name, hp, weap, type) {
    _classCallCheck(this, Enemy);

    return _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this, name, hp, weap, type));
  }

  _createClass(Enemy, [{
    key: 'terminate',
    value: function terminate() {
      this.node.restore();
      return this;
    }
  }]);

  return Enemy;
}(_unit2.default);

exports.default = Enemy;

/***/ }),
/* 1 */
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
/* 2 */
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
      node.type = this.type;
      node.unit = this;
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _floor = __webpack_require__(4);

var _floor2 = _interopRequireDefault(_floor);

var _enemy = __webpack_require__(0);

var _enemy2 = _interopRequireDefault(_enemy);

var _player = __webpack_require__(8);

var _player2 = _interopRequireDefault(_player);

var _hud = __webpack_require__(5);

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
    this.movementEnabled = false;
    this.floors = 0;

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
      // create a new player
      this.player = new _player2.default(this.playerName);

      // add player to floor at random location
      this.floor.spawnPlayer(this.player);

      // enable movement by adding an event listener
      this.toggleMovement();
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
      var pos = this.player.moveAttempt();
      var nextNode = this.floor.map[pos.y][pos.x];

      if (nextNode.isEnemyNode()) {
        this.playerAttack(nextNode);
      } else if (this.floor.validNode(nextNode)) {
        this.playerMove(nextNode);
      }

      this.floor.update();

      if (this.player.node.isHole) {
        this.enterNewLevel();
      }
    }
  }, {
    key: 'playerMove',
    value: function playerMove(node) {
      this.player.move(node);
      this.floor.updateCameraPos();
    }
  }, {
    key: 'playerAttack',
    value: function playerAttack(node) {
      var result = this.player.attack(node);
      if (result instanceof _enemy2.default) {
        this.floor.removeEnemy(result);
        this.hud.updateEnemies(this.floor.enemies);
      } else if (result instanceof _player2.default) {
        this.gameOver();
      }
    }
  }, {
    key: 'toggleMovement',
    value: function toggleMovement() {
      if (this.movementEnabled) {
        this.movementEnabled = false;
        window.removeEventListener('keydown', this.playerAction.bind(this));
        return;
      }
      window.addEventListener('keydown', this.playerAction.bind(this));
      this.movementEnabled = true;
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _room = __webpack_require__(9);

var _room2 = _interopRequireDefault(_room);

var _map_node = __webpack_require__(6);

var _map_node2 = _interopRequireDefault(_map_node);

var _path = __webpack_require__(7);

var _path2 = _interopRequireDefault(_path);

var _enemy = __webpack_require__(0);

var _enemy2 = _interopRequireDefault(_enemy);

var _util = __webpack_require__(1);

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
    key: 'placeHole',
    value: function placeHole() {
      var holeNode = null;

      while (!holeNode) {
        var pos = this.randomLocation();
        var node = this.map[pos.y][pos.x];

        if (node.type === 'cb') holeNode = node;
      }

      holeNode.isHole = true;
      // console.log(holeNode.x, holeNode.y);

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
      var _this = this;

      var dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

      var removed = true;

      while (removed) {
        removed = false;

        var _loop = function _loop(i) {
          var _loop2 = function _loop2(j) {
            var tile = _this.map[i][j];
            if (tile.type !== 'w1') return 'continue';

            var count = 0,
                n = 0,
                s = 0,
                e = 0,
                w = 0,
                solids = [];

            dirs.forEach(function (dir) {
              if (_this.map[i + dir[0]][j + dir[1]].type === 'cb') {
                count += 1;
                solids.push(dir);
              }
            });

            if (count > 5) {
              removed = true;
              tile.restoreType = 'cb';
              tile.type = 'cb';
            } else if (count === 5) {
              var y = 0,
                  x = 0;

              solids.forEach(function (dir) {
                y += dir[0];
                x += dir[1];
              });

              if (Math.abs(y) === 3 || Math.abs(x) === 3) {
                tile.restoreType = 'cb';
                tile.type = 'cb';
              }
            }
          };

          for (var j = 1; j < _this.mapWidth - 1; j++) {
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
            c.restoreType = 'wb';
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
            c.restoreType = newtype;
          } else {
            c.type = 'wb';
            c.restoreType = 'wb';
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
    key: 'loadTiles',
    value: function loadTiles(tileSet) {
      var _this2 = this;

      var tileSetKeys = Object.keys(tileSet);
      for (var i = 0; i < tileSetKeys.length; i++) {
        var _tile = tileSetKeys[i];
        this.tiles[_tile] = new Image();
        this.tiles[_tile].src = tileSet[_tile];
        this.tiles[_tile].onload = function () {
          _this2.init(tileSetKeys.length);
        };
      }
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
    key: 'calcBounds',
    value: function calcBounds(tX, tY) {

      var fovX = Math.floor(this.fov.x / 2);
      var fovY = Math.floor(this.fov.y / 2);

      var camX = void 0,
          camY = void 0,
          fov = {};

      if (tX + fovX >= this.mapWidth) {
        camX = this.mapWidth - this.fov.x;
      } else if (tX - fovX < 0) {
        camX = 0;
      } else camX = tX - fovX;

      if (tY + fovY >= this.mapHeight) {
        camY = this.mapHeight - this.fov.y;
      } else if (tY - fovY < 0) {
        camY = 0;
      } else camY = tY - fovY;

      return { camX: camX, camY: camY };
    }
  }, {
    key: 'update',
    value: function update(direction) {
      var types = ['u2', 'hn', 'hs', 'he', 'hw'];

      var ts = this.tSize;
      var _cameraPos = this.cameraPos,
          cy = _cameraPos.cy,
          cx = _cameraPos.cx;

      var _ref = direction || { dy: 0, dx: 0 },
          dy = _ref.dy,
          dx = _ref.dx;

      var _calcBounds = this.calcBounds(cx + dx, cy + dy),
          camX = _calcBounds.camX,
          camY = _calcBounds.camY;

      this.ctx.fillStyle = "#201728";
      this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      for (var i = 0; i < this.fov.y; i++) {
        for (var j = 0; j < this.fov.x; j++) {
          var _tile2 = this.map[camY + i][camX + j];
          var xPos = j * ts;
          var yPos = i * ts;
          var tileType = _tile2.isHole ? 'ch' : _tile2.type;

          this.ctx.webkitImageSmoothingEnabled = false;
          this.ctx.mozImageSmoothingEnabled = false;
          this.ctx.imageSmoothingEnabled = false;
          this.ctx.clearRect(xPos, yPos, ts, ts);

          if (_tile2.unit || _tile2.isHole) {
            this.ctx.drawImage(this.tiles.cb, xPos, yPos, ts, ts);
          }

          this.ctx.drawImage(this.tiles[tileType], xPos, yPos, ts, ts);
          // this.ctx.strokeRect(j * ts, i * ts, ts, ts);

          this.darken(_tile2, xPos, yPos, ts);
        }
      }
    }
  }, {
    key: 'darken',
    value: function darken(tile, xPos, yPos, ts) {
      var xDiff = Math.abs(this.cameraPos.cx - tile.x);
      var yDiff = Math.abs(this.cameraPos.cy - tile.y);
      var alpha = 0.55;

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
    key: 'updateCameraPos',
    value: function updateCameraPos() {
      var node = this.player.node;
      this.cameraPos = Object.assign({}, { cx: node.x, cy: node.y });
    }
  }, {
    key: 'spawnEnemies',
    value: function spawnEnemies(n) {
      var weapon = {
        name: "maul",
        damage: 5
      };

      for (var i = 0; i < n; i++) {
        var monsterhp = 50 * this.number;
        var monsterweap = {
          name: 'maul',
          damage: 10 * this.number
        };
        var enemy = new _enemy2.default('monster', [monsterhp, monsterhp], monsterweap, 'm' + this.number % 24);

        var node = this.randomLocation();

        enemy.spawn(node);

        this.enemies.push(enemy);
      }
    }
  }, {
    key: 'removeEnemy',
    value: function removeEnemy(enemy) {
      var enemyIdx = this.enemies.indexOf(enemy);
      this.enemies.splice(enemyIdx, 1);
    }
  }, {
    key: 'spawnPlayer',
    value: function spawnPlayer(player) {
      player.spawn(this.randomLocation());
      this.player = player;

      this.updateCameraPos();
    }
  }, {
    key: 'validNode',
    value: function validNode(node) {
      return node.type === 'cb' || node.type === 'ch';
    }
  }]);

  return Floor;
}();

exports.default = Floor;

/***/ }),
/* 5 */
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
    this.classes = ['name', 'lvl', 'xp', 'hp', 'mana', 'weap', 'events', 'floor-num', 'remain'];

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
      // this.boss = floor.boss;
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
        case 'mana':
          this[attr + 'DOM'].firstChild.nodeValue = value[0] + ' / ' + value[1];
          break;
        case 'weap':
          this[attr + 'DOM'].firstChild.nodeValue = value.name;
      }
    }
  }, {
    key: 'addBattleEvent',
    value: function addBattleEvent(off, def) {
      var event = off.name + ' dealt ' + off.weap.damage + ' to ' + def.name + '!';
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
      var event = 'You lvled up from ' + (currentlvl - 1) + ' to ' + currentlvl;
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _enemy = __webpack_require__(0);

var _enemy2 = _interopRequireDefault(_enemy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapNode = function () {
  function MapNode(y, x, type) {
    _classCallCheck(this, MapNode);

    this.y = y;
    this.x = x;
    this.type = type;
    this.restoreType = type;
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
    value: function restore() {
      this.unit = null;
      this.type = this.restoreType;
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
      return this.unit instanceof _enemy2.default;
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(1);

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
        node.restoreType = 'cb';
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _unit = __webpack_require__(2);

var _unit2 = _interopRequireDefault(_unit);

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
    _this.weap = { name: 'iron sword', damage: 25 };
    _this.mana = [100, 100];
    _this.lvl = 1;
    _this.xp = 0;
    return _this;
  }

  _createClass(Player, [{
    key: 'moveAttempt',
    value: function moveAttempt() {
      event.preventDefault();
      var pos = Object.assign({}, { x: this.node.x, y: this.node.y });

      switch (event.key) {
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

      this.node.type = this.type;

      return pos;
    }
  }, {
    key: 'addEvent',
    value: function addEvent(event) {
      this.hud.updateEvents(event);
    }
  }, {
    key: 'attack',
    value: function attack(node) {
      var enemy = node.unit;
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
    key: 'updateHud',
    value: function updateHud(attr) {
      this.hud.updatePlayer(attr);
    }
  }, {
    key: 'move',
    value: function move(nextNode) {
      nextNode.type = this.type;
      nextNode.unit = this;

      this.node.restore();
      this.node = nextNode;
    }
  }]);

  return Player;
}(_unit2.default);

exports.default = Player;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(1);

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
      // this.addBuffer();
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
    key: 'addBuffer',
    value: function addBuffer() {
      var absX = this.absPos.x - 1,
          absY = this.absPos.y - 1,
          absXLimit = absX + this.width + 1,
          absYLimit = absY + this.height + 1;

      var y = absY;
      while (y <= absYLimit) {
        var x = absX;
        while (x <= absXLimit) {
          var node = this.map[y][x];
          node.type = 'w2';

          switch (y) {
            case absY:
            case absYLimit:
              x++;
              break;
            default:
              x += this.width + 1;
          }
        }
        y++;
      }
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
          node.restoreType = 'cb';
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(3);

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
  m22: "./assets/images/monsters/monster_21.png"
};

var newGame = function newGame(playerName) {
  var canvas = document.getElementById('main');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var ctx = canvas.getContext('2d');
  var game = new _game2.default(playerName, canvas, ctx, CaveTileset);
};

var displayMenuScreen = function displayMenuScreen() {

  var hud = document.querySelector('.hud');
  var modal = document.querySelector('.modal-menu');
  var newgame = document.querySelector('.new-game');
  var playerName = document.querySelector('.player-name');
  playerName.focus();

  newgame.onsubmit = function () {
    event.preventDefault();

    hud.style.display = 'flex';
    modal.style.display = 'none';
    newGame(playerName.value);
  };
};

document.addEventListener('DOMContentLoaded', function () {
  displayMenuScreen();
});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map