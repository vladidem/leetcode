const {
  groupThePeople
} = require('./index');

describe('1282. Group the People Given the Group Size They Belong To', () => {
  test('numbers are correctly grouped', () => {
    let groupSizes;
    let groups;

    groupSizes = [2,1,3,3,3,2]
    groups = [[1],[0,5],[2,3,4]]

    expect(groupThePeople(groupSizes)).toEqual(expect.arrayContaining(groups));
  });
});
