var express = require('express')

  , app = express()

  , http = require('http')

  , server = http.createServer(app)

  ,Twit = require('twit')

  , io = require('socket.io').listen(server)

  , url = require('url');


server.listen(8119);
app.use(express.static('images'));
// routing

app.get('/', function (req, res) {

  res.sendFile(__dirname + '/index.html');

  });

 

app.get('/sector', function(req,res)

{

 

var sectorVar = url.parse(req.url, true).query['sector'];

console.log(sectorVar);

 

switch (sectorVar)

{

    case "automobile":

        var watchList = ['auto loans'];

        break;

    case "telecom":

        var watchList = ['telecom offers'];

        break;

    case "retail":

        var watchList = ['Retail Offers'];

        break;

    case "loans":

        var watchList = ['loans'];

        break;

}

 

 

console.log(watchList);

 

var T = new Twit({

    consumer_key:         'J653fFCFs0e6zVVQ6Iv0g'

  , consumer_secret:      '9gWMjoU1sdaTng57fpn3kJJLqcYXEPZtUWcTTmv7I'

  , access_token:         '28950913-t6S1OOYW3TEqOCVdyqqtttguP0a9WPfLkdUqe3diB'

  , access_token_secret:  'ITLOMomZzFw3WXIEt5ZureboGv0CHzyvAyDdiWcevuDwe'

})

 

 

io.sockets.on('connection', function (socket)

{

  console.log('Connected');

  var stream = T.stream('statuses/filter', {track: watchList})

 

  console.log(stream);

 

  stream.on('tweet', function (tweet)

  {

    console.log('inside stream function');

    io.sockets.emit('stream',tweet.text);

    console.log(tweet.text);

  });

});

 

  res.sendFile(__dirname + '/index.html');

});