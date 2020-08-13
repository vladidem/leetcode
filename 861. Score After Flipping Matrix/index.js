class Matrix {
  constructor(numbers) {
    this.numbers = numbers;
    this.height = numbers.length;
    this.width = numbers[0].length;

    this.numberMask = this.getNumberMask(this.width);
  }

  getNumberMask(width) {
    let res = 0;
    for (let i = 0; i < width; i++) {
      res = (res << 1) + 1;
    }

    return res;
  }

  invertedRowToNumber(row) {
    return ~this.rowToNumber(row) & this.numberMask;
  }

  columns() {
    return [...Array(this.width)].map((_, index) => index);
  }

  rows() {
    return [...Array(this.height)].map((_, index) => index);
  }

  flipRow(row) {
    for (let i = 0; i < this.numbers[row].length; i++) {
      this.numbers[row][i] = this.flip(this.numbers[row][i]);
    }
  }

  flipColumn(column) {
    for (let i = 0; i < this.numbers.length; i++) {
      this.numbers[i][column] = this.flip(this.numbers[i][column]);
    }
  }

  flip(number) {
    if (number === 0) {
      return 1;
    }
    return 0;
  }

  countRow(row) {
    let count = 0;
    for (let i = 0; i < this.numbers[row].length; i++) {
      count += this.numbers[row][i];
    }

    return count;
  }

  shouldFlipRow(row) {
    return this.rowToNumber(row) < this.invertedRowToNumber(row);
  }

  countColumn(column) {
    let count = 0;
    for (let i = 0; i < this.numbers.length; i++) {
      count += this.numbers[i][column];
    }

    return count;
  }

  shouldFlipColumn(column) {
    return this.countColumn(column) < Math.ceil(this.height / 2);
  }

  rowToNumber(row) {
    let number = 0;
    for (let i = 0; i < this.width; i++) {
      number += this.numbers[row][i] * (1 << (this.width - i - 1));
    }

    return number;
  }

  sum() {
    let sum = 0;
    for (let i = 0; i < this.height; i++) {
      sum += this.rowToNumber(i);
    }

    return sum;
  }
}

/**
 * @param {number[][]} numbers
 * @return {number}
 */
var matrixScore = function (numbers) {
  const matrix = new Matrix(numbers);
  const columns = matrix.columns();
  const rows = matrix.rows();
  let changed;

  do {
    changed = false;
    rows.forEach((it) => {
      if (matrix.shouldFlipRow(it)) {
        matrix.flipRow(it);
        changed = true;
      }
    });
    columns.forEach((it) => {
      if (matrix.shouldFlipColumn(it)) {
        matrix.flipColumn(it);
        changed = true;
      }
    });
  } while (changed);

  return matrix.sum();
};

module.exports = { Matrix, matrixScore };
