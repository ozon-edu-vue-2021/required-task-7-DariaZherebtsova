import data from './data.json';

document.addEventListener("DOMContentLoaded", function(event) {
  const contactsListEl = document.querySelector('.contacts-list');
  contactsListEl.textContent = '';
  for (let i = 0; i < data.length; i++) {
    contactsListEl.insertAdjacentHTML('beforeend', `<li class="list-item" data-id="${data[i].id}">${data[i].name}</li>`);
  }

  contactsListEl.addEventListener('click', onListClick);

  let currentListItem = null;
  let containerEl = document.querySelector('#container');

  function onListClick(event) {
    if (event.target.classList.contains('list-item')) {
      currentListItem = event.target;
      currentListItem.classList.add('active');
      containerEl.classList.add('details');
      showDetails(event.target.dataset.id);
    }
  };

  let friendsMap = {};
  let popularity = {};
  let first = {id: null, popularity: 0};
  let second = {id: null, popularity: 0};
  let third = {id: null, popularity: 0};
  data.forEach(item => {
    friendsMap[item.id] = {name: item.name, friends: item.friends}
    item.friends.forEach(el => {
      popularity[el] = popularity[el] ? popularity[el] + 1 : 1;
    })
  });

  Object.keys(popularity).forEach(el => {
    if ((popularity[el] > first.popularity)
      || (popularity[el] === first.popularity
        && (friendsMap[el].name.localeCompare(friendsMap[first.id].name) < 0))) {
      third = second;
      second = first;
      first = { id: el, popularity: popularity[el]};
    } else if ((popularity[el] > second.popularity)
      || (popularity[el] === second.popularity
        && (friendsMap[el].name.localeCompare(friendsMap[second.id].name) < 0 ))) {
      third = second;
      second = { id: el, popularity: popularity[el]};
    } else if ((popularity[el] > third.popularity)
      || (popularity[el] === third.popularity
        && (friendsMap[el].name.localeCompare(friendsMap[third.id].name) < 0 ))) {
      third = { id: el, popularity: popularity[el]};
    }
  })

  document.querySelector('.details-view__back').addEventListener('click', onClickBack);

  function onClickBack() {
    currentListItem.classList.remove('active');
    containerEl.classList.remove('details');
  }

  function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function showDetails(id) {
    let arrNotFriends = [];

    while( arrNotFriends.length < 3) {
      const randomFriend = randomInteger(1, data.length);
      if (!friendsMap[id].friends.includes(randomFriend)
        && !arrNotFriends.includes(randomFriend)
        && randomFriend != id) { 
        arrNotFriends.push(randomFriend);
      }
    }

    const detailsListEl = document.querySelector('.details-view__list');
    detailsListEl.textContent = '';
    detailsListEl.insertAdjacentHTML('beforeend', '<li class="people-title">Друзья</li>');
    friendsMap[id].friends.forEach(item => {
      detailsListEl.insertAdjacentHTML('beforeend', `<li><i class="fa fa-male"></i><span>${friendsMap[item].name}</span></li>`);
    });
    detailsListEl.insertAdjacentHTML('beforeend', '<li class="people-title">Не в друзьях</li>');
    arrNotFriends.forEach(item => {
      detailsListEl.insertAdjacentHTML('beforeend', `<li><i class="fa fa-male"></i><span>${friendsMap[item].name}</span></li>`);
    });
    detailsListEl.insertAdjacentHTML('beforeend', '<li class="people-title">Популярные люди</li>');
    [first, second, third].forEach(item => {
      detailsListEl.insertAdjacentHTML('beforeend', `<li><i class="fa fa-male"></i><span>${friendsMap[item.id].name}</span></li>`);
    });
  }

});






// function prepareData(data) {
//   let friendsMap = {};
//   let popular = {};
//   data.forEach(item => {
//     friendsMap[item.id] = {name: item.name, friends: item.friends}
//     item.friends.forEach(el => {
//       popular[el] = popular[el] ? popular[el] + 1 : 1;
//     })
//   });

//   return
// }