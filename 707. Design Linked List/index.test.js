const { MyLinkedList } = require('./index');

describe('707. Design Linked List', () => {
  test('linked list should behave as expected, case 1', () => {
    let linkedList = new MyLinkedList();
    linkedList.addAtHead(1); // [1]
    linkedList.addAtTail(3); // [1, 3]
    linkedList.addAtIndex(1, 2); // [1, 2, 3]

    expect(linkedList.toArray()).toEqual([1, 2, 3]);
    expect(linkedList.get(1)).toBe(2);

    linkedList.deleteAtIndex(1); // [1, 3]

    expect(linkedList.get(1)).toBe(3);
  });

  test('linked list should behave as expected, case 2', () => {
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
