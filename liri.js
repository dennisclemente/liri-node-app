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
            getSong(argument) 
            break;

   case "movie-this":
            getMovie(argument)
            break;
   
    case "do-what-it-says":
            // console.log("do-what-it-says") {
            doWhat();
            break;
  // default:
  //   console.log("Error in request")
  //   break;
    // } 
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
  function displayGetTweets(error, tweets, response) {
  if (getSomething) {
    for (var i =0; i<tweets.length; i++){
    console.log(tweets[i].text);
        } 
      }
    }
  }
}

// SPOTIFY SONGS
function getSong(argument) {
    if(argument === undefined){
      getSong = 'The Sign'; 
  } else {
        getSong = argument.getSong;
      };
      var Spotify = require('node-spotify-api');
      var spotify = new Spotify({id: 'cdbe26aefd0248d8ada809e12b457d46', secret: '656fad1400a54ce8afcde90213d97d3c',
      });

      spotify.search({ type: 'track', query: getSong}, function(error, data) {
        console.log('i want it that way');
        console.log(data)
      };        
        for (var i =0; i<data.tracks.items.length; i++){
          console.log(data.tracks.items[i].artists[0].name);
          console.log(data.tracks.items[i].name);
          console.log(data.tracks.items[i].preview_url);
          console.log(data.tracks.items[i].album.name);
        };
    });
};

// OMDB MOVIES
 function getMovie(argument){
   var movieTitle = process.argv[3];
    if(argument=== undefined){
    movieTitle = "Mr.Nobody"; 
    } else {
      movieTitle = argument;
    };

  request("http://www.omdbapi.com/?t="+movieTitle+"&y=&plot=short&apikey=40e9cece", function(err, response, body){
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
    */
};

//DWIS 
function doWhat(){
    var fs = require ('fs');
    fs.readFile('random.txt', "utf8", function(error, data){
        console.log(data);

    textArray = data.split(',');
    
    spotifySong(textArray[1])
  })
};
