const express = require("express")
const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");


const danklodictionary = {
  "kuya" : {
    "word" : ["orb"],
    "rating" : 999
    },
  "bro" : {
    "word" : ["orb"],
    "rating" : 999
    },
  "extreme" : {
    "word" : ["petmalu"],
    "rating" : 999
    },
  "exceptional" : {
    "word" : ["petmalu"],
    "rating" : 999
    },
  "cool" : {
    "word" : ["petmalu"],
    "rating" : 999
    },
  "excellent" : {
    "word" : ["petmalu"],
    "rating" : 999
    },
  "mom" : {
    "word" : ["mumshie"],
    "rating" : 999
    },
  "mama" : {
    "word" : ["mumshie"],
    "rating" : 999
    },
  "nanay" : {
    "word" : ["mumshie"],
    "rating" : 999
    },
  "salamat" : {
    "word" : ["matsala"],
    "rating" : 999
    },
  "thank" : {
    "word" : ["matsala"],
    "rating" : 999
    },// think of a way on how to make this handle thank you
  "pare" : {
    "word" : ["repa"],
    "rating" : 999
    },
  "busog" : {
    "word" : ["sogbu"],
    "rating" : 999
    },
  "sarap" : {
    "word" : ["rapsa"],
    "rating" : 999
    },
  "bes" : {
    "word" : ["beshie"],
    "rating" : 999
    },
  "hindi" : {
    "word" : ["dehins"],
    "rating" : 999
    },
  "hinde" : {
    "word" : ["dehins"],
    "rating" : 999
    },
  "barkada" : {
    "word" : ["dabarkads"],
    "rating" : 999
    },
  "friends" : {
    "word" : ["dabarkads"],
    "rating" : 999
    }
}

var danklodictionarytemp


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/main.html")
});

  // ENDPOINT to send text to translate
app.post("/translate", function(req, res){
  res.send(lodify(req.body.text))
});



  // ENDPOINT to give translation
app.post("/add2dictionary", function(req, res){
  const key = req.body.nonlodi
  const value = req.body.lodi
  const rating = 0

  // check if not in the dictionary
  // push the keyvalue pair to database
  if (!danklodictionary[key]) {
    var entry = {
      "word" : [value],
      "rating" : rating
    }
    // add to temp dict
    danklodictionarytemp[key] = entry
  }

  // else check if the lodi word is also in the list of lodi words







  res.send("[INFO]: Successfully added to dictionary")
});

app.get("/dictionary", function(req, res) {
  res.json(danklodictionary)
})


  // ENDPOINT to get random words to rate
app.get("/rate", function(req, res){
  // call dictionary for words with rate less than threshold

  // send the keyvalue pairs back to client
});



  // ENDPOINT to update the rating of the words
app.post("/rate", function(req, res) {

})


// HELPER FUNCTIONS
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function isVowel(letter) {
  const vowel = ['a', 'e', 'i', 'o', 'u']
  return (vowel.includes(letter) ? 'p' : 'k')
}

function vowelize(word) {
  const letterlist = word.split("")
  return letterlist.map(isVowel)
}

function lodifyWord(word) {
  if (word.split("").length < 3) {
    return word
  }
  // check if in dictionary
    if (danklodictionary[word.toLowerCase()]) {
      return danklodictionary[word.toLowerCase()].word[0]
    }

  // else create it on the fly 
    else {
      var rand = Math.random()
      // if random number is greater than some threshold, do it
      if (rand > 0.9) {
        const pantig = ['p', 'kp', 'pk', 'kpk', 'pkk', 'kkp', 'kkpk', 'kpkk', 'kkpkkk']
        const pantiglist = vowelize(word)
        const letterlist = word.split("")
        var curr = pantiglist[pantiglist.length-1];
        var ready = false
        for (let i=pantiglist.length-2; i>-1; i--) {
          var newpantig = pantiglist[i]+curr;
          if (pantig.includes(newpantig)) {
            ready = true
          } else {
            if (ready) {
              return letterlist.slice(i+1,letterlist.length).join('') + letterlist.slice(0,i+1).join('')
            }
          }
          curr = newpantig    
        }
      } 
      // else return the original word
      else {
        return word
      }

    }
}

function lodify(sentence) {
  // pad punctuation marks with space
  // then split by space
  const wordlist = sentence.replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, ' $& ').split(' ') 
  const lodified = wordlist.map(function (curr, ind, array) {
    return lodifyWord(curr)
  })
  return lodified.join(' ').replace(/\s+(\W)/g, "$1")
}





http.listen(3000, function(){
  console.log("listening on *:3000");
});



















