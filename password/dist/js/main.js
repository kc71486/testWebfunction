const inputFile = document.querySelector(`input[type="file"]`);
const btn = document.getElementById("button");
const rem = document.getElementById("remember");
var userinfo;


document.addEventListener('DOMContentLoaded', (event) => {
	if(localStorage.getItem("user") != null) {
		userinfo = JSON.parse(localStorage.getItem("user"));
		document.getElementById("user").value = userinfo.name;
		document.getElementById("passwd").value = userinfo._password;
	}	
	else {
		userinfo = {name: "", _password: ""};
	}
	if(localStorage.getItem("remember") === "true") {
		rem.checked = localStorage.getItem("remember");
	}
	});
inputFile.onchange = async (event) => {
	for (const file of event.target.files) {
		console.log(file.name, file.type, file.size + "bytes")
		const hashHex = await getHash("SHA-256", new Blob([file]))
		console.log(hashHex)
	}
}
rem.onchange = (event) => {
	if(! rem.checked) {
		localStorage.removeItem("user");
	}
	localStorage.setItem("remember", rem.checked);
}
btn.onclick = async (event) => {
	const user = document.getElementById("user").value;
	const passwd = document.getElementById("passwd").value;
	const hashHex = await getHash("SHA-256", passwd + "@" + user);
	console.log("user=" + user);
	console.log("password=" + passwd);
	console.log("hash=" + hashHex);
	if(rem.checked) {
		userinfo.name = user;
		userinfo._password = passwd;
		localStorage.setItem("user", JSON.stringify(userinfo));
	}
	console.log(userinfo);
}

function loginrequest() 
	let xhttp = new XMLHttpRequest(), url="/login";
	xhttp.open("POST", url, true);
	xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhttp.send(JSON.stringify({
		name=document.getElementById("user").value,
		_password=document.getElementById("passwd").value}));
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState == 4 && Math.floor(xhttp.status/100) == 2) {
			document.getElementById("showarea").innerHTML = xhttp.responseText;
		} else {
			document.getElementById("showarea").innerHTML = "error: " + xhttp.status;
		}
	};
}
