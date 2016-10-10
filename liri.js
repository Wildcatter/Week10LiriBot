
// Garett Francis tue/thur 


 // Get the sweet keys + tokens for twitter API from keys.js

var data = require('./keys.js');

// use the sweet packages needed for this sweet homework

var Twit = require('twit')
var spotify = require ("spotify");
var request = require("request");
var fs = require("fs");

// set the sweet variables ill need for the command line. can just use 'title' for song or movie title

var command = process.argv[2];
var title = process.argv[3];

// go ahead and set some more sweet variables to destinations in keys.js ill need

var keys = data.twitterKeys;
var consumerKey = keys.consumer_key;
var consumerSecret = keys.consumer_secret;
var accessKey = keys.access_token_key;
var accessSecret = keys.access_token_secret;


// switch command for the sweet command the user will input

switch (command) {
	case 'my-tweets':
		getDemTweets();
		break;	
	case "spotify-this-song": 
		getDatSongName();
		break;
	case 'movie-this':
		getDatMovie();
		break;
	case "do-what-it-says":
		doWhatItSays();
		break;
}; 


// sweet function that gets dem 20 tweets from my tweeter. for reals. keep on eye on devapps.io coming soon!

function getDemTweets() {
	var T = new Twit({
	consumer_key: consumerKey,
	consumer_secret: consumerSecret,
	access_token: accessKey,
	access_token_secret: accessSecret
	});
	T.get('statuses/user_timeline', {user_id: 'TheDevApps', count: 20}, function(err, data, response) {
		console.log(data[0].text);
	});
};


// gets dat song info from title input, including artist, song, preview, and album dat song is from

function getDatSongName(title) {
		if(!title){
			title = "The Sign Ace of Base";
		}
		spotify.search({ type: "track", query: title}, function(err, data) {
			if(err){
				console.log("Error :"+ err);
				return;
			}
			var songInfo = data.tracks.items;
			for (var i = 0; i < 5; i++) {
				var spotifyResults =
					"Artist: " + songInfo[i].artists[0].name + "\n" +
					"Song: " + songInfo[i].name + "\n" +
					"Album the song is from: " + songInfo[i].album.name + "\n" +
					"Preview Url: " + songInfo[i].preview_url + "\n" + 
					"------------------------------ " + i + " ------------------------------" + "\n";
					console.log(spotifyResults);
				
			}
		})
};


// gets dat movie info from title input, gets title, year, IMDB rating, country, plot, actors, RT rating, RT url. Crunk. 
// if they dont put in a title cuz they're whack, it looks up Mr. Nobody. he wild'

function getDatMovie(title) {
		if(!title){
			title = "Mr. Nobody";
		} 
		request("http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json&tomatoes=true", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var movieObject = JSON.parse(body);
				var movieResults =
				"------------------------------ begin ------------------------------" + "\n" +
				"Title: " + movieObject.Title+"\n"+
				"Year: " + movieObject.Year+"\n"+
				"Imdb Rating: " + movieObject.imdbRating+"\n"+
				"Country: " + movieObject.Country+"\n"+
				"Language: " + movieObject.Language+"\n"+
				"Plot: " + movieObject.Plot+"\n"+
				"Actors: " + movieObject.Actors+"\n"+
				"Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\n"+
				"Rotten Tomatoes URL: " + movieObject.tomatoURL + "\n" + 
				"------------------------------ fin ------------------------------" + "\n";
				console.log(movieResults);
			} else {
				console.log("Error :"+ error);
				return;
			}
		});
};

	// sweet function that reads random. txt and 
	// sets the same switch parameter for the first variable, and title to the second yeahhhhhh

function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(error,data) {
		if (error) {
			console.log("Error: " + error);
		} else {
		sepItems = data.split(",");
		command = sepItems[0];
		title = sepItems[1];
		
		switch (command) {
			case 'my-tweets':
				getDemTweets();
				break;	
			case "spotify-this-song": 
				getDatSongName(title);
				break;
			case 'movie-this':
				getDatMovie(title);
				break;
			case "do-what-it-says":
				doWhatItSays();
				break;
		}; 

		};
	});
};

function logDatShit (results) {
	fs.appendFile("log.txt", "results", function (err) {
		if (err) {
			return console.log("Error: " + err);
		} 

	});
}