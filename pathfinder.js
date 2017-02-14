import {BinaryMinHeap} from './util.js';

/*

OPEN // set of nodes to be evaluated
CLOSED // set of nodes evaluated
add the start node to OPEN

loop
  current = node in OPEN with the lowest f_cost
  remove current from OPEN
  add current to CLOSED

  if current is the target node // path has been found
    return

  foreach neighbor of the current node
    if neighbor is not traversable or neighbor is in CLOSED
      skip to the next neighbor

    if new path to neighbor is shorter or neighbor is not in OPEN
      set f_cst of neighbor
      set parent of neighbor to current
      if neighbor is not in OPEN
      add neighbor to OPEN

*/

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
    closed = [], path = [];

    // Initially there is no G cost of the start node, so we just use H cost;
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

        if (!neighbor.traversable || closed.indexOf(neighbor)) continue;

        const oldPath = neighbor.fCost;
        const newPath = neighbor.updateFCost(current, neighbor);

        if (closed.indexOf(neighbor) === -1 || newPath < oldPath) {
          neighbor.fCost = newPath;
          neighbor.parent = current;

          if (open.store.indexOf(neighbor) === -1) open.push(neighbor);
        }
      }
    }
  }

  reconstructPath(closed) {
    let currentNode = this.targetNode;

    while (currentNode !== this.startNode) {
      const parentNode = currentNode.parent;
      this.path.push(parentNode);
      currentNode = parentNode;
    }
  }

  updateFCost(current, neighbor) {
    return this.calculateGCost(current) + this.calculateHCost(neighbor);
  }

  calculateGCost(current) {
    // one is just the distance between current and neighbor since we will only
    // calculateGCost when we are evaluating neighbors in cardinal directions
    return current.gCost + 1;
  }

  calculateHCost(node) {
    const dx = Math.abs(node.x - this.targetNode.x);
    const dy = Math.abs(node.y - this.targetNode.y);
    return 1 * (dx * dy);
  }
}
