#!/usr/bin/env node

//import
import express from 'express'
import bodyParser from 'body-parser'
import WebSocket, { WebSocketServer } from 'ws';

//directory
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __rootname = dirname(dirname(fileURLToPath(import.meta.url)));

// construct a web server instance
const app  = express();
const port = 18237;
const wsport = 18247;
// start the server
app.listen(port, () => {console.log('listening on port: ' + port);});
// handle other urls
app.use(express.static(__rootname + '/client'));
// handle bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// handle websocket
const wss = new WebSocketServer({
    port: wsport
});
wss.on('connection', function connection(ws) {
    let count = 0;
    ws.addEventListener('open', function() {
      console.log('websocket connected');
    });
    ws.addEventListener('close', function() {
      console.log('websocket closed');
    });
    ws.addEventListener('message', function(event) {
        console.log('recieved: '+event.data);
        setTimeout(()=>{
            ws.send("server count="+count);
            count += 1;
        }, 1000);
    });
});
// handle http requests
app.get('/startsocket', (req, res) => {
    res.send('Success');
});