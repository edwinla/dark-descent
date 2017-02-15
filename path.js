import {BinaryMinHeap} from './util.js';

export default class Path {
  constructor(startNode, targetNode, map) {
    this.startNode = startNode;
    this.targetNode = targetNode;
    this.map = map;
    this.path = [];

    this.aStarPathFinder();
  }

  fCostComparator(node1, node2) {
    if (node1.fCost > node2.fCost) {
      return 1;
    } else if (node1.fCost < node2.fCost) {
      return -1;
    } else return 0;
  }

  aStarPathFinder() {
    const open = new BinaryMinHeap(this.fCostComparator),
    closed = [];

    this.startNode.gCost = 0;
    this.startNode.fCost = this.calculateHCost(this.startNode);

    open.push(this.startNode);
    while (open.count() > 0) {
      const current = open.extract();
      closed.push(current);

      if (current === this.targetNode) {
        return this.reconstructPath();
      }

      const neighbors = current.getNeighbors(this.map);
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];

        if (closed.indexOf(neighbor) !== -1) continue;

        const newGCost = current.gCost + 1;
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

  render() {
    this.path.forEach(node => {
      node.type = 'd5';
    });
  }

  reconstructPath(closed) {
    let currentNode = this.targetNode;

    while (currentNode !== this.startNode) {
      const parentNode = currentNode.parent;
      this.path.push(parentNode);
      currentNode = parentNode;
    }
  }

  calculateHCost(node) {
    const dx = Math.abs(node.x - this.targetNode.x);
    const dy = Math.abs(node.y - this.targetNode.y);
    return dx + dy;
  }
}
