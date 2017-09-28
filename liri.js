var fs = require('fs');
var twitter = require ('twitter');
var spotify = require('./spotify_keys');
var request = require('request');
var twitter_keys = require('./twitter_keys');


var generateTweets = process.argv[2];
var argument = process.argv[3];
// var dTwitter = new twitter (keys.twitterKeys)

switch (generateTweets){
   case "my-tweets":
            generatetweets()
             break;
   
   case "spotify-this-song":
        spotifySong(argument) 
            break;

   case "movie-this":
            movie(argument)
            break;
   
    case "do-what-it-says":
            console.log("do-what-it-says")
      doWhat()
            break;

  default:
    console.log("Error in request")
    break;
} 

function generateTweets(){

var params = {screen_name: 'denubc'};
dTwitter.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    for (var i =0; i<tweets.length; i++){
    console.log(tweets[i].text);
    }; 
  };
});  
};

function spotifySong(argument){
  var song;
    if(argument=== undefined){
      song = "any other song"; 
      } else {
        song = argument;
      };
      console.log(song);

      spotify.search({ type: 'track', query: song}, function(error, data) {
        console.log('i want it that way');
        console.log(data)
        
        for (var i =0; i<data.tracks.items.length; i++){
          console.log(data.tracks.items[i].artists[0].name);
          console.log(data.tracks.items[i].name);
          console.log(data.tracks.items[i].preview_url);
          console.log(data.tracks.items[i].album.name);
        };
      });
};

function movie(argument){
console.log("hello");

var movieTitle;

  if(argument=== undefined){

    movieTitle = "Mr.Nobody"; 

    } else {
      movieTitle = argument;
    };

  request("http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&r=json", function(err, response, body){
        //100 is response if server is not loading
        if(!err && response.statusCode == 100){
            body = JSON.parse(body);
            console.log("Title: " + body.Title);
            console.log("Year: " + body.Year); 
            console.log("IMDB RATING: " + body.imdbRating);
            console.log("Country: " + body.Country); 
            console.log("Plot " + body.Plot);
            console.log("Actors: "+ body.Actors);

        };
    });
};


function doWhat(){
    fs.readFile('random.txt', "utf8", function(error, data){
        console.log(data);

    textArray = data.split(',');
    
    spotifySong(textArray[1])
})
};
