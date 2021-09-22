const { readFile } = require("fs/promises");

///////////////////////////////

function qOne () {
  console.log(readFile("./animal.txt")); // * Promise {} 
}


function qTwo () {
  readFile("./animal.txt", { encoding: "utf-8" }).then(console.log); // * fox
}


function qThree () {
  async function whatever() {
      const response = await readFile("./animal.txt", { encoding: "utf-8" });
      console.log(response);
  }
  whatever(); // * fox
}


function qFour () {
  console.log("hello");
  readFile("./animal.txt", { encoding: "utf-8" }).then(console.log);
  console.log("goodbye");

  // * hello
  // * goodbye
  // * fox
}


function qFive () {
  async function readAndPrint() {
    const response = await readFile("./animal.txt", { encoding: "utf-8" });
    console.log(response);
  }

  console.log("hello");
  readAndPrint(); // Would work if this had an 'await' before it.
  console.log("goodbye");

  // * hello
  // * goodbye
  // * fox
}


function qSix () {
  async function readAnimal() {
    const response = await readFile("./animal.txt", { encoding: "utf-8" });
    return response;
  }

  console.log(readAnimal());  // again with the 'await' // * Promise{}
}


function qSeven () {
  async function readAnimal() {
    return await readFile("./animal.txt", { encoding: "utf-8" });
  }
  readAnimal().then(console.log); // * fox
}


function qEight () {
  async function timesBy5(num) {
    return num * 5;
  }
  console.log(timesBy5(10)); // ! promise{}    ->>>>  promise{50}
}


function qNine () {
  async function readAndPrint() {
    const response = await readFile("./animal.txt", { encoding: "utf-8" });
    console.log(response);
    console.log("hello");
  }

  readAndPrint();
  console.log("goodbye");

  // * goodbye
  // * fox
  // * hello
}


///////////////////////////////

// qOne();
qTwo();
// qThree();
// qFour();
// qFive();
// qSix();
// qSeven();
// qEight();
// qNine();