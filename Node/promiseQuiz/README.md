# promise-quiz

The repository consists of a series of JavaScript files to test your understanding of promises. The quiz uses the in-built Node file-system module. A call to: 

```javascript
readFile("./animal.txt", { encoding: "utf-8" })
```

tells node to load animal.txt into memory as a string. The process of reading and writing to a file from disk (storage) is very slow compared to dealing with data in RAM (memory) - such as the variables you create in your code - so Node’s readFile function returns a promise so as not to block execution whilst the file loads. 

For each of the questions, predict what the output to the console will be. Once you’ve made your prediction, run the file with node and see what the answer is. If you predicted incorrectly, try and work out where the gap in your understanding is.
