var express = require('express');
var app = express();
var ejs=require("ejs");
var server = require('http').Server(app);
var io = require('socket.io')(server);
var session = require('express-session');
app.set("views","./");
app.set("view engine","ejs");

app.use(session({
    secret: '123456',
    resave:true,
    saveUninitialized:true
}))

app.use(express.static("./"));

server.listen(3000);

app.get('/', function (req, res) {
    req.session.name="zhangsan";

    res.render("socket.ejs");
});

io.on('connection', function (socket) {
    console.log(socket.id);
    //console.log(socket.request.headers.cookie);
});