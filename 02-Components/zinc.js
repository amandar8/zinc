'use strict';

/* eslint-env browser */

const Zinc = {};

(() => {
    function renderComponent(element, content, data) {
        let elements = Array.from(document.getElementsByTagName(element));
        let regex = /{{\s*([\w.]+)\s*}}/g;
        fetch(`${content}.html`)
            .then(content => content.text())
            .then((content) => {
                elements.forEach(element => {
                    let html = content.replace(regex, (match, capture) => {
                        let arr = capture.split('.');
                        return arr.reduce((acc, curr) => acc[curr], data);
                    })
                    element.insertAdjacentHTML('beforeend', html);
                })
            })
    }

    function renderComponents(components) {
        for (let component in components) {
            renderComponent(
                components[component].elementName,
                components[component].templateFile,
                components[component].dataObject)
        }
    }

    Zinc.registerComponent = function (elementName, templateFile, dataObject) {
        if (!Zinc.components) {
            Zinc.components = {};
        }

        Zinc.components[elementName] = {
            elementName,
            templateFile,
            dataObject
        }
    }

    function init() {
        Zinc.registerComponent('user-item', 'user', Zinc.userData);
        renderComponents(Zinc.components);
    }


    document.addEventListener('DOMContentLoaded', init);
})();