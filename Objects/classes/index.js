const Author = require('./author.js');

class Book {
  constructor({title, author, latestEdition, newEdition}) {
    this.title = title;
    this.author = new Author(author);
    this.latestEdition = latestEdition;
  }
  newEdition = () => {
    this.latestEdition++;
  };
}

let theCavesOfSteel = new Book({
  title: 'The Caves of Steel',
  author: {
    name: 'Isaac Asimov',
    yearOfBirth: 1920
  },
  latestEdition: 1
})

console.log(theCavesOfSteel);
theCavesOfSteel.newEdition();
console.log(theCavesOfSteel.latestEdition);