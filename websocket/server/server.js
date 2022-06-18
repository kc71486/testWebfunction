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
    
    ws.addEventListener('open', wsopen);
    ws.addEventListener('close', wsclose);
    ws.addEventListener('message', wsreceive);
    setInterval(autosend, 1000);
    ws.send('first message');
});
var count = 0;
var incre = 1;
function wsopen(event) {
    console.log('websocket connected');
}
function wsclose(event) {
    console.log('websocket closed');
}
function wsreceive(event) {
    console.log('recieved: '+event.data);
    setTimeout(()=>{
        this.send('server count='+count);
        count += incre;
    }, 1000);
}
function autosend() {
    //console.log("this is"+this);
    ws.send('server count='+count);
    count += incre;
}
// handle http requests
app.get('/startsocket', (req, res) => {
    res.send('Success');
});