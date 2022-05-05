#!/usr/bin/env node

import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import { createRequire } from 'module'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const jsonpath = "./students.json";

const app = express();
const port = 1278;

app.listen(port, () => {
  console.log('listening on port: ' + port);
})

app.use(express.static(__dirname + '/dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function saveJSON(src, obj) {
	let tmp = JSON.stringify(obj), fs = require('fs');
	fs.writeFile(jsonpath, tmp, function (err) {
		if (err) {
			console.log(err);
		}
	});
}
function loadJSON(src) {
	return require(src);
}

var allstu = loadJSON(jsonpath);

app.post('/insertUser', (req, res) => {
	
});

app.post('/loginUser', (req, res) => {
	
});

app.get('/showAllUser', (req, res) => {
	
});

app.post('/insertWallet', (req, res) => {
	
});
