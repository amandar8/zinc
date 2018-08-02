'use strict';

/* eslint-env browser */

const Zinc = {};

(() => {
    function renderComponent(element, content, data) {
        console.log(element, content, data); // eslint-disable-line no-console

        fetch(`user.html`)
            .then(template => template.text())
            .then((template) => {
                let regex = /{{\s*([\w.]+)\s*}}/g;

                let user = template.replace(regex, (match, captured) => {
                    let arr = captured.split('.');
                    return arr.reduce((acc, curr) => acc[curr], data);
                })
                document.getElementsByTagName('user-item')[0].insertAdjacentHTML('afterbegin', user);
            });
    }

    function init() {
        renderComponent('user-item', 'user', Zinc.userData);
    }

    document.addEventListener('DOMContentLoaded', init);
})();