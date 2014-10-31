/*************************************
//
// flappybit-game app
//
**************************************/

// express magic
var express = require('express');
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);
var device  = require('express-device');


var runningPortNumber = 8989;


app.configure(function(){
	// I need to access everything in '/public' directly
	app.use(express.static(__dirname + '/public'));

	//set the view engine
	app.set('view engine', 'ejs');
	app.set('views', __dirname +'/views');

	app.use(device.capture());
});


// logs every request
app.use(function(req, res, next){
	// output every request in the array
	console.log({method:req.method, url: req.url, device: req.device});

	// goes onto the next function in line
	next();
});

app.get("/", function(req, res){
	res.render('index', {});
});

var client;

io.sockets.on('connection', function (socket) {

	io.sockets.emit('connected', {msg:"someone connected"});

	
	var net = require('net');
 
	client = new net.Socket();
	client.connect(42001, '127.0.0.1', function() {
		console.log('Connected');
		//client.write('Hello, server! Love, Client.');
	});
	 
	client.on('data', function(data) {
		console.log('Received: ' + data);
		io.sockets.emit('jump', {msg:"jump"});
		//client.destroy(); // kill client after server's response
	});
	 
	client.on('close', function() {
		console.log('Connection closed');
	});

	socket.on('connected', function(data, fn){
		console.log('connected' + data);
		//io.sockets.emit('jump', {msg:data.msg});

		fn();//call the client back to clear out the field
	});

});


server.listen(runningPortNumber);

