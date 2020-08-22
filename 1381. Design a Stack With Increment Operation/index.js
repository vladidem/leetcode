class CustomStack {
  /**
   * @param {number} maxSize
   */
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.items = [];
  }

  /**
   * @return {boolean}
   */
  canModify() {
    return this.items.length < this.maxSize;
  }

  /**
   * @param {number} item
   * @return {void}
   */
  push(item) {
    if (!this.canModify()) {
      return;
    }

    this.items.push(item);
  }

  /**
   * @return {number}
   */
  pop() {
    return this.items.pop() || -1;
  }

  /**
   * @param {number} k
   * @param {number} val
   * @return {void}
   */
  increment(k, val) {
    for (let i = 0; i < this.items.length && i < k; i++) {
      this.items[i] += val;
    }
  }

  /**
   * @return {number[]}
   */
  toArray() {
    return [...this.items];
  }
}

module.exports = { CustomStack };
