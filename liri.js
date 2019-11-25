require("dotenv").config();
// variables for requiring packages
let Spotify = require('node-spotify-api');
let moment = require("moment");
let axios = require("axios");
let fs = require("fs");
let keys = require("./keys.js");
let spotify = new Spotify(keys.spotify);
let action = process.argv[2];
let name = process.argv[3];


//Statement that can be choosen to run
if (action === "concert-this") {
  getConcertInfo();
}
else if (action === "spotify-this-song") {
  getSongInfo();
}
else if (action === "movie-this") {
  getMovieInfo();
}
else if (action === "do-what-it-says") {
  getRandomInfo();
}
else {
  console.log("Error: Invalid Entry")
}

//function for concertinfo
function getConcertInfo() {
  let artistName = name;
  let queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

  //concert date and location of each event
  axios.get(queryUrl).then(function (response) {
    for (let i = 0; i < response.data.length; i++) {
      let concertDate = moment(response.data[i].datetime).format("MM/DD/YYYY");
      let getConcertInfo = ["\nVenue Name: " + response.data[i].venue.name, "\nVenue Location: " + response.data[i].venue.city + "\n" + response.data[i].venue.country, "\nConcert Date: " + concertDate + "\n"].join("\n");
      console.log("\nVenue Name: " + response.data[i].venue.name, "\nVenue Location: " + response.data[i].venue.city + "\nCountry: " + response.data[i].venue.country, "\nConcert Date: " + concertDate);
    }
  });
}


// function to get song info
function getSongInfo() {
  let songName = "";
  if (!name) {
    songName = "the sign";
  }
  else {
    songName = name;
  }
  spotify.search({
    type: "track",
    query: songName,
    limit: 5
  }, function (error, data) {
    for (let i = 0; i < data.tracks.items.length; i++) {
      songInfo = ["Song Title: " + data.tracks.items[i].name,
      "Album Title: " + data.tracks.items[i].album.name,
      "Artist(s) Name: " + data.tracks.items[i].artists[0].name,
      "Preview URL: " + data.tracks.items[i].preview_url];
      console.log("\nSong Title: " + data.tracks.items[i].name,
        "\nAlbum Title: " + data.tracks.items[i].album.name,
        "\nArtist(s) Name: " + data.tracks.items[i].artists[0].name,
        "\nPreview URL: " + data.tracks.items[i].preview_url);
    }
  });
}

// function to get movie info
function getMovieInfo() {
  let movieName = name;
  // if no movie name entered, 'Mr. Nobody' will appear
  if (!movieName) {
    movieName = "Mr. Nobody ";
  }

  let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(function (response) {
    movieInfo = ["Title: " + response.data.Title,
    "Year Released: " + response.data.Year,
    "IMDB Rating: " + response.data.Ratings[0].Value,
    "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,
    "Country: " + response.data.Country,
    "Language: " + response.data.Language,
    "Plot: " + response.data.Plot,
    "Actors: " + response.data.Actors];
    console.log("\nTitle: " + response.data.Title,
      "\nYear Released: " + response.data.Year,
      "\nIMDB Rating: " + response.data.Ratings[0].Value,
      "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value,
      "\nCountry: " + response.data.Country,
      "\nLanguage: " + response.data.Language,
      "\nPlot: " + response.data.Plot,
      "\nActors: " + response.data.Actors);
  });

}

// function random.txt text
function getRandomInfo() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) throw error;
    else if (data.includes("concert-this")) {
      console.log(data);
      let str = data.split(",").pop().replace(/"/g, "");
      name = str;
      getconcertinformation();
    }
    else if (data.includes("spotify-this-song")) {
      console.log(data);
      let str = data.split(",").pop().replace(/"/g, "");
      name = str;
      getSongInfo();
    }
    else if (data.includes("movie-this")) {
      console.log(data);
      let str = data.split(",").pop().replace(/"/g, "").replace(/ /g, "+");
      name = str;
      getMovieInfo();
    }
    else {
      console.log("Error 1337");
    }
  });
}

