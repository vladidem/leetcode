require('../helpers/defineArrayFlat')();

// https://stackoverflow.com/questions/29759480/how-to-customize-object-equality-for-javascript-set/29783624#29783624
class GeneralSet {
  constructor() {
    this.map = new Map();
    this[Symbol.iterator] = this.values;
  }

  add(item) {
    return this.map.set(item.toIdString(), item);
  }

  values() {
    return this.map.values();
  }

  delete(item) {
    return this.map.delete(item.toIdString());
  }

  has(item) {
    return this.map.has(item.toIdString());
  }
}

class RowMatrixToggle {
  constructor(row) {
    this.row = row;
  }
  apply(matrix) {
    const numbers = [...matrix.numbers];
    numbers[this.row] = ~numbers[this.row] & matrix.numberMask;

    return new Matrix(numbers, matrix.numberMask, matrix.digits);
  }
}

class ColMatrixToggle {
  constructor(col) {
    this.col = col;
  }

  apply(matrix) {
    const mask = 1 << (matrix.digits - (this.col + 1));
    const numbers = matrix.numbers.map((number) => number ^ mask);
    return new Matrix(numbers, matrix.numberMask, matrix.digits);
  }
}

class Matrix {
  /**
   * @param {number[]} numbers
   */
  constructor(numbers, numberMask, digits) {
    this.numbers = numbers;
    this.numberMask = numberMask;
    this.digits = digits;
  }

  equals(other) {
    if (this.numberMask !== other.numberMask) {
      return false;
    }
    for (let i = 0; i < this.numbers.length; i++) {
      if (this.numbers[i] !== other.numbers[i]) {
        return false;
      }
    }
    return true;
  }

  toIdString() {
    return this.numbers.join();
  }

  possiblePermutations() {
    const colPermutations = [...Array(this.digits)].map(
      (_, i) => new ColMatrixToggle(i),
    );
    const rowPermutations = [...Array(this.numbers.length)].map(
      (_, i) => new RowMatrixToggle(i),
    );

    return [...colPermutations, ...rowPermutations];
  }

  sum() {
    return this.numbers.reduce((prev, current) => prev + current, 0);
  }

  static calculateNumberMask(digits) {
    let mask = 0;
    for (let i = 0; i < digits; i++) {
      mask = (mask << 1) + 1;
    }
    return mask;
  }

  /**
   * @param {number[][]} rows
   */
  static fromRows(rows) {
    const digits = rows[0].length;
    const numbers = rows.map((row) => Number.parseInt(row.join(''), 2));
    const numberMask = this.calculateNumberMask(digits);

    return new Matrix(numbers, numberMask, digits);
  }
}

/**
 * @param {number[][]} rows
 * @return {number}
 */
var matrixScore = function (rows) {
  const initialMatrix = Matrix.fromRows(rows);
  const permutations = initialMatrix.possiblePermutations();
  const set = new GeneralSet();
  let currentMatrixes;
  let nextMatrixes = [initialMatrix];

  while (nextMatrixes.length > 0) {
    currentMatrixes = nextMatrixes;
    nextMatrixes = [];
    currentMatrixes.forEach((m) => set.add(m));
    currentMatrixes
      .map((m) => permutations.map((permutation) => permutation.apply(m)))
      .forEach((matrixes) => {
        nextMatrixes.push(...matrixes.filter((m) => !set.has(m)));
      });
  }

  return Math.max(...[...set.values()].map((m) => m.sum()));
};

module.exports = { Matrix, matrixScore, ColMatrixToggle, RowMatrixToggle };
