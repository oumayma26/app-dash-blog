const express = require("express")
,cors = require('cors')
const bodyparser = require("body-parser")
const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const path = require('path');
var passport = require('passport');
require('./server/config/passport')(passport);

app.use(bodyparser.json())

const auth = require('./server/routing/auth')
app.use("/auth",auth)

const user = require('./server/routing/user')
app.use("/users",user);

const article = require('./server/routing/article')
app.use("/article",article);

const photos = require('./server/routing/Photo')
app.use("/photos",photos);


app.use(passport.initialize());

app.listen(3000 )
