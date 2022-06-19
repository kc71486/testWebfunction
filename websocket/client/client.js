const port = 18237;
const wsport = 18247;
var ws1, ws2;
var count = 0; 

document.addEventListener('DOMContentLoaded', (event) => {
        document.getElementById('startbtn').onclick = (event) => {
            establishws();
        };
        document.getElementById('increbtn').onclick = (event) => {
            addincre();
        };
        document.getElementById('increbtn').onclick = (event) => {
            addincre();
        };
    });

function establishws() {
    ws1 = new WebSocket('ws://140.116.177.150:'+wsport+'/increment');
    ws1.addEventListener('open', wsopen);
    ws1.addEventListener('close', wsclose);
    ws1.addEventListener('message', wsreceive);
    ws2 = new WebSocket('ws://140.116.177.150:'+wsport+'/getfile');
    ws2.binaryType = 'blob';
    ws2.addEventListener('open', wsopen);
    ws2.addEventListener('close', wsclose);
    ws2.addEventListener('message', wspicture);
}
function wsopen() {
    console.log('websocket connected');
}
function wsclose() {
    console.log('websocket closed');
}
function wsreceive(event) {
    document.getElementById('recievearea').innerHTML = 'receive: ' + event.data;
}
function addincre() {
    ws1.send(1);
}
function wspicture(event) {
    let imageUrl = urlCreator.createObjectURL(event.data)
    document.getElementById("image1").src = imageUrl;
}