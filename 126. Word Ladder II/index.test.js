const { findLadders } = require('./index');

describe('126. Word Ladder II', () => {
  test('ladders should be found', () => {
    let beginWord = 'hit';
    let endWord = 'cog';
    let wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];

    const paths = [
      ['hit', 'hot', 'dot', 'dog', 'cog'],
      ['hit', 'hot', 'lot', 'log', 'cog'],
    ];

    expect(findLadders(beginWord, endWord, wordList)).toEqual(
      expect.arrayContaining(paths),
    );
  });

  test('ladders should not be found', () => {
    let beginWord = 'hit';
    let endWord = 'cog';
    let wordList = ['hot', 'dot', 'dog', 'lot', 'log'];

    expect(findLadders(beginWord, endWord, wordList)).toEqual([]);
  });
});
