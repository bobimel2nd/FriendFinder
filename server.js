// Dependencies
var express = require("express")
var bodyParser = require("body-parser")
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var apiRoutes = require("./routing/apiRoutes.js")(app)
var htmlRoutes = require("./routing/htmlRoutes.js")(app)

var PORT = process.env.PORT || 8080;

// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
