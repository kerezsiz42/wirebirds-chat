const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const router = require('./router');

const app = express();

app.use(session({
  secret: "drahtvogel chatten",
  store: new MongoStore({client: require('./db')}),
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000*60*60*24*7, httpOnly: true}
}));

app.use(express.static('media'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('views', 'views');
app.set('view engine', 'pug');
app.use('/', router);



module.exports = app;