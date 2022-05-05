#!/usr/bin/env node

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url);
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonpath = "./students.json";
const app = express();
const port = 1278;
const identityKey = 'skey';

app.listen(port, () => {
  console.log('listening on port: ' + port);
})

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    name: identityKey,//存储在用户cookie中的key名
    secret: 'aki',  // 用来对session id相关的cookie进行签名
    store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 10 * 1000  // 有效期，单位是毫秒
    }
}));

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
	let message = {
		user: req.body.user,
		password: req.body.password
	};
	allstu[req.body.user] = req.body.password;
	saveJSON(jsonpath, allstu);
	res.send("stored: "+JSON.stringify(message));
});

app.post('/loginUser', (req, res) => {
	
});

app.get('/showAllUser', (req, res) => {
	res.send(JSON.stringify(allstu));
});

app.post('/insertWallet', (req, res) => {
	
});
