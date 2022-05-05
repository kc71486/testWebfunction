#!/usr/bin/env node

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url);
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const crypto = require('crypto');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonpath = "./students.json";
const app = express();
const router = express.Router();
const port = 1278;
const identityKey = 'sessionid';

app.listen(port, () => {
  console.log('listening on port: ' + port);
})

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    name: identityKey,//store user's cookie key
    secret: 'aki',  // session id related cookie signature
    store: new FileStore(),
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 10 * 1000  // ms
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
	let hashed = crypto.createHash("sha256").update(req.body.user + "@" + req.body.password, "utf8").digest("hex");
	allstu.push([req.body.user, req.body.password, hashed]);
	saveJSON(jsonpath, allstu);
	res.send("stored: "+JSON.stringify(message));
});

app.post('/loginUser', (req, res) => {
	//console.log(req);
	try{
		let message = {
			user: req.body.user,
			password: req.body.password
		};
		console.log("incoming message:" + JSON.stringify(response));
		let response = {
			success: false,
			msg: "search failed"
		};
		console.log("initial response:" + JSON.stringify(response));
		var pattern = /["'=]+/;
		if(pattern.test(userName)) {
			console.log("if pattern test");
			response.msg = "illegal attack";
			res.send(JSON.stringify(response));
		}
		console.log("after pattern test");
		/*
		var sql = 'select * from userInfo where name = "'+message.user+'" and password="'+message.password+'"';
		console.log(sql);
		mysql.query(sql,function(err,result,fildes){})
		*/
		result = [];
		console.log("initial result:" + result);
		for(let i=0; i<allstu.length; i++) {
			if(allstu[i][0] == message.user && allstu[i][1] == message.password) {
				result.push(allstu[i]);
			}
		}
		console.log("final result:" + result);
		if (result.length == 0) {
			response.msg = "no such user";
			console.log(JSON.stringify(response));
			res.send(JSON.stringify(response));
		}else{
			response.success = true;
			response.msg = "login successfully";
			req.session.regenerate(function(err){ //add session info
				req.session.loginUser =  message.user;
				res.send(JSON.stringify(response));
			});
		}
		console.log(userName)
	} catch(e) {
		 try {
            callback(false, JSON.stringify(e));
        } catch (e) {
			console.log("here");
		}
	}
});

app.get('/logoutUser', function(req, res, next){
    req.session.destroy(function(err) {
        if(err){
            res.end("logout failed");
            return;
        }
        res.clearCookie(identityKey);
        res.redirect('/');
    });
});

app.get('/showAllUser', (req, res) => {
	res.send(JSON.stringify(allstu));
});

app.post('/insertWallet', (req, res) => {
	
});

app.get('/checkLogin', function(req,res){
	var logined='';
	if(!!req.session.loginUser){
		res.send("currently logined");
	}else{
		res.send("not logined");
	}
});
