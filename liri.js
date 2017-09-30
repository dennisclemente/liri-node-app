var fs = require('fs');
var spotify = require('spotify');
var request = require('request');
var twitter = require('twitter');

var getSomething = process.argv[2];

//Switch 

switch (getSomething){
   case "my-tweets":
            getTweets()
             break;
   
   case "spotify-this-song":
            getSong() 
            break;

   case "movie-this":
            getMovie()
            break;
   
    case "do-what-it-says":
            console.log("do-what-it-says")
            doWhat();
            break;
  };
 
 //TWITTER TWEETS 
 function getTweets(){
  var getSomething = process.argv[2]; 
  var Twitter = require('twitter');
  var tweet = new Twitter({
    consumer_key:     'jmMY4vli6FC9chD0zvBM0Cqsf',
    consumer_secret:    'F4uZitIm6ZC8l4H1oopxFVCCvtJkkiWG9BAoRmdvT3S0tOoNTp',
    access_token_key:   '912771666047938560-izWRtkkhy4RGQcY6yxkQiMgbVsK3cUx',
    access_token_secret:  'mI6ncU5yMePaJi3jdM7EThRT8trYq2CZTjM5wsYnbv2N2',
});
  var userName = { user_name: 'denubc' };

  tweet.get('statuses/user_timeline', userName, displayGetTweets);
}
function displayGetTweets(error, tweets, response) {
  if (getSomething) {
    for (var i =0; i<tweets.length; i++){
      console.log(tweets[i].text);
    } 
  }
}

// SPOTIFY SONGS
function getSong(argument) {
  var songTitle = "";
  if(argument === undefined){
      songTitle = 'The Sign'; 
  } else {
    songTitle = argument;
  };
      var Spotify = require('node-spotify-api');
      var spotify = new Spotify({id: 'cdbe26aefd0248d8ada809e12b457d46', secret: '656fad1400a54ce8afcde90213d97d3c',
      });

      spotify.search({ type: 'track', query: songTitle}, function(error, data) {
        console.log('i want it that way');
        console.log(data)
      });        

      var trackCount;

      for (var i = 0; i < trackCount; i++) {
        var artistCount = data.tracks.items[i].artists.length;
      for (var j = 0; j < artistCount; j++) {
        console.log("Artist: " + data.tracks.items[i].artists[j].name +
        " Album:  " + wordwrap.wrap(data.tracks.items[i].album.name, { width: 40 }) +
        " Link: " + data.tracks.items[i].artists[j].external_urls.spotify + "\n");
           }
        }
      };

// OMDB MOVIES
 function getMovie(argument){
   var movieTitle = process.argv[3];
    if(argument === undefined){
    movieTitle = "Mr.Nobody"; 
    } else {
      movieTitle = argument;
    };

  request("http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&apikey=40e9cece", function(err, response, body){
        //100 is response if server is not loading
        if(!err && response.statusCode == 100){
            body = JSON.parse(body);
                        var title = JSON.parse(body).Title;
                        var year = JSON.parse(body).Year;
                        var rating = JSON.parse(body).Rated;
                        var country = JSON.parse(body).Country;
                        var plot = JSON.parse(body).Plot;
                        var actors = JSON.parse(body).Actors;

            console.log("Title: " + body.Title);
            console.log("Year: " + body.Year); 
            console.log("OMDB RATING: " + body.omdbRating);
            console.log("Country: " + body.Country); 
            console.log("Plot " + body.Plot);
            console.log("Actors: "+ body.Actors);
        };
    });
};

//DWIS 
function doWhat(){
    var fs = require ('fs');
    fs.readFile('random.txt', "utf8", function(error, data){
        console.log(data);

    textArray = data.split(',');
    
    getSong(textArray[1])
  })
};
