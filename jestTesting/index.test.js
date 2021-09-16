let objectToCompare = {
  name: {
    'first': 'Greggor',
    'second': 'Clegane'
  },
}

class Failed {
  constructor(age) {
    if (age < 0) { throw new Error('My Expected Error Message') };
  }
}

sumOfOdd = (numbers) => { return numbers.reduce((a, b) => a + (b%2 ? b : 0), 0) }


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
  expect(sumOfOdd([1,2,3,4,5,6])).toBe(9);
})