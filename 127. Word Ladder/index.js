require('../helpers/defineArrayFlat')();
require('../helpers/defineArrayLast')();
require('../helpers/defineObjectFromEntries')();

const PriorityQueue = require('../helpers/PriorityQueue');

const areNeighbours = (wordA, wordB, maxDistance = 1) => {
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

    if (areNeighbours(treeWord, word)) {
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

  let current;
  while (current = unvisited.pop()) {
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

/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
const ladderLength = function(beginWord, endWord, wordList) {
  const adjustedWords = wordList;
  if (!adjustedWords.includes(beginWord)) {
    adjustedWords.push(beginWord);
  }

  const adjacencyList = createGraph(adjustedWords);
  const distances = findDistances(adjacencyList, beginWord);

  const isAccessible =
    distances[endWord] && distances[endWord] !== Number.MAX_VALUE;

  // if word is inaccessible, return 0
  // otherwise return distance + 1 (distance doesnt count begin word)
  return isAccessible ? distances[endWord] + 1 : 0;
};

module.exports = { ladderLength };
