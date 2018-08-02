function renderTemplate2(userTemplate, data) {
    let userList = document.getElementById("z-user-list");
    let matchString = /{{\s*([\w.]+)\s*}}/gm;
    console.log(data);

    data.forEach(user => {
        userList.insertAdjacentHTML('beforeend', userTemplate.replace(matchString, (match, captured) => {
            return captured.split(".").reduce((acc, curr) => acc[curr], user)
        }))
    })
}

function renderTemplate(template, users) {

    fetch(`${template}.html`)
        .then(template => template.text())
        .then(template => {
            let matchString = /{{\s*([\w.]+)\s*}}/g;

            users.forEach((user) => {

                document.getElementById("z-user-list").insertAdjacentHTML('beforeend', template.replace(matchString, (match, captured) => {
                    let arr = captured.split('.');
                    return arr.reduce((acc, curr) => acc[curr], user);
                }))
            });
        });
}

function init() {
    fetch('https://randomuser.me/api/?results=5')
        .then(res => res.json())
        .then(data => {
            const userTemplate =
                `<li class="user">
                    <img class="user-photo" src="{{ picture.thumbnail }}" alt="Photo of {{ name.first }} {{ name.last }}">
                    <div class="user-name">{{ name.first }} {{ name.last }}</div>
                    <div class="user-location">{{ location.city }}, {{ location.state }}</div>
                    <div class="user-email">{{ email }}</div>
                </li>`;

            // renderTemplate2(userTemplate, data.results);
            renderTemplate('user', data.results);
        })
}

document.addEventListener('DOMContentLoaded', init);
})();