const {Failed, Passed, objectToCompare, sumOfOdd, waysToMake} = require('./testFunctions');

// ============================

// github1s.com
  // testing hooks
  // describe
  // beforeAll
  // beforeEach

// ============================

test('Ways to make a number via addition, with only positive inputs. Allowing for multiple number uses.', () => {
  expect(waysToMake(4, [2,1])).toBe(3);
  expect(waysToMake(8, [3,2,1])).toBe(10);
  expect(waysToMake(0, [3,2,1])).toBe(0);
  expect(waysToMake(25, [3,2,1])).toBe(65);
})


test('Correct Class Construction', () => {
  let passedClass = new Passed(['Tyrian', 'John', 'Henry'])
  expect(passedClass.names).toEqual(['Tyrian', 'John', 'Henry'])
})

test('Compare Objects', () => {
  expect(objectToCompare).toMatchObject(objectToCompare);
})
test('Compare Objects Another Way', () => {
  const obj = {house: 'Lannister'};
  expect(obj).toEqual({house: 'Lannister'});
})
test('To Throw Error', () => {
  const expectedError = new Error('My Expected Error Message');
  expect(() => new Failed(-5)).toThrow(expectedError);
})
test('Adding Only Odd Numbers together', () => {
  expect(sumOfOdd([1,2,3,4,5,6])).toBe(9);  // x === x
})