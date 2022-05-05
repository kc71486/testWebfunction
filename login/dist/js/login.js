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
			Promise.resolve(response);
		else
			Promise.reject(new Error(response.statusText));
	}).then(function(response) {
		document.getElementById("login-user-output").innerHTML = response.text();
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
			Promise.resolve(response);
		else
			Promise.reject(new Error(response.statusText));
	}).then(function(response) {
		document.getElementById("insert-wallet-output").innerHTML = response.text();
	}).catch(function(err) {
		console.log("Fetch Error :-S", err);
	});
}
async function showAllUserRequest() {
	window.fetch(SHOWALL_USER_URL, {
		method: "GET"
	}).then(function(response) {
		if (response.status >= 200 && response.status < 300)
			Promise.resolve(response);
		else
			Promise.reject(new Error(response.statusText));
	}).then(response => response.json()).then(function(result) {
		let userlist = "";
		Object.entries(result).forEach(([key, value]) => {
			userlist += `\"${key}\":\"${value}\"<br>`;
		};
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
			Promise.resolve(response);
		else
			Promise.reject(new Error(response.statusText));
	}).then(function(response) {
		document.getElementById("insert-wallet-output").innerHTML = response.text();
	}).catch(function(err) {
		console.log("Fetch Error :-S", err);
	});
}

document.addEventListener("DOMContentLoaded", (event) => {
	document.querySelector("#insert-user-form button[type='submit']").onclick = (event) => {
		event.preventDefault();
		insertUserRequest();
	};
	document.getElementById("#login-user-form button[type='submit']").onclick = (event) => {
		event.preventDefault();
		loginUserRequest();
	};
	document.getElementById("#showAll-user-form button[type='submit']").onclick = (event) => {
		event.preventDefault();
		showAllUserRequest();
	};
	document.getElementById("#insert-wallet-form button[type='submit']").onclick = (event) => {
		event.preventDefault();
		insertWalletRequest();
	};
});




$(document).ready(function() {
  // insert a new user
  $('#insert-user-form button[type="submit"]').click((event) => {
    event.preventDefault()
    $.get('./insertUser', {
      username: $('#insert-user-form input[name=username]').val(),
      password: $('#insert-user-form input[name=password]').val(),
    }, (data) => {
      $('#insert-user-output').html(data)
    })
  })
  // user log in 
  $('#login-user-form button[type="submit"]').click((event) => {
    event.preventDefault()
    $.get('./loginUser', {
      username: $('#login-user-form input[name=username]').val(),
      password: $('#login-user-form input[name=password]').val(),
    }, (data) => {
      $('#login-user-output').html(data)
    })
  })
  // show all users
  $('#showAll-user-form button[type="submit"]').click((event) => {
    event.preventDefault()
    $.get('./showAll-user', {
    }, (data) => {
      $('#showAll-user-output').html(data)
    })
  })
  // insert a new wallet under the user
  $('#insert-wallet-form button[type="submit"]').click((event) => {
    event.preventDefault()
    $.get('./insertWallet', {
      wallet: $('#insert-wallet-form input[name=wallet]').val(),
    }, (data) => {
      $('#insert-wallet-output').html(data)
    })
  })
})