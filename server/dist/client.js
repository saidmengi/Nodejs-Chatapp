'use strict';

var io = require('socket.io-client');
var ws = io('http://localhost:3000');

ws.on('open', function (ws) {
    console.log("Successful connected to the server");
});
//# sourceMappingURL=client.js.map