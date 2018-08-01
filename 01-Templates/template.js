'use strict';

/* eslint-env browser */

(() => {

    function renderTemplate(userTemplate, data) {
      let userList = document.getElementById('z-user-list');

      console.log(data);

      let regex = /{{\s(.*?)\s}}/gm;
    

      data.forEach(user => {
        let userString = userTemplate.replace(regex, (match, captured) => {
            let splitArr = captured.split('.');
            while (splitArr.length > 0)

            })
            return capture[splitArr[0]][splitArr[1]];

        })
        userList.insertAdjacentHTML('afterend', userString);
      });
    }

    function init() {
      fetch('https://randomuser.me/api/?results=5')
        .then(res => res.json())
        .then(json => {

      let userTemplate = `<li class="user">
      <img class="user-photo" src="{{ picture.thumbnail }}" alt="Photo of {{ name.first }} {{ name.last }}">
      <div class="user-name">{{ name.first }} {{ name.last }}</div>
      <div class="user-location">{{ location.city }}, {{ location.state }}</div>
      <div class="user-email">{{ email }}</div>
  </li>`;


renderTemplate(userTemplate, json.results);
        })
      }

      document.addEventListener('DOMContentLoaded', init);
    })();