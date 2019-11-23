require("dotenv").config();
// variables for requiring packages
var Spotify = require("node-spotify-api");
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var name = process.argv.splice(3).join();

var keys = require("./keys.js");

if (action === "concert-this") {
  getConcertInformation();
}
else if (action === "spotify-this-song") {
  getSongInfo();
}
else if (action === "do-what-it-says") {
  getRandomInfo();
}
else if (action === "movie-this") {
  getMovieInfo();
}
else {
  console.log("Error: Invalid Entry")
}