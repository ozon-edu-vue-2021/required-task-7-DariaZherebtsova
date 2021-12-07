import data from './data.json';

document.addEventListener("DOMContentLoaded", function(event) {
  const ulEl = document.querySelector('.contacts-list');
  for (let i = 0; i < data.length; i++) {
    ulEl.insertAdjacentHTML('beforeend', `<li class="list-item" data-id="${data[i].id}">${data[i].name}</li>`);
  }

  ulEl.addEventListener('click', onListClick);

  let currentListItem = null;

  function onListClick(event) {
    if (event.target.classList.contains('list-item')) {
      currentListItem = event.target;
      currentListItem.classList.add('active');
      document.querySelector('#container').classList.add('details');
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
    document.querySelector('#container').classList.remove('details');
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

    const ulEl = document.querySelector('.details-view__list');
    ulEl.textContent = '';
    ulEl.insertAdjacentHTML('beforeend', '<li class="people-title">Друзья</li>');
    friendsMap[id].friends.forEach(item => {
      ulEl.insertAdjacentHTML('beforeend', `<li><i class="fa fa-male"></i><span>${friendsMap[item].name}</span></li>`);
    });
    ulEl.insertAdjacentHTML('beforeend', '<li class="people-title">Не в друзьях</li>');
    arrNotFriends.forEach(item => {
      ulEl.insertAdjacentHTML('beforeend', `<li><i class="fa fa-male"></i><span>${friendsMap[item].name}</span></li>`);
    });
    ulEl.insertAdjacentHTML('beforeend', '<li class="people-title">Популярные люди</li>');
    [first, second, third].forEach(item => {
      ulEl.insertAdjacentHTML('beforeend', `<li><i class="fa fa-male"></i><span>${friendsMap[item.id].name}</span></li>`);
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