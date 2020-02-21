const { widthOfBinaryTree, TreeNode, BigNumber } = require('./index');

describe('662. Maximum Width of Binary Tree', () => {
  test('binary tree width should be correctly counted', () => {
    let treeArray;
    let tree;

    treeArray = [1, 3, 2, 5, 3, null, 9];
    tree = TreeNode.treeFromArray(treeArray);
    expect(widthOfBinaryTree(tree)).toStrictEqual(new BigNumber(4));

    treeArray = [1, 3, null, 5, 3];
    tree = TreeNode.treeFromArray(treeArray);
    expect(widthOfBinaryTree(tree)).toStrictEqual(new BigNumber(2));

    treeArray = [1, 3, 2, 5, null, null, 9, 6, null, null, 7];
    tree = TreeNode.treeFromArray(treeArray);
    expect(widthOfBinaryTree(tree)).toStrictEqual(new BigNumber(8));

    let { treeArray1 } = require('./leetcode_bullshit_input');
    tree = TreeNode.treeFromArray(treeArray1);
    expect(widthOfBinaryTree(tree)).toStrictEqual(new BigNumber(1));
  });
});
