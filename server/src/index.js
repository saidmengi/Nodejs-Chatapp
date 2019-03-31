import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import {version} from '../package.json'
const JSON = require('circular-json');

var socket = require('socket.io');

const PORT = 3000;
const app = express();
app.server = http.createServer(app);


app.use(morgan('dev'));


app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));


app.io = socket(app.server);
let clients = [];

app.io.on('connection', (connection)=>{
    console.log('a user connected');

    
    const userId = clients.length +1;
    connection.userId = userId;

    const newClient = {
        ws: connection,
        userId: userId,
    };

    clients.push(newClient);
    console.log('new client connected with user id : ', userId);
    
    connection.on('message', (message) => {
        console.log("we have got message from client, the message is:", message);
    });

    connection.on('disconnect', ()=>{
        console.log("client with ID", userId, 'is disconnected');
        clients = clients.filter((client) => client.userId !== userId);
    });
  });

  app.get('/', (req, res)=>{
    res.json({
        version: version
    });
});

  app.get('/api/all_connections', (req, res, next)=>{
    
    return res.json({

       people: clients,
    });
});

setInterval(() =>{
    console.log(`There ${clients.length} clients in the connection`);

    if(clients.length > 0){

        clients.forEach((client)=>{
            //console.log('Client ID', client.userId);

            const msg = `Hey ID: ${client.userId}: you got a new message from server`
            client.ws.send(msg);
        });
    }
}, 3000);


app.server.listen(process.env.PORT || PORT, () => {
        console.log(`App is running on port ${app.server.address().port}`);
});

export default app;