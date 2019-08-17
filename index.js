form.onsubmit = function (e) {
    e.preventDefault();
    var body = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'https://us-central1-mercdev-academy.cloudfunctions.net/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4)
            return;
        var res = JSON.parse(xhr.responseText);
        if (res.error) {
            document.getElementById("email").style.border = 'solid 1px #ed4159';
            document.getElementById("email").style.color = '#ed4159';
            document.getElementById("warning").style.display = 'block';
        }
        else {
            form.remove();
            var photo = document.createElement('img');
            photo.id = "avatar";
            photo.src = res.photoUrl;
            var name = document.createElement('p');
            name.innerText = res.name;
            name.id = "userName";
            var button_out = document.createElement('button');
            button_out.className = "form_button";
            button_out.onclick = z;
            button_out.innerText = "Logout";
            var div = document.createElement('div');
            div.id = "form";
            div.append(photo);
            div.append(name);
            div.append(button_out);
            container.append(div);
        }
    };
    xhr.send(JSON.stringify(body));
};

function z() {
    window.location.reload();
}