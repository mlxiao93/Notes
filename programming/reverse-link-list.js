class Node {
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }

  toString() {
    return this.val;
  }
}

const nodes = Array(10).fill(null).map((v, i) => new Node(i));
nodes.reduce((acc, item) => {
  if (acc) acc.next = item;
  return item;
}, null)

/**
 * 反转链表
 */
function reverse(head) {
  let root = head;
  let current = head;
  let next = head.next;
  while (current && next) {
    root = next;

    const _next = next.next;
    next.next = current;

    current = next;
    next = _next;
  };
  return root;
}

// const node = reverse(nodes[0]);

// console.log(node);


