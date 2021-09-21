function pause(time) {
  return new Promise(resolve => {
      setTimeout(resolve, time);
  })
}

PWD_then = async(arr, delay) => {
  for(let i=0; i<arr.length; i++) {
    await pause(delay).then(() => {
      console.log(arr[i])
    })
  }
}

PWD_nonthen = async(arr, delay) => {
  for(let i=0; i<arr.length; i++) {
    await pause(delay);
    console.log(arr[i]);
  }
}

PWD_foreach = async(arr, delay) => { // forEach does NOT work. All number are printed together
  arr.forEach(async(number) => {
    await pause(delay).then(() => {
      console.log(number)
    })
  })
}

PWD_then([1,2,3,4,5,6,7,8,9], 500);
PWD_nonthen([1,2,3,4,5,6,7,8,9], 500);
PWD_foreach([1,2,3,4,5,6,7,8,9], 500);