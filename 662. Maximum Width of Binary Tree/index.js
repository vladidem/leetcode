const TreeNode = require('../helpers/TreeNode');
const BigNumber = require('bignumber.js');

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

  return nodeIndexes.get(rightNode).minus(nodeIndexes.get(leftNode)).plus(1);
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
const widthOfBinaryTree = function (root) {
  const nodeIndexes = new Map();
  nodeIndexes.set(root, new BigNumber(0));

  let nextLevel = [root];
  let level;
  let width;
  const widths = [];

  while ((width = levelWidth(nextLevel, nodeIndexes)) > 0) {
    widths.push(width);
    level = nextLevel;
    nextLevel = [];

    for (let node of level) {
      const nodeIndex = nodeIndexes.get(node);

      if (node.left) {
        const leftChildIndex = nodeIndex.times(2);

        nextLevel.push(node.left);
        nodeIndexes.set(node.left, leftChildIndex);
      }
      if (node.right) {
        const rightChildIndex = nodeIndex.times(2).plus(1);

        nextLevel.push(node.right);
        nodeIndexes.set(node.right, rightChildIndex);
      }
    }
  }

  return BigNumber.max(...widths);
};

module.exports = { widthOfBinaryTree, TreeNode, BigNumber };
