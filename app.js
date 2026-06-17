var express=require('express');
var app=express();
var session=require('express-session');
var fileupload=require('express-fileupload');

// public
app.use(express.static('public'));
app.set('views engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(fileupload());

app.use(session({
    secret:'mysecrate',
    resave:'false',
    saveUninitialized:true
}))

var web=require('./routes/web.js');
var admin=require('./routes/admin.js');

app.use('/',web);
app.use('/admin',admin);

app.listen(3000);