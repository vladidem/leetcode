const { numTeams, subArrays } = require('./index');

describe('1395. Count Number of Teams', () => {
  test('Teams should be created and counted', () => {
    let ratings;
    ratings = [2, 5, 3, 4, 1];
    expect(numTeams(ratings)).toBe(3);

    ratings = [2, 1, 3];
    expect(numTeams(ratings)).toBe(0);

    ratings = [1, 2, 3, 4];
    expect(numTeams(ratings)).toBe(4);

    ratings = [4, 7, 9, 5, 10, 8, 2, 1, 6];
    expect(numTeams(ratings)).toBe(24);

    ratings = [80,58,2,94,53,40,22,65,11,67,68,64,88,44,70,85,55,50,1,45,60,17,35,21,28,87,92,41,10,62,33,57,7,20,42,8,4,46,71,76,25,13,19,5,73]
    expect(numTeams(ratings)).toBe(5209);
  });
});

describe('subArrays', () => {
  test('Array should be divided into intersecting subarrays', () => {
    let array;
    let subSize;
    let subArraysRes;

    array = [2, 5, 3, 4, 1];
    subSize = 3;
    subArraysRes = [
      [2, 5, 3],
      [5, 3, 4],
      [3, 4, 1],
    ];

    expect(subArrays(array, subSize)).toEqual(
      expect.arrayContaining(subArraysRes),
    );
  });
});


describe('array equality', () => {
  test('Array equality should be checked truly', () => {
    expect([1,2,3].isEqual([1,2,3])).toEqual(
      true
    );
  });
});
