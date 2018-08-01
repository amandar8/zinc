'use strict';

/* eslint-env browser */

(() => {

  function renderTemplate(userTemplate, data) {
    let userList = document.getElementById('z-user-list');

    console.log(data);

    let regex = /{{\s*([\w.]+)\s*}}/gm;

    data.forEach(user =>
      userList.insertAdjacentHTML('beforeend', userTemplate.replace(regex, (match, captured) =>
        captured.split('.').reduce((acc, curr) =>
          acc[curr], user)))
    );
  }

  function init() {
    fetch('https://randomuser.me/api/?results=5')
      .then(res => res.json())
      .then(json => {

        let userTemplate = `
      <li class="user">
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