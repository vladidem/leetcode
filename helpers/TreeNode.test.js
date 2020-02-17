const TreeNode = require('./TreeNode');

describe('TreeNode', () => {
  test('TreeNode should turn into array it was created from', () => {
    let treeArray = [1, 0, 1, 0, 0, 0, 1];
    let tree = TreeNode.treeFromArray(treeArray);

    expect(TreeNode.treeToArray(tree)).toEqual(treeArray);

    treeArray = [1, null, 1, null, 1];
    tree = TreeNode.treeFromArray(treeArray);

    expect(TreeNode.treeToArray(tree)).toEqual(treeArray);

    treeArray = [1, 1, 0, 1, 1, 0, 1, 0];
    tree = TreeNode.treeFromArray(treeArray);

    expect(TreeNode.treeToArray(tree)).toEqual(treeArray);

    treeArray = [1, 1, 0, 1, 1, null, 1];
    tree = TreeNode.treeFromArray(treeArray);

    expect(TreeNode.treeToArray(tree)).toEqual(treeArray);
  });
});
