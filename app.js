const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Sequelize = require('sequelize');
const session = require('express-session');
const methodOverride = require('method-override');

const sequelize = require('./database/sequelize');
// sequelize.sync();


const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'authentication',
  resave: false,
  saveUninitialized: true
}));

app.use((req,res,next) => {
  res.locals.currentUser = req.session.user;
  res.locals.title = "Authentication";
   // set success flash message
   res.locals.success = req.session.success || '';
   delete req.session.success;
   // set error flash message
   res.locals.error = req.session.error || '';
   delete req.session.error;
  next();
})

// Mount Routes
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if(err.message == "Validation error") req.session.error = "User already exist!"
  else req.session.error = err.message;
  return res.redirect('back');
});

module.exports = app;
