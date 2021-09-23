const {createLinkedList, printLinkedList} = require('./index');

test('Create a linked list', async() => {
  const {root, node} = await createLinkedList(null, [1,1,1,1,2,2,3,4,5,5,5]);
  expect(root.value).toBe(1);
  expect(node.previous.value).toBe(5);
  expect(printLinkedList(root)).toStrictEqual([1,1,1,1,2,2,3,4,5,5,5])

  // createLinkedList(null, [1,1,1,1,2,2,3,4,5,5,5]).then(({root, node}) => {
  //   // In-situ ordering. (Without using the doubly-linked-list previous.)
  //   printLinkedList(root); // 1,2,3,4,5
  // })
})