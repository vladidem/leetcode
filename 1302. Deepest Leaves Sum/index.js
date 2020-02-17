const TreeNode = require('../helpers/TreeNode');

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
