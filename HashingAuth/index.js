// Find the 4-letter string of lowercase letters (i.e. a-z) which produces the md5 digest 
const crypto = require("crypto");

const match = "dbfcafe986040cc10ada1a4314c436db";

const characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const generateHash = (word) => { return crypto.createHash("md5").update(word).digest("hex"); }

breakTheHash = () => {
  for(let i=0; i<26; i++) {
    let char_1 = characters[i];
    for(let j=0; j<26; j++) {
      let char_2 = characters[j];
      for(let k=0; k<26; k++) {
        let char_3 = characters[k];
        for(let l=0; l<26; l++) {
          let char_4 = characters[l];
          if (generateHash([char_1,char_2,char_3,char_4].join('')) === match) {
            return [char_1,char_2,char_3,char_4].join('');
          }
        }
      }
    }
  }
}

console.time('break')
console.log(breakTheHash()) // break: 625ms
console.timeEnd('break')