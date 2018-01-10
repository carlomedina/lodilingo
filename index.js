const express = require("express")
const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");


const danklodictionary = {
  "kuya" : "orb",
  "bro" : "orb",
  "extreme" : "petmalu",
  "exceptional" : "petmalu",
  "cool" : "petmalu",
  "excellent" : "petmalu",
  "mom" : "mumshie",
  "mama" : "mumshie",
  "nanay" : "mumshie",
  "salamat" : "matsala",
  "thank" : "matsala", // think of a way on how to make this handle thank you
  "pare" : "repa",
  "busog" : "sogbu",
  "sarap" : "rapsa",
  "bes" : "beshie",
  "hindi" : "dehins",
  "hinde" : "dehins",
  "barkada" : "dabarkads",
  "friends" : "dabarkads"
}



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routing
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/main.html")
});

  // endpoint to send text to translate
app.post("/translate", function(req, res){
  const text2translateArray = req.body.text.split(" ")
  const translatedArray = text2translateArray.map(function(curr, ind, arr) {
    if (danklodictionary[curr]) {
      return danklodictionary[curr]
    }
    return curr
  })
  res.send(translatedArray.join(" "))
});

  // endpoint to give translation
app.post("/dictionary", function(req, res){
  

});

  // endpoint to get random words to rate
app.get("/rate", function(req, res){
  

});


// HELPER FUNCTIONS
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


http.listen(3000, function(){
  console.log("listening on *:3000");
});



















