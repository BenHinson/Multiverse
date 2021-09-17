// Doubly Linked List.
class Node {
  constructor(value=null, previous=undefined) {
    this.value = value;
    this.next = undefined;
    this.previous = previous;
  }
}

async function createLinkedList(start=null, values=[]) {
  let root = new Node(start||values[0]);
  let node = root;
  (start ? values : values.slice(1)).forEach(number => {
    node.next = new Node(number, node);
    node = node.next;
  })
  return {root, node}
}

function printLinkedList(rootNode) {
  let order = [];
  while (rootNode) { order.push(rootNode.value); rootNode = rootNode.next; }
  console.log(order);
  return order;
}

module.exports = {createLinkedList, printLinkedList}


// ======================   QUESTIONS   ==========================

function Questions() {
  // Question: Linked List Ordering.
  createLinkedList(null, [7,23,91,4,16,32,4,73]).then(({root, node}) => {
    const makeMiddle = 31;
    let smaller = [], larger = [];
  
    node = root;
    while (node) {
      node.value > makeMiddle ? larger.push(node.value) : smaller.push(node.value);
      node = node.next;
    }
  
    createLinkedList(null, [...smaller, makeMiddle, ...larger]).then(({root, node}) => {
      printLinkedList(root); // [7, 23,  4, 16, 4, 31, 91, 32, 73]
    });
  });
  
  
  // Question: Remove Duplicates.
  createLinkedList(null, [1,1,1,1,2,2,3,4,5,5,5]).then(({root, node}) => {
    // In-situ ordering. (Without using the doubly-linked-list previous.)
    node = root;
    let prevNode = null;
    while (node) {
      prevNode && prevNode?.value === node.value
        ? prevNode.next = node.next
        : prevNode = node;
      node = node.next;
    }
    printLinkedList(root); // 1,2,3,4,5
  })
  
  
  // Question: Find the second to last Value
  createLinkedList(null, [1,2,3,4,5,6,7,8,9]).then(({root, node}) => {
    // Method 1: As this is a doubly linked list, we can reach the end and then step back two nodes.
    node = root;
    while (node.next) { // Get to the end of the linked list
      node = node.next;
    }
    console.log(node.previous.previous.value); // 7
  
    // Method 2: Because we know we need the node two from the end, we can check two spaces ahead of the current node for an undefined value (revealing the end of the linked-list). We can then return the node value we are currently on.
    node = root;
    while (node.next.next.next) { // null -> 1 -> 2 -> 3
      node = node.next;
    }
    console.log(node.value); // 7
  })
}