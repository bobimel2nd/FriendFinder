var fs = require("fs")
var paths = require("path")
var path = paths.normalize(__dirname + "/../public/")

module.exports = function(app) {
	app.get("/", function(req, res) {
		console.log("Serving " + path + "home.html")
		fs.readFile(path + "home.html", function(err, thePage) {
			res.writeHead(200, thePage);
			res.end(thePage);
		})
	})

	app.get("/survey", function(req, res) {
		console.log("Serving " + path + "survey.html")
		fs.readFile(path + "survey.html", function(err, thePage) {
			res.writeHead(200,  { "Content-Type": "text/html" });
			res.end(thePage);
		})
	})

}
