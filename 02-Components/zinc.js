'use strict';

/* eslint-env browser */

const Zinc = {};

(() => {

    function hilight() {
        console.log(this);
        this.classList.toggle('hilight');
    }

    Zinc.registerComponent = function (configObj) {
        if (!Zinc.components) {
            Zinc.components = {};
        }

        Zinc.components[configObj.name] = {
            name: configObj.name,
            templateFile: configObj.templateFile,
            data: configObj.data,
            controller: configObj.controller
        };
    }

    // element.addEventListener('click', function(e){

    function renderComponent(element, content, data, controller) {
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
                    // console.log(element.children);
                    element.addEventListener('click', controller);
                    // element.insertAdjacentHTML('beforeend', html);

                    let children = Array.from(element.firstElementChild.children);

                    children.forEach(child => {
                        child.insertAdjacentHTML('beforeend', html);
                        child.addEventListener('click', controller);

                        let grandchildren = Array.from(child.children);

                        grandchildren.forEach(grandchild => {
                            grandchild.addEventListener('click', controller);
                        })


                    })
                })
            })
    }

    function renderComponents(components) {
        for (let component in components) {
            renderComponent(
                components[component].name,
                components[component].templateFile,
                components[component].data,
                components[component].controller)
        }
    }

    function init() {
        // Zinc.registerComponent('user-item', 'user', Zinc.userData, controller);
        // renderComponents(Zinc.components);

        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(data => {
                // console.log(data.results);
                data.results.forEach(user => {


                    Zinc.registerComponent({
                        name: 'user-list',
                        templateFile: 'user',
                        data: user,
                        controller: hilight
                    });

                    Zinc.registerComponent({
                        name: 'user-info',
                        templateFile: 'user',
                        data: user,
                        controller: hilight
                    });

                    renderComponents(Zinc.components);

                })
            })
    }
    document.addEventListener('DOMContentLoaded', init);

})()