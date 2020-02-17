const { ladderLength } = require('./index');

describe('127. Word Ladder', () => {
  test('ladder lenght should be found', () => {
    let beginWord = 'hit';
    let endWord = 'cog';
    let wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog'];

    expect(ladderLength(beginWord, endWord, wordList)).toBe(5);
  });

  test('ladder lenght should not be found', () => {
    let beginWord = 'hit';
    let endWord = 'cog';
    let wordList = ['hot', 'dot', 'dog', 'lot', 'log'];

    expect(ladderLength(beginWord, endWord, wordList)).toBe(0);
  });
});
