/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
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

  makeText(numWords = 100) {
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
  
    while (wordCount < numWords || currWord === null) {
      let bigram = previousWord + " " + currWord;
      textArr.push(currWord);
      previousWord = currWord;
      currWord = getRandomWordFromArray(this.chains[bigram]);
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