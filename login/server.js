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
	name: identityKey,//store user's cookie key( =sid )
	secret: 'aki',  // session id related cookie signature
	//store: new MemoryStore(),
	store: new FileStore(),
	saveUninitialized: false,
	resave: false,
	secure: false,
	httpOnly: true,
	cookie: {
        maxAge: 600  // s
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
		password: req.body.password,
		uid: ""
	};
	let hashed = crypto.createHash("sha256").update(req.body.user + "@" + req.body.password, "utf8").digest("hex");
	allstu.push([req.body.user, req.body.password, hashed]);
	saveJSON(jsonpath, allstu);
	res.send("stored: "+JSON.stringify(message));
});

app.post('/loginUser', (req, res) => {
	try{
		let message = {
			user: req.body.user,
			password: req.body.password
		};
		let response = {
			success: false,
			msg: "search failed"
		};
		if(req.session.uid === "") {
			success = true;
			msg = "already login";
			response.uid = req.session.uid;
		}
		else {
			let pattern = /["'=]+/;
			if(pattern.test(message.user)) {
				response.msg = "illegal attack";
				res.send(JSON.stringify(response));
			}
			/*
			var sql = 'select * from userInfo where name = "'+message.user+'" and password="'+message.password+'"';
			console.log(sql);
			mysql.query(sql,function(err,result,fildes){})
			*/
			let result = [];
			for(let i=0; i<allstu.length; i++) {
				if(allstu[i][0] == message.user && allstu[i][1] == message.password) {
					result.push(allstu[i]);
				}
			}
			if (result.length == 0) {
				response.msg = "no such user";
				res.send(JSON.stringify(response));
			}else{
				req.session.regenerate(function(err){ //add session info
					req.session.uid =  result[0][2];
					console.log(":" + JSON.stringify(req.session));
					response.success = true;
					response.msg = "login successfully";
					response.uid = req.session.loginUser;
					res.send(JSON.stringify(response));
				});
			}
		}
	} catch(e) {
		try {
			res.status(500).send("something went wrong");
			console.log(e);
		} catch (e2) {
			console.log("something went wrong again");
		}
	}
});

app.get('/logoutUser', function(req, res, next){
    req.session.destroy(function(err) {
        if(err){
            res.send("logout failed");
            return;
        }
        res.clearCookie(identityKey);
		res.send("logout successed");
        //res.redirect('/');
    });
});

app.get('/showAllUser', (req, res) => {
	res.send(JSON.stringify(allstu));
});

app.post('/insertWallet', (req, res) => {
	if(req.session.uid != ""){
		res.send("currently logined, uid=" + req.session.uid);
	}else{
		res.send("not logined");
	}
});

app.get('/checkLogin', function(req,res){
	var logined='';
	if(req.session.uid != ""){
		res.send("currently logined, uid=" + req.session.uid);
	}else{
		res.send("not logined");
	}
});
