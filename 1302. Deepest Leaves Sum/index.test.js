const { deepestLeavesSum, TreeNode } = require('./index');

describe('1302. Deepest Leaves Sum', () => {
  test('Summ should be valid', () => {
    const tree = TreeNode.treeFromArray([
      1,
      2,
      3,
      4,
      5,
      null,
      6,
      7,
      null,
      null,
      null,
      null,
      8,
    ]);

    expect(deepestLeavesSum(tree)).toBe(15);
  });
});
