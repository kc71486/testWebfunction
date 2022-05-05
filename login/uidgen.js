import { createRequire } from 'module'
const require = createRequire(import.meta.url);

var crypto = require('crypto');

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