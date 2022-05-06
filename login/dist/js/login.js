async function insertUserRequest() {
	window.fetch(INSERT_USER_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8"
		},
		body: JSON.stringify({
			user: document.querySelector("#insert-user-form [name=username]").value,
			password: document.querySelector("#insert-user-form [name=password]").value
		})
	}).then(function(response) {
		if (response.status >= 200 && response.status < 300)
			return response;
		else
			throw new Error(response.status +":"+response.statusText);
	}).then(response => response.text()).then(function(response) {
		document.getElementById("insert-user-output").innerHTML = response;
	}).catch(function(err) {
		console.log("Fetch Error :-S", err);
	});
}
async function loginUserRequest() {
	window.fetch(LOGIN_USER_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8"
		},
		body: JSON.stringify({
			user: document.querySelector("#login-user-form [name=username]").value,
			password: document.querySelector("#login-user-form [name=password]").value
		})
	}).then(function(response) {
		if (response.status >= 200 && response.status < 300)
			return response;
		else
			throw new Error(response.status +":"+response.statusText);
	}).then(response => response.json()).then(function(result) {
		document.getElementById("login-state-output").innerHTML = result.msg;
	}).catch(function(err) {
		console.log("Fetch Error :-S", err);
	});
}
async function logoutUserRequest() {
	window.fetch(LOGOUT_USER_URL, {
		method: "GET"
	}).then(function(response) {
		if (response.status >= 200 && response.status < 300)
			return response;
		else
			throw new Error(response.status +":"+response.statusText);
	}).then(response => response.text()).then(function(response) {
		document.getElementById("login-state-output").innerHTML = response;
	}).catch(function(err) {
		console.log("Fetch Error :-S", err);
	});
}
async function checkLoginRequest() {
	window.fetch(CHECK_LOGIN_URL, {
		method: "GET"
	}).then(function(response) {
		if (response.status >= 200 && response.status < 300)
			return response;
		else
			throw new Error(response.status +":"+response.statusText);
	}).then(response => response.text()).then(function(response) {
		document.getElementById("login-state-output").innerHTML = response;
	}).catch(function(err) {
		console.log("Fetch Error :-S", err);
	});
}
async function showAllUserRequest() {
	window.fetch(SHOWALL_USER_URL, {
		method: "GET"
	}).then(function(response) {
		if (response.status >= 200 && response.status < 300)
			return response;
		else
			throw new Error(response.status +":"+response.statusText);
	}).then(response => response.json()).then(function(result) {
		let userlist = "";
		Object.entries(result).forEach(([key, value]) => {
			userlist += `\"${key}\":\"${value}\"<br>`;
		});
		document.getElementById("showAll-user-output").innerHTML = userlist;
	}).catch(function(err) {
		console.log("Fetch Error :-S", err);
	});
}
async function insertWalletRequest() {
	window.fetch(INSERT_WALLET_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8"
		},
		body: JSON.stringify({
			wallet: document.querySelector("#insert-wallet-form [name=wallet]").value
		})
	}).then(function(response) {
		if (response.status >= 200 && response.status < 300)
			return response;
		else
			throw new Error(response.status +":"+response.statusText);
	}).then(response => response.text()).then(function(response) {
		document.getElementById("insert-wallet-output").innerHTML = response;
	}).catch(function(err) {
		console.log("Fetch Error :-S", err);
	});
}

document.addEventListener("DOMContentLoaded", (event) => {
	document.querySelector("#insert-user-form button[type='submit']").onclick = (event) => {
		event.preventDefault();
		insertUserRequest();
	};
	document.querySelector("#login-user-form button[type='submit']").onclick = (event) => {
		event.preventDefault();
		loginUserRequest();
	};
	document.querySelector("#logout-user-form button[type='submit']").onclick = (event) => {
		event.preventDefault();
		logoutUserRequest();
	};
	document.querySelector("#showAll-user-form button[type='submit']").onclick = (event) => {
		event.preventDefault();
		showAllUserRequest();
	};
	document.querySelector("#insert-wallet-form button[type='submit']").onclick = (event) => {
		event.preventDefault();
		insertWalletRequest();
	};
});
