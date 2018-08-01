
'use strict';

/* eslint-env browser */


(() => {

    function renderTemplate(template, data) {
        fetch(`${template}.html`)
            .then(template => template.text())
            .then((template) => {
                let regex = /{{\s*([\w.]+)\s*}}/g;

                data.forEach((user) => {
                    let renderTemplate = template.replace(regex, (match, captured) => {
                        let arr = captured.split('.');
                        return arr.reduce((acc, curr) => acc[curr], user);
                    });
                    document.getElementById('z-user-list').insertAdjacentHTML('beforeend', renderTemplate);
                });
            });
    };

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(data => renderTemplate('user', data.results));
    }

    document.addEventListener('DOMContentLoaded', init);
    
})();