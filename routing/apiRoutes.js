var allFriends = require("../data/friends.js")

module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
		console.log("Serving " + __dirname + "/data/friends.js")
		res.writeHead(200,  { "Content-Type": "application/json" });
		res.end(JSON.stringify(allFriends));
	})

	app.post("/api/friends", function(req, res) {
		var newFriend = req.body
		var oldFriend = FindFriend(newFriend)
		allFriends.push(newFriend)

		console.log("Adding " + newFriend.name)
		console.log("Matched " + oldFriend.name)
		res.writeHead(200,  { "Content-Type": "application/json" });
		res.end(JSON.stringify(oldFriend));
	})
}

function FindFriend(newFriend) {
	var idxSav = -1
	var sumDif = 9999
	var newSum = 0
	newFriend.scores.forEach((score) => newSum =+ score)
	allFriends.forEach((theFriend, index) => {
		var theSum = 0
		theFriend.scores.forEach((score) => theSum =+ score)
		var theDif = Math.abs(newSum-theSum)
		if (theDif <= sumDif) {
			sumDif = theDif
			idxSav = index
		}
		console.log("Compared " + theFriend.name + "(" + newSum + " vs " + theSum + ")")
	})
	return allFriends[idxSav]
}