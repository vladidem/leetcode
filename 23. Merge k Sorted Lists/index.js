const mergeLists = (a, b) => {
  let head;
  let currentNode;
  let nextNode;

  while (!!a || !!b) {
      // if list "b" ended OR list "a" element is preceeding
      if (a && (!b || a.val < b.val)) {
          nextNode = a;
          a = a.next;
      } else {
          nextNode = b;
          b = b.next;
      }

      // init head on first iteration
      if (!head) {
          head = nextNode;
          currentNode = head;
      }
      // else push newfound item into result list
      else {
          currentNode.next = nextNode;
          currentNode = nextNode;
      }
  }

  return head;
};

var mergeKLists = function(lists) {
  while (lists.length > 1) {
      let newLists = [];
      const isEven = lists.length % 2 == 0;

      for (
          let i = 0;
          i < (isEven ? lists.length : lists.length - 1);
          i += 2
      ) {
          newLists.push(mergeLists(lists[i], lists[i + 1]));
      }

      if (!isEven) {
          newLists.push(lists[lists.length - 1]);
      }
      lists = newLists;
  }

  return lists[0] || null;
};

module.exports = { mergeKLists }
