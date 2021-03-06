const { CustomStack } = require('./index');

describe('1381. Design a Stack With Increment Operation', () => {
  test('Custom stack converts to array correctly', () => {
    let stack = new CustomStack(3);

    stack.push(2);
    stack.push(3);
    stack.push(4);
    expect(stack.toArray()).toEqual([2, 3, 4]);
  });

  test('Custom stack operations work correctly, leetcode case 1', () => {
    let stack = new CustomStack(3);
    stack.push(1);
    stack.push(2);

    expect(stack.pop()).toBe(2);

    stack.push(2);
    stack.push(3);
    stack.push(4);
    stack.increment(5, 100);
    stack.increment(2, 100);

    expect(stack.pop()).toBe(103);
    expect(stack.pop()).toBe(202);
    expect(stack.pop()).toBe(201);
    expect(stack.pop()).toBe(-1);
  });
});
