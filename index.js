const list = document.getElementById('list');

fetch('http://localhost/api/users/')
    .then((response) => {
        return response.json();
    })
    .then((users) => {
        list.innerHTML = listOfNames(users);
    });

function listOfNames(users) {
    const header = `<tr><th>First Name</th><th>Last Name</th><th colspan="2">Actions</th></tr>`;
    const rows = users.map(
        (user) => 
            `<tr><td>${user.first_name}</td>
            <td>${user.last_name}</td>
            <td><a href="edit.html?id=${user.id}">Edit</a></td>
            <td><a href="#" onclick="deleteUser(${user.id});return false;">Delete</a></tr>`
    ).join('');
    return `<table>${header}${rows}</table>`;
}

function saveUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;

    var jsonBody = { username: username, password: password, first_name: first_name, last_name: last_name };

    fetch('http://localhost/api/users/', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBody)
    })
        .catch((ex) => console.log(ex))
        .then((res) => res.json())
        .then((res) => console.log(res));
}

function deleteUser(userId) {
    fetch(`http://localhost/api/users/${userId}`, {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .catch((ex) => console.log(ex))
        .then((res) => window.location.replace("index.html"));
}
