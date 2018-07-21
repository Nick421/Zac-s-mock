// Server Setup and Running.
const express = require('express');
const server = express();

status = server.listen(3001, function(){
    console.log('server is running on port 3001')
});

// import Socket IO for Realtime Bi-directional Communication
const io = require('socket.io')(status);

// OPEN CONNECTION for communication.
io.on('connection', function(socket) {
    console.log(socket.id)

	// Handling EVENT Below!!!!

	// SEND_MESSAGE event.
	// The following function read:
	// ON SEND MESSAGE event, EXECUTE THIS FUNCTION.
	socket.on('SEND_MESSAGE', function(data) {
		console.log("RECEIVE 'SEND' Request")
    	io.emit('NEW_MESSAGE', data)
    });


});
