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

Object.defineProperty(Object, 'fromEntries', {
  value: (iterable) => {
    return [...iterable].reduce((obj, [key, val]) => {
      obj[key] = val;
      return obj;
    }, {});
  },
});

// Priority Queue taken from https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript
const top = 0;
const parent = (i) => ((i + 1) >>> 1) - 1;
const left = (i) => (i << 1) + 1;
const right = (i) => (i + 1) << 1;

class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[top];
  }
  push(...values) {
    values.forEach((value) => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild =
        right(node) < this.size() && this._greater(right(node), left(node))
          ? right(node)
          : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}

////////

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
