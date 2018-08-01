'use strict';

/* eslint-env browser */

(() => {

    function renderTemplate(userTemplate, data) {
      let userList = document.getElementById('z-user-list');

      console.log(data);

      let regex = /{{\s(.*?)\s}}/gm;

      let dataMap = data.map(user => {
        const userData = {
          photo: user.picture.thumbnail,
          firstName: user.name.first,
          lastName: user.name.last,
          city: user.location.city,
          state: user.location.state,
          email: user.email
        };

        return userData
      })

      dataMap.forEach(user => {
        let userString = userTemplate.replace(regex, (match, captured) => {
          return user[captured];

        })
        userList.insertAdjacentHTML('afterend', userString);
      });
    }

    function init() {
      fetch('https://randomuser.me/api/?results=5')
        .then(res => res.json())
        .then(json => {

      let userTemplate = `<li class="user">
    <img class="user-photo" src="{{ photo }}" alt="Photo of {{ firstName }} {{ lastName }}">
    <div class="user-name">{{ firstName }} {{ lastName }}</div>
    <div class="user-location">{{ city }}, {{ state }}</div>
    <div class="user-email">{{ email }}</div>
    </li>`;


renderTemplate(userTemplate, json.results);
        })
      }

      document.addEventListener('DOMContentLoaded', init);
    })();