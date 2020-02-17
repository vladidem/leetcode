const { pruneTree, TreeNode } = require('./index');

describe('814. Binary Tree Pruning', () => {
  test('binary tree should be correctly pruned', () => {
    let treeArray;
    let prunedTreeArray;

    const testPrunedTree = (treeArray, prunedTreeArray) => {
      let tree = TreeNode.treeFromArray(treeArray);

      expect(TreeNode.treeToArray(pruneTree(tree))).toEqual(prunedTreeArray);
    };

    treeArray = [1, null, 0, 0, 1];
    prunedTreeArray = [1, null, 0, null, 1];
    testPrunedTree(treeArray, prunedTreeArray);

    treeArray = [1, 0, 1, 0, 0, 0, 1];
    prunedTreeArray = [1, null, 1, null, 1];
    testPrunedTree(treeArray, prunedTreeArray);

    treeArray = [1, 1, 0, 1, 1, 0, 1, 0];
    prunedTreeArray = [1, 1, 0, 1, 1, null, 1];
    testPrunedTree(treeArray, prunedTreeArray);
  });
});
