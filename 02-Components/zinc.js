'use strict';

/* eslint-env browser */

const Zinc = {};

(() => {
    function renderComponent(element, content, data) {
        console.log(element, content, data); // eslint-disable-line no-console

        let regex = /{{\s*([\w.]+)\s*}}/g;
        let arr = [data];

        for (let i = 0; i < arr.length; i++) {
            let parent = document.getElementsByTagName(element)[i];
            fetch(`${content}.html`)
                .then(html => html.text())
                .then((template) => {

                    arr.forEach(user =>
                        parent.insertAdjacentHTML('beforeend', template.replace(regex, (match, captured) =>
                            captured.split('.').reduce((acc, curr) =>
                                acc[curr], user))));
                });

        }
    }

    Zinc.registerComponent = function(elementName, templateFile, dataObject) {
        if (!Zinc.components) {
            Zinc.components = {};
        }

        Zinc.components[elementName] = {
            elementName,
            templateFile,
            data
        }
    }

    function init() {
        renderComponent('user-item', 'user', Zinc.userData);
    }

    document.addEventListener('DOMContentLoaded', init);
})();