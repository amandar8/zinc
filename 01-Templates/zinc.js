'use strict';

/* eslint-env browser */

(() => {

    function populateList(results) {
        let userList = document.getElementById('z-user-list'); //grab element of z-user-list
        console.log(results); // eslint-disable-line no-console
        for (let i = 0; i < results.length; i++) { //loops through results

            userList.insertAdjacentHTML('beforeend', `
    <li class="user">
      <img class="user-photo" src="${results[i].picture.medium}" alt="">
      <div class="user-name">${results[i].name.first} ${results[i].name.last}</div>
      <div class="user-location">${results[i].location.city}, ${results[i].location.state}</div>
      <div class="user-email">${results[i].email}</div>
    </li>`);

        }
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);
})();