/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text, n=1) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.n = n
    this.makeChainsNgram()
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChainsNgram() {
    let n = this.n
    this.chains = {}
    let previousWordGroup = this.words.slice(0, n-1)
    for (let i = n-1; i < this.words.length; i++) {  
          
      previousWordGroup.push(this.words[i]);
      let wordGroup = previousWordGroup
      let key = wordGroup.join(" ");
      let nextWord = this.words[i+1];
      if (nextWord === undefined) {
        nextWord = null;
      }
      
      if (this.chains[key]) {
        this.chains[key].push(nextWord);
      } else {
        this.chains[key] = [nextWord];
      }
      previousWordGroup.shift();
    }
  }

  makeTextNgram(numWords = 100) {

    let n = this.n
    let isCapital = false;
    let firstNgram; 
    let keys = Object.keys(this.chains);

    while (!isCapital) {
      firstNgram = getRandomWordFromArray(keys);
      isCapital = firstNgram[0] === firstNgram[0].toUpperCase();
    }


    firstNgram = firstNgram.split(" ");
    let previousWordGroup = firstNgram.slice(0, n-1);
    let currWord = firstNgram[n-1];
    let outputTextArr = [previousWordGroup];
    let wordCount = n-1;

    while (wordCount < numWords && currWord !== null) {

      outputTextArr.push(currWord);
      previousWordGroup.push(currWord);
      let wordGroup = previousWordGroup.join(" ")

      
      currWord = getRandomWordFromArray(this.chains[wordGroup]);
      previousWordGroup.shift();
      wordCount++;

    }
    return outputTextArr.join(" ")

  }

  makeTextBigram(numWords = 100) {
    let isCapital = false;
    let firstBigram;
    let keys = Object.keys(this.chains);

    while (!isCapital) {
      firstBigram = getRandomWordFromArray(keys);
      isCapital = firstBigram[0] === firstBigram[0].toUpperCase();
    }

    firstBigram = firstBigram.split(" ");
    let previousWord = firstBigram[0];
    let currWord = firstBigram[1];
    let textArr = [previousWord];
    let wordCount = 1;

    while (wordCount < numWords && currWord !== null) {
      let bigram = previousWord + " " + currWord;
      textArr.push(currWord);
      previousWord = currWord;
      currWord = getRandomWordFromArray(this.chains[bigram]);
      wordCount++;
    }
    return textArr.join(" ");
  }

  makeChainsBigram() {
    this.chains = {};
    for (let i = 1; i < this.words.length; i++) {
      let wordKey = this.words[i-1] + " " + this.words[i];
      let nextWord = this.words[i+1];
      if (nextWord === undefined) {
        nextWord = null;
      }
      if (this.chains[wordKey]) { 
        this.chains[wordKey].push(nextWord);
      } else {
        this.chains[wordKey] = [nextWord];
      }
    }
  }

  /** return random text from chains */

 

  makeChainsMonogram() {
    this.chains = {};
    for (let i = 0; i < this.words.length; i++) {
      let wordKey = this.words[i];
      let nextWord = this.words[i + 1];
      if (nextWord === undefined) {
        nextWord = null;
      }
      if (this.chains[wordKey]) {
        this.chains[wordKey].push(nextWord);
      } else {
        this.chains[wordKey] = [nextWord];
      }
    }
   }

  makeTextMonogram(numWords = 100) {
    let isCapital = false;
    let currWord;
    let keys = Object.keys(this.chains);

    while (!isCapital) {
      currWord = getRandomWordFromArray(keys);
      isCapital = currWord[0] === currWord[0].toUpperCase();
    }
    let textArr = [];
    let wordCount = 0;

    while (wordCount < numWords && currWord !== null) {
      textArr.push(currWord);
      currWord = getRandomWordFromArray(this.chains[currWord]);
      wordCount++;
    }
    return textArr.join(" ");
  }
}

function getRandomWordFromArray(arr) {
  let i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

module.exports = {
  MarkovMachine: MarkovMachine
};