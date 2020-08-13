const {
  Matrix,
  ColMatrixFlip,
  RowMatrixFlip,
  matrixScore,
} = require('./index');

describe('861. Score After Flipping Matrix', () => {
  test('matrix is correctly read', () => {
    let numbers;
    let matrix;

    numbers = [
      [0, 0, 1, 1],
      [1, 0, 1, 0],
      [1, 1, 0, 0],
    ];
    matrix = new Matrix(numbers);

    expect(matrix.columns()).toEqual(expect.arrayContaining([0, 1, 2, 3]));
    expect(matrix.rows()).toEqual(expect.arrayContaining([0, 1, 2]));
    expect(matrix.numberMask).toEqual(15);
    expect(matrix.rowToNumber(0)).toEqual(3);
    expect(matrix.invertedRowToNumber(0)).toEqual(12);
    expect(matrix.rowToNumber(1)).toEqual(10);
    expect(matrix.rowToNumber(2)).toEqual(12);
    expect(matrix.sum()).toEqual(25);

    numbers = [
      [0, 0, 1, 1, 1],
      [1, 0, 1, 0, 0],
      [1, 1, 0, 0, 1],
    ];
    matrix = new Matrix(numbers);

    expect(matrix.columns()).toEqual(expect.arrayContaining([0, 1, 2, 3, 4]));
    expect(matrix.rows()).toEqual(expect.arrayContaining([0, 1, 2]));
    expect(matrix.rowToNumber(0)).toEqual(7);
    expect(matrix.rowToNumber(1)).toEqual(20);
    expect(matrix.rowToNumber(2)).toEqual(25);
    expect(matrix.sum()).toEqual(52);
  });

  test('matrix permutations are working correctly', () => {
    let numbers;
    let matrix;

    numbers = [
      [0, 0, 1, 1, 1],
      [1, 0, 1, 0, 0],
      [1, 1, 0, 0, 1],
    ];
    matrix = new Matrix(numbers);
    matrix.flipColumn(0);
    expect(matrix.rowToNumber(0)).toEqual(23);
    expect(matrix.rowToNumber(1)).toEqual(4);
    expect(matrix.rowToNumber(2)).toEqual(9);

    numbers = [
      [0, 0, 1, 1, 1],
      [1, 0, 1, 0, 0],
      [1, 1, 0, 0, 1],
    ];

    matrix = new Matrix(numbers);
    matrix.flipRow(0);
    expect(matrix.rowToNumber(0)).toEqual(24);
  });

  test('matrix score calculated correctly', () => {
    let numbers;
    let score;

    numbers = [
      [0, 0, 1, 1],
      [1, 0, 1, 0],
      [1, 1, 0, 0],
    ];
    score = 39;

    expect(matrixScore(numbers)).toEqual(score);

    numbers = [
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
    expect(matrixScore(numbers)).toEqual(score);

    numbers = [
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
    expect(matrixScore(numbers)).toEqual(score);
  });
});
