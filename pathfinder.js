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
