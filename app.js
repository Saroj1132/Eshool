var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var fileupload=require('express-fileupload')
var logger = require('morgan');
var flash=require('connect-flash')
var toastr=require('express-toastr')
const session=require('express-session')
const mongoose=require('mongoose')
const key=require('./config/key')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminrouter=require('./routes/admin/admin')
var studrouter=require('./routes/student/index')
var app = express();


mongoose.connect(key.url, (err, db)=>{
  console.log("Connectiong to db")
})

app.use(fileupload())
app.use(toastr())
app.use(flash())

app.use(session({
  secret:'sessiondatata',
  saveUninitialized:true,
  resave:false
}))

app.use(function(req, res, next) {
  res.locals.stud = req.session.stud;
  res.locals.lesson = req.session.lesson;
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminrouter)
app.use('/Student', studrouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000) 