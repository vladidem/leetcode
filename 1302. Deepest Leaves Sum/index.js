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

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const deepestLeavesSum = function(root) {
  let nextLevel = [root];
  let level;

  while (nextLevel.length) {
    level = nextLevel;
    nextLevel = [];

    for (let node of level) {
      if (node.left) {
        nextLevel.push(node.left);
      }

      if (node.right) {
        nextLevel.push(node.right);
      }
    }
  }

  return level.reduce((summ, node) => summ + node.val, 0);
};

module.exports = { deepestLeavesSum, TreeNode };
