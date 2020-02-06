class ListNode {
  constructor(val, prev, next) {
    this.val = val;
    this.prev = prev;
    this.next = next;
  }
}

class MyLinkedList {
  /**
   * Initialize your data structure here.
   */
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  isEmpty() {
    return this.length === 0;
  }

  getNode(index) {
    if (index > this.length - 1) {
      return;
    }
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  /**
   * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
   * @param {number} index
   * @return {number}
   */
  get(index) {
    const currentNode = this.getNode(index);

    if (!currentNode) {
      return -1;
    }

    return currentNode.val;
  }

  initialize(val) {
    const node = new ListNode(val);

    this.head = node;
    this.tail = node;
    this.length = 1;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
   * @param {number} val
   * @return {void}
   */
  addAtHead(val) {
    if (this.isEmpty()) {
      this.initialize(val);
    } else {
      const exHead = this.head;
      exHead.prev = this.head = new ListNode(val, null, exHead);

      this.length += 1;
    }
  }

  /**
   * Append a node of value val to the last element of the linked list.
   * @param {number} val
   * @return {void}
   */
  addAtTail(val) {
    if (this.isEmpty()) {
      this.initialize(val);
    } else {
      const exTail = this.tail;
      exTail.next = this.tail = new ListNode(val, exTail, null);

      this.length += 1;
    }
  }

  deleteAtHead() {
    if (this.isEmpty()) {
      return;
    }
    if (this.length === 1) {
      return this.clear();
    }

    this.head = this.head.next;

    this.length -= 1;
  }

  deleteAtTail() {
    if (this.isEmpty()) {
      return;
    }
    if (this.length === 1) {
      return this.clear();
    }

    this.tail = this.tail.prev;

    this.length -= 1;
  }

  /**
   * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted.
   * @param {number} index
   * @param {number} val
   * @return {void}
   */
  addAtIndex(index, val) {
    if (index > this.length) {
      return;
    }
    if (index === 0) {
      return this.addAtHead(val);
    }
    if (index === this.length) {
      return this.addAtTail(val);
    }

    const nextNode = this.getNode(index);
    const previousNode = nextNode.prev;

    previousNode.next = nextNode.prev = new ListNode(
      val,
      previousNode,
      nextNode,
    );

    this.length += 1;
  }

  /**
   * Delete the index-th node in the linked list, if the index is valid.
   * @param {number} index
   * @return {void}
   */
  deleteAtIndex(index) {
    if (index > this.length - 1) {
      return;
    }
    if (index === 0) {
      return this.deleteAtHead();
    }
    if (index === this.length - 1) {
      return this.deleteAtTail();
    }

    const nodeToDelete = this.getNode(index);
    const previousNode = nodeToDelete.prev;
    const nextNode = nodeToDelete.next;

    previousNode.next = nextNode;
    nextNode.prev = previousNode;

    this.length -= 1;
  }
}

/*
["MyLinkedList",
"addAtHead",
"deleteAtIndex",
"addAtHead",
"addAtHead",
"addAtHead",
"addAtHead",
"addAtHead",
"addAtTail",
"get",
"deleteAtIndex",
"deleteAtIndex"]
 [[],[2],[1],[2],[7],[3],[2],[5],[5],[5],[6],[4]]
*/
const linkedList = new MyLinkedList(); // Initialize empty LinkedList
linkedList.addAtHead(2);
linkedList.deleteAtIndex(1);
linkedList.addAtHead(2);
linkedList.addAtHead(7);
linkedList.addAtHead(3);
linkedList.addAtHead(2);
linkedList.addAtHead(5);
linkedList.addAtTail(5);
linkedList.get(5);
linkedList.deleteAtIndex(6);
linkedList.deleteAtIndex(4);
