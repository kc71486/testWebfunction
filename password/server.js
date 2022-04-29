#!/usr/bin/env node

import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import { createRequire } from 'module'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const jsonpath = "./userinfo.json";

const app = express();
const port = 1268;

app.listen(port, () => {
  console.log('listening on port: ' + port);
})

app.use(express.static(__dirname + '/dist'));

function loadJSON(src) {
	return require(src);
}

var alluser = loadJSON(jsonpath);


app.post('/login', (req, res) => {
	
});