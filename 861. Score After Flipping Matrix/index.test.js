const {
  Matrix,
  ColMatrixToggle,
  RowMatrixToggle,
  matrixScore,
} = require('./index');

describe('861. Score After Flipping Matrix', () => {
  test('matrix is correctly read', () => {
    let rows;
    let convertedRows;
    let matrix;

    rows = [
      [0, 0, 1, 1],
      [1, 0, 1, 0],
      [1, 1, 0, 0],
    ];
    convertedRows = [3, 10, 12];
    matrix = Matrix.fromRows(rows);
    expect(matrix.numbers).toEqual(expect.arrayContaining(convertedRows));
    expect(matrix.numberMask).toEqual(15);

    rows = [
      [0, 0, 1, 1, 1],
      [1, 0, 1, 0, 0],
      [1, 1, 0, 0, 1],
    ];
    convertedRows = [7, 20, 25];
    matrix = Matrix.fromRows(rows);
    expect(matrix.numbers).toEqual(expect.arrayContaining(convertedRows));
    expect(matrix.numberMask).toEqual(31);
  });

  test('matrixes are compared correctly', () => {
    let rows;

    rows = [
      [0, 0, 1, 1],
      [1, 0, 1, 0],
      [1, 1, 0, 0],
    ];
    expect(Matrix.fromRows(rows).equals(Matrix.fromRows(rows))).toBe(true);

    rows = [
      [0, 0, 1, 1, 1],
      [1, 0, 1, 0, 0],
      [1, 1, 0, 0, 1],
    ];
    expect(Matrix.fromRows(rows).equals(Matrix.fromRows(rows))).toBe(true);
  });

  test('matrix permutations are working correctly', () => {
    let rows;
    let permutatedRows;
    let permutation;
    let matrix;
    let permutatedMatrix;

    rows = [[0, 0, 1, 1]];
    permutatedRows = [[1, 0, 1, 1]];
    permutation = new ColMatrixToggle(0);

    matrix = permutation.apply(Matrix.fromRows(rows));
    permutatedMatrix = Matrix.fromRows(permutatedRows);
    expect(matrix.equals(permutatedMatrix)).toBe(true);

    rows = [[0, 0, 1, 1]];
    permutatedRows = [[1, 1, 0, 0]];
    permutation = new RowMatrixToggle(0);

    matrix = permutation.apply(Matrix.fromRows(rows));
    permutatedMatrix = Matrix.fromRows(permutatedRows);
    expect(matrix.equals(permutatedMatrix)).toBe(true);
  });

  test('matrix score calculated correctly', () => {
    let rows;
    let score;

    rows = [
      [0, 0, 1, 1],
      [1, 0, 1, 0],
      [1, 1, 0, 0],
    ];
    score = 39;

    expect(matrixScore(rows)).toEqual(score);

    rows = [
      [0, 0],
      [0, 1],
      [1, 1],
      [0, 1],
      [1, 1],
      [0, 0],
      [1, 1],
      [0, 0],
    ];
    score = 22;
    expect(matrixScore(rows)).toEqual(score);

    rows = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
      [1, 1, 0],
      [1, 0, 1],
      [0, 1, 0],
      [0, 0, 1],
    ];
    score = 52;
    expect(matrixScore(rows)).toEqual(score);
  });
});
