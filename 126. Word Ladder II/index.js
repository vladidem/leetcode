if (!Array.prototype.last) {
  Array.prototype.last = function() {
    return this.slice(-1)[0];
  };
}

Object.defineProperty(Array.prototype, 'flat', {
  value: function(depth = 1) {
    return this.reduce(function(flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth > 1
          ? toFlatten.flat(depth - 1)
          : toFlatten,
      );
    }, []);
  },
});

const isNeighbours = (wordA, wordB, maxDistance = 1) => {
  let distance = 0;

  for (let i in wordA) {
    if (wordA[i] !== wordB[i]) {
      distance += 1;

      if (distance > maxDistance) {
        return false;
      }
    }
  }

  return true;
};

const addWord = (tree, word) => {
  tree[word] = [];

  for (let treeWord in tree) {
    if (word === treeWord) {
      continue;
    }
    if (isNeighbours(treeWord, word)) {
      tree[treeWord].push(word);
      tree[word].push(treeWord);
    }
  }
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
  const tree = {};

  for (let word of wordList) {
    addWord(tree, word);
  }

  return tree;
};

/**
 * Dijkstra based distance finding
 *
 * @param {Object<string, string[]>} adjacencyList
 * @returns {Object<string, number>}
 */
const findDistances = (adjacencyList, beginWord) => {
  const words = Object.keys(adjacencyList);
  const distances = {};
  const visited = {};

  const closestUnvisited = () => {
    return words
      .filter((w) => !visited[w])
      .sort((a, b) => (distances[a] > distances[b] ? 1 : -1))
      .shift();
  };

  for (const word in adjacencyList) {
    if (word !== beginWord) {
      distances[word] = Number.MAX_VALUE;
    } else {
      distances[word] = 0;
    }
    visited[word] = false;
  }

  while (true) {
    const current = closestUnvisited();

    if (!current) {
      break;
    }

    visited[current] = true;
    const currentDistance = distances[current];

    for (const neighbour of adjacencyList[current]) {
      const neighbourDistance = currentDistance + 1;

      if (distances[neighbour] > neighbourDistance) {
        visited[neighbour] = false;
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
  const adjustedWords = [...wordList, beginWord];
  const adjacencyList = createGraph(adjustedWords);

  const distances = findDistances(adjacencyList, beginWord);

  const paths = backtrackPaths(adjacencyList, distances, endWord);

  return paths;
};

const words = ['hot', 'dot', 'dog', 'lot', 'log'];

const res = findLadders('hit', 'cog', words);

const test = 1;
