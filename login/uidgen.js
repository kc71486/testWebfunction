import { createRequire } from 'module'
const require = createRequire(import.meta.url);

var crypto = require('crypto');

usr = ["1234", "5678", "A123", "92231", "0000", "CCKK", "qwerty", "user"]
passwd = ["ABCD", "EFGH", "0123", "95414", "9999", "kkcc", "asdfgh", "password"]
const jsonpath = "./students.json";
const logintable = [
	["1234", "ABCD"],
	["5678", "EFGH"],
	["A123", "0123"],
	["92231", "95414"],
	["0000", "9999"],
	["CCKK", "kkcc"],
	["qwerty", "asdfgh"],
	["user", "password"]
];

function saveJSON(src, obj) {
	let tmp = JSON.stringify(obj), fs = require('fs');
	fs.writeFile(jsonpath, tmp, function (err) {
		if (err) {
			console.log(err);
		}
	});
}

for(var i=0; i<8; i++) {
	logintable[i][2] = crypto.createHash("sha256").update(logintable[i][0] + "@" + logintable[i][1], "utf8").digest("hex");
}
saveJSON(jsonpath, logintable);