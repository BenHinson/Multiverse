// Doubly Linked List.

class Node {
  constructor(value=null, previous=undefined) {
    this.value = value;
    this.next = undefined;
    this.previous = previous;
  }
}

let root = new Node();
const values = [1,2,3,4,5,6,7,8,9]; //    null -> 1 -> 2 -> 3... 
let node = root;

values.forEach(number => {
  node.next = new Node(number, node);
  node = node.next;
})

console.log(node.value); // 9
console.log(node.previous.value); // 8
console.log(root.next.previous.value); // null (back to the root)

// ============================================================

// Question: Find the second to last Value

// Method 1: As this is a doubly linked list, we can reach the end and then step back two nodes.
    let qRoot = root;
    let qNode = qRoot;
    while (qNode.next) { // Get to the end of the linked list
      qNode = qNode.next;
    }
    console.log(qNode.previous.previous.value); // 7

// Method 2: Because we know we need the node two from the end, we can check two spaces ahead of the current node for an undefined value (revealing the end of the linked-list). We can then return the node value we are currently on.
    let xRoot = root;
    let xNode = xRoot;
    while (xNode.next.next.next) { // null -> 1 -> 2 -> 3
      xNode = xNode.next;
    }
    console.log(xNode.value); // 7