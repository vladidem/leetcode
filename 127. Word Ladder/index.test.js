const { ladderLength } = require('./index');

describe('127. Word Ladder', () => {
  test('ladder length should be found', () => {
    let beginWord = 'hit';
    let endWord = 'cog';
    let wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];

    expect(ladderLength(beginWord, endWord, wordList)).toBe(5);
  });

  test('ladder length should not be found', () => {
    let beginWord = 'hit';
    let endWord = 'cog';
    let wordList = ['hot', 'dot', 'dog', 'lot', 'log'];

    expect(ladderLength(beginWord, endWord, wordList)).toBe(0);
  });
});
