var $C = require("js-combinatorics")
const TypoGenerator = function() {
    this.charset = "abcdefghijklmnoprstuvwxyz".split("")
    this.similarPronunciations =  [
          {
            "letters": ["e", "a"]
          },
          {
            "letters": ["i", "e"]
          },
          {
            "letters": ["a", "o"]
          },
          {
            "letters": ["u", "o"]
          },
          {
            "letters": ["t", "d"]
          },
          {
            "letters": ["v", "w"]
          },
          {
            "letters": ["th", "d"]
          },
          {
            "letters": ["th", "f"]
          },
          {
            "letters": ["s", "sh"]
          },
          {
            "letters": ["b", "p"]
          },
          {
            "letters": ["f", "v"]
          },
          {
            "letters": ["ch", "j"]
          }
    ]
      
}

TypoGenerator.prototype = {
    substitute: function * (string, options) {
        string = string.split("");
        for(var i=0;i<string.length;i++){
            for(var j=0;j<this.charset.length;j++){
                let stringCopy = string.map(c=>c);
                let substituteWith = this.charset[j];
                let currentSubstitutionCharacter = i;
                stringCopy[currentSubstitutionCharacter] = substituteWith 
                yield stringCopy.join("")
            }
            
        }
    },
    cognitiveErrors: function * ( string, options ){
        string = string.split("");
        for(var i=0; i<this.similarPronunciations.length;i++){
            let letters = this.similarPronunciations[i].letters;
            let lettersPermutations =  new $C.Permutation(letters, 2);
            for (const elem of lettersPermutations) {
                let find = elem[0];
                let replace = elem[1];
                let newStr = string.join("").replaceAll(find, replace)
                if(newStr != string.join("")){
                    yield newStr
                }
            }
        }
    },
    transposition: function * (string, options){
        for (let i = 0; i < string.length - 1; i++) {
            const typo = string.substring(0, i) + string[i + 1] + string[i] + string.substring(i + 2);
            yield typo
        }
    },
    omission: function * (word, options){
        for (let i = 0; i < word.length; i++) {
            const typo = word.substring(0, i) + word.substring(i + 1);
            yield typo
        }
    },
    insertion: function * (word, options){
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i <= word.length; i++) {
            for (let char of characters) {
                const typo = word.substring(0, i) + char + word.substring(i);
                yield typo
            }
        }
    },
    all: function * (string, options){
        let typos = [ 
            this.insertion(string, options),
            this.cognitiveErrors(string, options),
            this.transposition(string, options),
            this.omission(string, options),
            this.substitute(string, options)
        ]
        for (let count=0;count<typos.length;count++){
            let currentTypos = typos[count];
            for (let typo of currentTypos){
                yield typo
            } 
        }
    }
};



module.exports = (function() {
    return new TypoGenerator();
})();