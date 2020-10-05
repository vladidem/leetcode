const { MyLinkedList } = require('./index');

describe('707. Design Linked List', () => {
  test('linked list should be initiated', () => {
    let linkedList = new MyLinkedList();

    linkedList.addAtTail(2);
    expect(linkedList.get(0)).toBe(2);

    linkedList = new MyLinkedList();

    linkedList.addAtHead(12);
    expect(linkedList.get(0)).toBe(12);
  });

  test('linked list empty deletions should do nothing', () => {
    let linkedList = new MyLinkedList();

    expect(linkedList.deleteAtTail()).toBe(undefined);
    expect(linkedList.deleteAtHead()).toBe(undefined);

    expect(linkedList.toArray()).toEqual([]);
  });

  test('linked list head element should be deleted', () => {
    let linkedList = new MyLinkedList();

    linkedList.addAtHead(2); // [2]
    linkedList.addAtHead(2); // [2, 2]
    linkedList.addAtHead(7); // [7, 2, 2]
    linkedList.addAtHead(3); // [3, 7, 2, 2]
    linkedList.addAtHead(2); // [2, 3, 7, 2, 2]
    linkedList.addAtHead(5); // [5, 2, 3, 7, 2, 2]

    linkedList.deleteAtHead();
    expect(linkedList.toArray()).toEqual([2, 3, 7, 2, 2]);

    linkedList.deleteAtHead();
    expect(linkedList.toArray()).toEqual([3, 7, 2, 2]);
  });

  test('linked list tail element should be deleted', () => {
    let linkedList = new MyLinkedList();

    linkedList.addAtHead(2); // [2]
    linkedList.addAtHead(2); // [2, 2]
    linkedList.addAtHead(7); // [7, 2, 2]
    linkedList.addAtHead(3); // [3, 7, 2, 2]
    linkedList.addAtHead(2); // [2, 3, 7, 2, 2]
    linkedList.addAtHead(5); // [5, 2, 3, 7, 2, 2]

    linkedList.deleteAtTail();
    expect(linkedList.toArray()).toEqual([5, 2, 3, 7, 2]);

    linkedList.deleteAtTail();
    expect(linkedList.toArray()).toEqual([5, 2, 3, 7]);
  });

  test('empty linked list deletions should do nothing', () => {
    let linkedList = new MyLinkedList();

    expect(linkedList.deleteAtTail()).toBe(undefined);
    expect(linkedList.deleteAtHead()).toBe(undefined);

    expect(linkedList.toArray()).toEqual([]);
  });

  test('one element linked list deletions should clear', () => {
    let linkedList = new MyLinkedList();

    linkedList.addAtHead(2);
    linkedList.deleteAtTail();
    expect(linkedList.toArray()).toEqual([]);

    linkedList.addAtHead(2);
    linkedList.deleteAtHead();
    expect(linkedList.toArray()).toEqual([]);
  });

  test('linked list add at index on invalid index should do nothing', () => {
    let linkedList = new MyLinkedList();

    linkedList.addAtIndex(10, 2);
    expect(linkedList.toArray()).toEqual([]);
  });

  test('linked list add at 0 index should add at head', () => {
    let linkedList = new MyLinkedList();

    linkedList.addAtHead(2); // [2]
    linkedList.addAtHead(2); // [2, 2]
    linkedList.addAtHead(7); // [7, 2, 2]
    linkedList.addAtIndex(0, 2);
    expect(linkedList.toArray()).toEqual([2, 7, 2, 2]);
  });

  test('linked list add at length index should add at head', () => {
    let linkedList = new MyLinkedList();

    linkedList.addAtHead(2); // [2]
    linkedList.addAtHead(2); // [2, 2]
    linkedList.addAtHead(7); // [7, 2, 2]
    linkedList.addAtIndex(3, 2);
    expect(linkedList.toArray()).toEqual([7, 2, 2, 2]);
  });

  test('linked list get should return -1 for invalid index', () => {
    let linkedList = new MyLinkedList();

    linkedList.addAtHead(2);
    linkedList.addAtHead(7);
    linkedList.addAtHead(5);

    expect(linkedList.get(4)).toBe(-1);
  });

  test('linked list should be cleared', () => {
    let linkedList = new MyLinkedList();

    linkedList.addAtTail(2);
    linkedList.addAtHead(2);
    linkedList.addAtHead(7);
    linkedList.addAtHead(3);
    linkedList.addAtHead(2);
    linkedList.addAtHead(5);

    linkedList.clear();
    expect(linkedList.toArray()).toEqual([]);
  });

  test('linked list should behave as expected, leetcode case 1', () => {
    let linkedList = new MyLinkedList();
    linkedList.addAtHead(1); // [1]
    linkedList.addAtTail(3); // [1, 3]
    linkedList.addAtIndex(1, 2); // [1, 2, 3]

    expect(linkedList.toArray()).toEqual([1, 2, 3]);
    expect(linkedList.get(1)).toBe(2);

    linkedList.deleteAtIndex(1); // [1, 3]

    expect(linkedList.get(1)).toBe(3);
  });

  test('linked list should behave as expected, leetcode case 2', () => {
    let linkedList = new MyLinkedList();

    linkedList = new MyLinkedList();
    linkedList.addAtHead(2); // [2]
    linkedList.deleteAtIndex(1);
    linkedList.addAtHead(2); // [2, 2]
    linkedList.addAtHead(7); // [7, 2, 2]
    linkedList.addAtHead(3); // [3, 7, 2, 2]
    linkedList.addAtHead(2); // [2, 3, 7, 2, 2]
    linkedList.addAtHead(5); // [5, 2, 3, 7, 2, 2]
    linkedList.addAtTail(5); // [5, 2, 3, 7, 2, 2, 5]

    expect(linkedList.toArray()).toEqual([5, 2, 3, 7, 2, 2, 5]);
    expect(linkedList.get(5)).toBe(2);

    linkedList.deleteAtIndex(6);
    linkedList.deleteAtIndex(4);

    expect(linkedList.toArray()).toEqual([5, 2, 3, 7, 2]);
  });
});
