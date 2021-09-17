waysToMake = (target, nums, ways=[]) => {
  nums.sort();

  checker = (total=0, method=[]) => {
    nums.forEach(number => {
      if (number>method[method.length-1]) {return};
      let newTotal = total+number;
      let newMethod = [...method, number];

      if (newTotal > target) {return}
      else if (newTotal === target) { ways.push(newMethod); }
      else {checker(newTotal, newMethod)}
    })
  }
  checker();

  return ways.length;
}

// ==================

class Failed {
  constructor(age) {
    if (age < 0) { throw new Error('My Expected Error Message') };
  }
}
class Passed {
  constructor(names) {
    this.names = names;
  }
}

module.exports = {
  Passed,
  Failed,
  objectToCompare: {
    name: {
      'first': 'Gregor',
      'second': 'Clegane'
    }
  },
  waysToMake,
  sumOfOdd: (numbers) => { return numbers.reduce((a, b) => a + (b%2 ? b : 0), 0) },
}