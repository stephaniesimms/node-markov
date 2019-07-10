const { MarkovMachine } = require("./markov");

describe("markov monogram", function(){
  let mm;

  beforeAll(function() {
    mm = new MarkovMachine("The lion the witch and the wardrobe");
  })

  test("make chains", function(){
    expect(mm.chains).toEqual({
      The: ["lion"],
      lion: ["the"],
      the: ["witch", "wardrobe"],
      witch: ["and"],
      and: ["the"],
      wardrobe: [null]
    });
  }); 

  test("makeText() begins with capitalized word", function() {
    let text = mm.makeText();
    console.log(text)
    expect(text[0]).toEqual(text[0].toUpperCase());
  });

  test("returns correct chain on predictable markov input", function(){
    let text = "The quick brown fox jumps over the lazy dog";
    let boringMM = new MarkovMachine(text);

    expect(boringMM.makeText()).toEqual(text);
  });
})

describe("markov bigram", function () {
  let mm;

  beforeAll(function () {
    mm = new MarkovMachine("I am Sam, Sam I am", true);
  })

  test("make chains", function () {
    expect(mm.chains).toEqual({
      "I am": ["Sam,", null],
      "am Sam,": ["Sam"],
      "Sam, Sam": ["I"],
      "Sam I": ["am"],   
    });
  });

  test("makeText() begins with capitalized word", function () {
    let text = mm.makeText();
    console.log(text)
    expect(text[0]).toEqual(text[0].toUpperCase());
  });

  test("returns correct chain on predictable markov input", function () {
    let text = "The quick brown fox jumps over the lazy dog";
    let boringMM = new MarkovMachine(text, true);

    expect(boringMM.makeText()).toEqual(text);
  });

})