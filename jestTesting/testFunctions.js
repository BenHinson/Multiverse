// waysToMake = (target, nums, ways=0, total=0, prevNum) => {
//   for(let i=0; i<nums.length; i++) {
//     if (prevNum && nums[i]>prevNum) {continue;}
//     if (total+nums[i] === target) {ways++;}
//     else if (total+nums[i] < target) {ways += waysToMake(target, nums, 0, total+nums[i], nums[i])};
//   }
//   return ways;
// }

// function waysToMake(target, numbers, i = 0) {
//   if (target < 0) { return 0; }
//   if (target === 0) { return 1; }
//   let ways = 0;
//   for (let j = i; j < numbers.length; j++) {
//       ways += waysToMake(target - numbers[j], numbers, j);
//   }
//   return ways;
// }

waysToMake = (target, nums, ways=0, total=0, prevNum) => {
  for(let i=0; i<nums.length; i++) {
    if (prevNum && nums[i]>prevNum) {continue;}
    if (total+nums[i] === target) {ways++;}
    else if (total+nums[i] < target) {ways += waysToMake(target, nums, 0, total+nums[i], nums[i])};
  }
  return ways;
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



// waysToMake = (target, nums, ways=0, total=0, prevNum) => {
//   for(let i=0; i<nums.length; i++) {
//     if (prevNum && nums[i]>prevNum) {continue;}
//     if (total+nums[i] === target) {ways++;}
//     else if (total+nums[i] < target) {ways += waysToMake(target, nums, 0, total+nums[i], nums[i])};
//   }
//   return ways;
// }

// waysToMake = (target, nums) => {
//   checker = (ways=0, total=0, preNum) => {
//     for(let i=0; i<nums.length; i++) {
//       if (preNum && nums[i]>preNum) {continue;}
//       if (total+nums[i] === target) {ways++;}
//       if (total+nums[i] < target) {ways += checker(0, total+nums[i], nums[i])};
//     }
//     return ways;
//   }
//   return checker();
// }


// waysToMake = (target, nums, ways=0) => {
//   checker = (total=0, preNum) => {
//     nums.forEach(number => {
//       if (preNum && number>preNum) {return};
//       if (total+number === target) {return ways++;}
//       if (total+number < target) {checker(total+number, number)};
//     })
//   }
//   checker();
//   return ways;
// }



// waysToMake = (target, nums, ways=[]) => {
//   checker = (total=0, method=[]) => {
//     nums.forEach(number => {
//       if (number>method[method.length-1]) {return};
//       let newTotal = total+number;
//       let newMethod = [...method, number];

//       if (newTotal > target) {return}
//       else if (newTotal === target) { ways.push(newMethod); }
//       else {checker(newTotal, newMethod)}
//     })
//   }
//   checker();

//   return ways.length;
// }


console.time('Charlie');
console.log(waysToMake(200, [200, 100, 50, 20, 10, 5, 2, 1]))
console.timeEnd('Charlie');