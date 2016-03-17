/**
 * Created by outstudio on 16/3/17.
 */
var express=require('express');
var app=express();
var routes=require('./routes/');


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/static'));
app.get("/", routes.index);
app.get("/login", routes.login);
app.get("/login",routes.loginProcess);
app.get('/chat',routes.chat);


app.listen(3000);
console.log("app server running on port 3000");