'use strict';

/* eslint-env browser */

const Zinc = {
    components: {}
};

(() => {

    function reviewStackLine(parentNode) {
        if (parentNode.childNodes.length === 0) {
            return;
        } 
            Array.from(parentNode.childNodes).forEach(child => {

                if (child.tagName !== undefined) {
                    let currentComponent = Zinc.components[child.tagName.toLowerCase()];
                    if (currentComponent) {
                        renderComponent(currentComponent.name, currentComponent.templateFile, currentComponent.data, currentComponent.controller);
                        console.log(currentComponent)

                    } else {
                        reviewStackLine(child);
                    }

                }
            });
    }


    //function that allows us to toggle hilight on and off
    function hilight() {
        this.classList.toggle('hilight');
    }

    //adds content to object in zinc library
    //checks insider zinc.components to see if they exist
    Zinc.registerComponent = function (configObj) {

        Zinc.components[configObj.name] = {
            name: configObj.name,
            templateFile: configObj.templateFile,
            data: configObj.data,
            controller: configObj.controller
        };
    }

    //
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

                    element.addEventListener('click', controller);
                    element.insertAdjacentHTML('beforeend', html);
                    reviewStackLine(element);
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

        fetch('https://randomuser.me/api/?results=1')
            .then(res => res.json())
            .then(data => {
                // console.log(data.results);
                data.results.forEach(user => {

                    Zinc.registerComponent({
                        name: 'user-list',
                        templateFile: 'userlist',
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

// function checkForNested(parentNode) {
//     if (parentNode.childNodes.length === 0) {
//         return;
//     } else {
//         Array.from(parentNode.childNodes).forEach((node) => {
//             if (Zinc.components[node.localName] !== undefined) {
//                 renderComponent(Zinc.components[node.localName]);
//             } else {
//                 checkForNested(node);
//             }
//         });
//         return;
//     }
// }