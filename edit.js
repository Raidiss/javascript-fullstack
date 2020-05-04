const userId = getParameterByName('id');

if (userId != null) {
    fetch(`http://localhost/api/users/${userId}/`)
        .then((response) => {
            return response.json();
        })
        .then((users) => {
            fillData(users[0]);
        });
}

function fillData(user) {
    document.getElementById('id').value = user.id;
    document.getElementById('username').value = user.username;
    document.getElementById('password').value = "";
    document.getElementById('first_name').value = user.first_name;
    document.getElementById('last_name').value = user.last_name;
}

function updateUser() {
    const user_id = document.getElementById('id').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;

    var jsonBody = { id: user_id, username: username, password: password, first_name: first_name, last_name: last_name };

    fetch('http://localhost/api/users/', {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBody)
    })
        .catch((ex) => console.log(ex))
        .then((res) => window.location.replace("index.html"));
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}