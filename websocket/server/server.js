#!/usr/bin/env node

//import
import express from 'express'
import bodyParser from 'body-parser'
import expressWs from 'express-ws'
import mysql from 'mysql'

//directory
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __rootname = dirname(dirname(fileURLToPath(import.meta.url)));

//mysql
const config = {
  'mysql': {
    'database': 'wp2022_group8',
    'host': 'localhost',
    'password': 'G2FxUI4XqP1TwkerEkHvzmpUIPWrOrkoBFqyNINMlbE=',
    'user': 'wp2022_group8'
  }
}
var connection = mysql.createConnection(config.mysql)
connection.connect(err => {
  if(err) throw err
  console.log("MYSQL Connected")
})
const queryPromise = sql => {
  return new Promise((res, rej) => {
    connection.query(sql, (err, rows) => {
      if(err) rej(err);
      else res(rows)
    })
  })
}

// construct a web server instance
const app  = express();
expressWs(app);
const port = 18237;
// start the server
app.listen(port, () => {console.log('listening on port: ' + port);});
// handle other urls
app.use(express.static(__rootname + '/client'));
// handle bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// handle websocket
var count = 0;
var incre = 1;
app.ws('/increment', (ws, req) => {
    ws.on('message', function(msg) {
        incre += msg;
    });
    setInterval(function(msg) {
        ws.send('count='+count);
    }, 1000)
});
app.ws('/getfile', (ws, req) => {
    let sql  = `SELECT picture FROM card WHERE cid = 2 AND cardset = 6`
    let ret = null;
    queryPromise(sql).then(result => {
        ret = result[0].picture;
    }).catch(err => {
        console.log(err);
        res.status(500).end();
    })
    setTimeout(function(msg) {
        if(ret != null)
            ws.send(ret);
    }, 2000)
});
// handle http requests
app.get('/startsocket', (req, res) => {
    res.send('Success');
});