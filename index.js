// Express initializes app to be a function handler that you can supply to an HTTP server
var app = require('express')();
var http = require('http').Server(app);

// Socket.IO server that mounts on top of our HTTP Server
var io = require('socket.io')(http);

/** Define a route handler `/` that is called when we hit home */
app.get('/', function(req, res)
{
	res.send('index.html');
});

/** Define a new event handler for Socket.IO whenever a new user has connected */
io.on('connection', function(socket)
{
	console.log('A user has connected to the Socket.IO Server');
  
	socket.on('disconnect', function()
	{
    	console.log('A user has been disconnected from the Socket.IO Server');
  	});
});

/** Define a new event handler for when our socket gets a submission called 'chat message' */
io.on('connection', function(socket)
{
  	socket.on('chat message', function(msg)
	{
    	console.log('message: ' + msg);
  	});
});

/** Our HTTP Server now listens on port 3000 */
http.listen(3000, function()
{
	console.log('App is now listening on *:3000');
});