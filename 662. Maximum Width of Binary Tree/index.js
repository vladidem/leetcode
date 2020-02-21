const TreeNode = require('../helpers/TreeNode');

Array.prototype.findLast = function findLast(predicate) {
  for (let i = this.length - 1; i >= 0; --i) {
    const x = this[i];
    if (predicate(x)) {
      return x;
    }
  }
};

const levelWidth = (level, nodeIndexes) => {
  const leftNode = level.find((node) => node);
  const rightNode = level.findLast((node) => node);

  if (!leftNode && !rightNode) {
    return 0;
  }

  return nodeIndexes.get(rightNode) - nodeIndexes.get(leftNode) + 1;
};

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
const widthOfBinaryTree = function(root) {
  const nodeIndexes = new Map();
  nodeIndexes.set(root, 0);

  let nextLevel = [root];
  let level;
  const widths = [];

  while (true) {
    const width = levelWidth(nextLevel, nodeIndexes);
    if (width <= 0) {
      break;
    }

    widths.push(width);
    level = nextLevel;
    nextLevel = [];

    for (let node of level) {
      const nodeIndex = nodeIndexes.get(node);

      if (node.left) {
        const leftChildIndex = nodeIndex * 2;

        nextLevel.push(node.left);
        nodeIndexes.set(node.left, leftChildIndex);
      }
      if (node.right) {
        const rightChildIndex = nodeIndex * 2 + 1;

        nextLevel.push(node.right);
        nodeIndexes.set(node.right, rightChildIndex);
      }
    }
  }

  return Math.max(...widths.filter((n) => !isNaN(n)));
};

module.exports = { widthOfBinaryTree, TreeNode };
