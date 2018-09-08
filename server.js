const express = require("express")
,cors = require('cors')
const bodyparser = require("body-parser")
const app = express()
const path = require('path');

require('./server/config/passport');

app.use(bodyparser.json())

const auth = require('./server/routing/auth')
app.use("/auth",auth)

const user = require('./server/routing/user')
app.use("/users",user);

const article = require('./server/routing/article')
app.use("/article",article);

const photos = require('./server/routing/Photo')
app.use("/photos",photos);

// app.use(express.static(__dirname + '/src/'));
// const allowedExt = [
//   '.js',
//   '.ico',
//   '.css',
//   '.png',
//   '.jpg',
//   '.woff2',
//   '.woff',
//   '.ttf',
//   '.svg',
//   '.woff2'
// ];

// app.get('', function(req, res, next) {
//   // res.sendFile(path.resolve('src/index.html'));
//   if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
//     res.sendFile(path.resolve(`dist/${req.url}`));
//   } else {
//     res.sendFile(path.resolve('dist/index.html'));
//   }
// });

// app.use('/', express.static(path.join(__dirname, 'dist')));




// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


// after the code that uses bodyParser and other cool stuff
var originsWhitelist = [
  'http://localhost:4200'   //this is my front-end url for development
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
//here is the magic
app.use(cors(corsOptions));
app.listen(3000 )
