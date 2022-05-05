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
const app = express.router();
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

router.post('/loginUser',function (req,res){
	//console.log(req);
	try{
		let message = {
			user: req.body.user,
			password: req.body.password
		};
		let response = {
			success:false,
			msg:"查询失败"
		}
		var pattern = /["'=]+/;
		if(pattern.test(userName)){
			response.msg = "非法攻击";
			res.end(JSON.stringify(response));
		}
		/*
		var sql = 'select * from userInfo where name = "'+userName+'" and password="'+password+'"';
		console.log(sql);
		mysql.query(sql,function(err,result,fildes){})
		*/
		console.log(result);
		 if (result.length == 0) {
			response.errormsg = "无此人信息";
			 res.end(JSON.stringify(response));
		 }else{
			response.success = true;
			response.errormsg = "查询成功";
			var sess = req.session;
			sess.regenerate(function(err){ //添加session信息
				req.session.loginUser =  params.userName;
				 res.end(JSON.stringify(response));
				
			})
			
		 }
		console.log(userName)
	} catch(e) {
		 try {
            callback(false, JSON.stringify(e));
        } catch (e) {}
	}
});