const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

/** Command-line tool to generate Markov text. */

function readTextFile(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      let mm = new MarkovMachine(data);
      console.log(mm.makeText());
    }
  });
}

async function readUrl(path) {
  try {
    let response = await axios.get(path);
    let mm = new MarkovMachine(response.data);
    console.log(mm.makeText());
  } catch (err) {
    console.error(`Error fetching ${path}: ${err}`);
    process.exit(1);
  }
}

let readMethod = process.argv[2];
let path = process.argv[3];

if (readMethod === 'file') {
  readTextFile(path);
} else if (readMethod === 'url') {
  readUrl(path);
} else {
  console.error(`Error, invalid read method. ${readMethod} should be 'file' or 'url'.`);
}