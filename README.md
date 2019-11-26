# LIRI-Bot
This purpose of this project was to create a node.js app that users can use to query Bands In Town API, Spotify API and OMDB API.
<br>
<br>
For the Bands In Town the user starts by running the app: `node liri.js concert-this <artist/ band name>`, which brings the next five up concerts up and formats by the Venue name, City, State and date of concert.
<br>
<br>
For the Spotify portion the user runs the app: `node liri.js spotify-this-song <song name>`, which pulls up the the information and formates by the song name, artist, album name, and a URL link to a 30 second preview. User can then Ctrl+ Click to open link to preview. 
<br>
<br>
For the OMDB section of this user runs app: `node liri.js movie-this <movie name>` whcih returns information in the following format. It returns the movie title, the year it came out, IMDB rating, Rotten Tomatoes rating, country where movie was produced, language of movie, plot of movie and the actors in movie. 
<br>
<br>
The last section of this app user runs app: `node liri.js do-what-it-says`. This takes information in the random.txt file and finds information, in this case it looks at spotify for "I want it that way.
 
 ## Depolyment
 To run this app you need the following npm packages:
 <br>
 1. axios
 2. dotenv
 3. fs
 4. moment
 5. node-spotify-api
 
