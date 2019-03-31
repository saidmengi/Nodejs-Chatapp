const io = require('socket.io-client');
var ws = io.connect('http://localhost:3000');

ws.on('connect', () =>{
    console.log("Successful connected client 1 to the server");
    //send new message from this client to server
    ws.send('hello server my name is client 1');

    //Listen new message
    ws.on('message', (message) => {

        console.log(message);

    });
});
