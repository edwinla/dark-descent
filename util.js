export class BinaryMinHeap {
  constructor(comparator) {
    this.store = [];
    this.comparator = comparator;
  }

  count() {
    return this.store.length;
  }

  push(node) {
    this.store.push(node);
    this.heapifyUp(this.store.length - 1);
  }

  extract() {
    const extracted = this.store[0];
    const maxNode = this.store.pop();

    if (this.store.length > 0) {
      this.store[0] = maxNode;
      this.heapifyDown(0);
    }

    return extracted;
  }

  remove(node) {
    for (let i = 0; i < this.store.length; i++) {
      if (this.store[i] !== node) continue;

      const max = this.store.pop();

      if (i === this.store.length - 1) break;

      this.store[i] = max;
      this.heapifyUp(i);
      this.heapifyDown(i);
      break;
    }
  }

  recompareNode(node) {
    this.heapifyDown(this.store.indexOf(node));
  }

  heapifyDown(index) {
    const heapifyNode = this.store[index],
    childIndices = this.getChildIndices(index);
    if (childIndices.length > 0) {
      let swapIndex = null;

      childIndices.forEach(childIndex => {
        const child = this.store[childIndex];
        if (this.comparator(heapifyNode, child) === 1) {
          swapIndex = childIndex;
        }
      });

      if (!swapIndex) return;

      this.swapNodes(heapifyNode, index, swapIndex);

      this.heapifyDown(swapIndex);
    }
  }

  heapifyUp(index) {
    if (index > 0) {
      const heapifyNode = this.store[index],
      parentIndex = this.getParentIndex(index);
      const parent = this.store[parentIndex];

      if (this.comparator(heapifyNode, parent) === 1) return;

      this.swapNodes(heapifyNode, index, parentIndex);

      this.heapifyUp(parentIndex);
    }
  }

  swapNodes(heapifyNode, currentIndex, swapIndex) {
    this.store[currentIndex] = this.store[swapIndex];
    this.store[swapIndex] = heapifyNode;
  }

  getParentIndex(index) {
    return Math.floor((index + 1) / 2) - 1;
  }

  getChildIndices(index) {
    const indices = [],
    storeSize = this.store.length,
    childIndex2 = (index + 1) * 2,
    childIndex1 = childIndex2 - 1;

    if (childIndex2 < storeSize) indices.push(childIndex2);
    if (childIndex1 < storeSize) indices.push(childIndex1);
    return indices;
  }

}
