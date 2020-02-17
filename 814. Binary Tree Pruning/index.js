const TreeNode = require('../helpers/TreeNode');

const isNodePrunable = (node) => {
  if (!node) {
    return true;
  }

  return node.val === 0;
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
 * @return {TreeNode}
 */
var pruneTree = function(root) {
  const nodeStatuses = new Map();

  const shouldSubtreeBePruned = (node) => {
    if (!node) {
      return true;
    }

    if (nodeStatuses.has(node)) {
      return nodeStatuses.get(node);
    }

    const res =
      isNodePrunable(node) &&
      shouldSubtreeBePruned(node.right) &&
      shouldSubtreeBePruned(node.left);

    nodeStatuses.set(node, res);

    return res;
  };

  let nextLevel = [root];
  let level;

  while (nextLevel.length) {
    level = nextLevel;
    nextLevel = [];

    for (let node of level) {
      if (shouldSubtreeBePruned(node.left)) {
        node.left = null;
      } else {
        nextLevel.push(node.left);
      }

      if (shouldSubtreeBePruned(node.right)) {
        node.right = null;
      } else {
        nextLevel.push(node.right);
      }
    }
  }

  return root;
};

module.exports = { pruneTree, TreeNode };
