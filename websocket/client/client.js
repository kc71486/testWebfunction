const port = 18237;
const wsport = 18247;
var ws;
var count = 0; 

document.addEventListener('DOMContentLoaded', (event) => {
        document.getElementById('startbtn').onclick = (event) => {
            establishws();
        };
        document.getElementById('sendbtn').onclick = (event) => {
            establishws();
        };
    });

function establishws() {
    ws = new WebSocket('ws://140.116.177.150:'+wsport+'/');
    ws.addEventListener('open', wsopen);
    ws.addEventListener('close', wsclose);
    ws.addEventListener('message', wsreceive);
}
function wsopen() {
    console.log('websocket connected');
}
function wsclose() {
    console.log('websocket closed');
}
function wsreceive(event) {
    console.log('receive: ' + event.data);
}
function addincre() {
    ws.send('add incre');
}