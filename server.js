// Dependencies
var fs = require("fs")
var express = require("express")
var bodyParser = require("body-parser")
var allFriends = require("./data/friends.js")

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var PORT = process.env.PORT || 8080;

// Routes
// ===========================================================
app.get("/", function(req, res) {
	console.log("Serving " + __dirname + "/public/home.html")
	fs.readFile(__dirname + "/public/home.html", function(err, thePage) {
		res.writeHead(200, thePage);
		res.end(thePage);
	})
})

app.get("/survey", function(req, res) {
	console.log("Serving " + __dirname + "/public/survey.html")
	fs.readFile(__dirname + "/public/survey.html", function(err, thePage) {
		res.writeHead(200,  { "Content-Type": "text/html" });
		res.end(thePage);
	})
});

app.get("/api/friends", function(req, res) {
	console.log("Serving " + __dirname + "/data/friends.js")
	res.writeHead(200,  { "Content-Type": "application/json" });
	res.end(JSON.stringify(allFriends));
})

app.post("/api/friends", function(req, res) {
	var newFriend = req.body
	var oldFriend = FindMatch(newFriend)
	// allFriends.push(newFriend)
	console.log("Adding " + newFriend.name)
	console.log("Matched " + oldFriend.name)
	res.writeHead(200,  { "Content-Type": "application/json" });
	res.end(JSON.stringify(oldFriend));
})

// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

function FindMatch(newFriend) {
	var idxSav = -1
	var sumDif = 9999
	var newSum = 0
	newFriend.scores.forEach((score) => newSum =+ score)
	allFriends.forEach((theFriend, index) => {
		var oldSum = 0
		theFriend.scores.forEach((score) => oldSum =+ score)
		if (Math.abs(newSum-oldSum) < sumDif) {
			sumDif = Math.abs(newSum-oldSum)
			idxSav = index
		}
	})
	return allFriends[idxSav]
}
