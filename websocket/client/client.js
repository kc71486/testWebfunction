const port = 18237;
const wsport = 18247;
var ws;
var count = 0; 

document.addEventListener('DOMContentLoaded', (event) => {
        document.getElementById("startbtn").onclick = (event) => {
            startWebsocket();
        };
    });

function startWebsocket() {
    establishws();
    /*
    window.fetch('/startsocket', {
        method: 'GET'
    }).then(function(response) {
        if (response.status >= 200 && response.status < 300)
            return response;
        else
            throw new Error(response.status +":"+response.statusText);
    }).then(response => response.text()).then(function(response) {
        console.log(response);
        establishws();
    }).catch(function(err) {
        console.log('Fetch Error :', err);
    });
    */
}
function establishws() {
    ws = new WebSocket('ws://luffy.ee.ncku.edu.tw:'+wsport+'/');
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
    console.log('recieved: '+event.data);
    console.log(this);
    setTimeout(()=>{
        this.send("count="+count);
        count += 1;
    }, 1000);
}
