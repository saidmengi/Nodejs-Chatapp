const io = require('socket.io-client');
var socket = io.connect('http://localhost:3000');

socket.on('connect', () =>{
    console.log("Successful connected client 2 to the server");

    socket.send('hello server my name is client 2');

    //Listen new message
    socket.on('message', (message) => {

        console.log(message);

    });
});
