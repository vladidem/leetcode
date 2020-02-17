require('../helpers/defineArrayFlat')();
require('../helpers/defineArrayLast')();
require('../helpers/defineObjectFromEntries')();

const PriorityQueue = require('../helpers/PriorityQueue');

const isNeighbours = (wordA, wordB, maxDistance = 1) => {
  let distance = 0;

  for (let i = 0; i < wordA.length; i++) {
    if (wordA[i] !== wordB[i]) {
      distance += 1;

      if (distance > maxDistance) {
        return false;
      }
    }
  }

  return true;
};

const addWord = (graphEntries, word) => {
  const wordNeighbours = [];

  for (let i = 0; i < graphEntries.length; i++) {
    // tree entry looks like ['word', ['neighbour1', 'neighbour2']]
    const treeWord = graphEntries[i][0];

    if (isNeighbours(treeWord, word)) {
      graphEntries[i][1].push(word);
      wordNeighbours.push(treeWord);
    }
  }

  graphEntries.push([word, wordNeighbours]);
};

/**
 * Create graph, represented as an adjacency list
 *
 * {
 *    word: [word, word, word]
 * }
 *
 * @param {string[]} wordList
 * @returns {Object<string, string[]>}
 */
const createGraph = (wordList) => {
  const graphEntries = [];

  for (let word of wordList) {
    addWord(graphEntries, word);
  }

  return Object.fromEntries(graphEntries);
};

/**
 * Dijkstra based distance finding
 *
 * @param {Object<string, string[]>} adjacencyList
 * @returns {Object<string, number>}
 */
const findDistances = (adjacencyList, beginWord) => {
  const unvisited = new PriorityQueue((a, b) => distances[a] < distances[b]);
  const distances = {};

  for (const word in adjacencyList) {
    if (word !== beginWord) {
      distances[word] = Number.MAX_VALUE;
    } else {
      distances[word] = 0;
    }
    unvisited.push(word);
  }

  while (true) {
    const current = unvisited.pop();

    if (!current) {
      break;
    }

    const currentDistance = distances[current];

    for (const neighbour of adjacencyList[current]) {
      const neighbourDistance = currentDistance + 1;

      if (distances[neighbour] > neighbourDistance) {
        unvisited.push(neighbour);
        distances[neighbour] = neighbourDistance;
      }
    }
  }

  return distances;
};

const backtrackPaths = (adjacencyList, distances, endWord) => {
  // return empty array, if end word is inaccessable
  if (!distances[endWord] || distances[endWord] === Number.MAX_VALUE) {
    return [];
  }

  let paths = [[endWord]];

  const getNextSteps = (path) => {
    const currentWord = path.last();
    return adjacencyList[currentWord].filter(
      (nextWord) => distances[currentWord] === distances[nextWord] + 1,
    );
  };

  // let currentWord = endWord;

  for (let i = 0; i < distances[endWord]; i++) {
    paths = paths
      // for each possible next step append path with it
      .map((path) => getNextSteps(path).map((nextStep) => [...path, nextStep]))
      // flatten, because instead of array of paths we have array of arrays of continued paths
      .flat(1);
  }

  return paths.map((path) => path.reverse());
};

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
const findLadders = function(beginWord, endWord, wordList) {
  const adjustedWords = wordList;
  if (!adjustedWords.includes(beginWord)) {
    adjustedWords.push(beginWord);
  }

  const adjacencyList = createGraph(adjustedWords);
  const distances = findDistances(adjacencyList, beginWord);

  const paths = backtrackPaths(adjacencyList, distances, endWord);

  return paths;
};

module.exports = { findLadders };
