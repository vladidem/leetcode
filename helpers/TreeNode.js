class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }

  /**
   * @param {number[]} array
   */
  static treeFromArray(array) {
    const root = new TreeNode(array[0]);
    const queue = [root];

    for (let i = 1; i < array.length; i += 2) {
      const currentNode = queue.shift();

      if (array[i] !== null) {
        currentNode.left = new TreeNode(array[i]);
        queue.push(currentNode.left);
      }

      if (array[i + 1] !== null) {
        currentNode.right = new TreeNode(array[i + 1]);
        queue.push(currentNode.right);
      }
    }

    return root;
  }
}

module.exports = TreeNode;
