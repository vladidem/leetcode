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

      // break if trailing nulls are omitted
      if (i + 1 === array.length) {
        break;
      }

      if (array[i + 1] !== null) {
        currentNode.right = new TreeNode(array[i + 1]);
        queue.push(currentNode.right);
      }
    }

    return root;
  }

  static removeTrailingNulls(array) {
    const res = [...array];

    while (res[res.length - 1] === null) {
      res.pop();
    }

    return res;
  }

  /**
   * @return {number[]}
   */
  static treeToArray(root) {
    let nextLevel = [root];
    let nextLevelValues = [root.val];
    let level;
    const res = [];

    while (nextLevel.length) {
      res.push(...nextLevelValues);

      level = nextLevel;
      nextLevelValues = [];
      nextLevel = [];

      for (let node of level) {
        if (node.left) {
          nextLevel.push(node.left);
          nextLevelValues.push(node.left.val);
        } else {
          nextLevelValues.push(null);
        }

        if (node.right) {
          nextLevel.push(node.right);
          nextLevelValues.push(node.right.val);
        } else {
          nextLevelValues.push(null);
        }
      }
    }

    return TreeNode.removeTrailingNulls(res);
  }
}

module.exports = TreeNode;
