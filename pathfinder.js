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

  aStarPathFinder() {
    const open = [this.startNode], closed = [], path = [];

    while (open.length > 0) {
      const current = this.findLowestFCost(open);
      open.splice(open.indexOf(current), 1);
      closed.push(current);

      if (current === this.targetNode) {
        return this.reconstructPath(path, current);
      }

      const neighbors = current.neighbors;

      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        if (neighbor.traversable || closed.indexOf(neighbor) !== -1) {
            continue;
        }
        const oldPath = neighbor.fCost;
        const newPath = neighbor.getFCost();

        if (newPath < oldPath || closed.indexOf(neighbor) === -1) {
          neighbor.fCost = newPath;
          neighbor.parent = current;

          if (open.indexOf(neighbor) === -1) {
            open.push(neighbor);
          }
        }
      }
    }
  }

  reconstructPath() {
    // calls parent from targetNode back to startNode
  }

  findLowestFCost(open) {
    let lowest = open[0];
    for (let i = 1; i < open.length; i++) {
      const nextNode = open[i];
      if (lowest.fCost > nextNode.fCost) {
        lowest = nextNode;
      }
    }
    return lowest;
  }

  updateFCost(current, neighbor) {
    return this.calculateGCost(current, neighbor) + this.calculateHCost;
  }

  calculateGCost(current, neighbor) {
    // one is just the distance between current and neighbor since we will only
    // calculateGCost when we are evaluating neighbors in cardinal directions
    return current.gCost + 1;
  }

  calculateHCost(node, goal) {
    const dx = Math.abs(node.x - goal.x);
    const dy = Math.abs(node.y - goal.y);
    return 1 * (dx * dy);
  }
}
