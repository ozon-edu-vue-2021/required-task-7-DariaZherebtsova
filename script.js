import data from './data.json';

document.addEventListener("DOMContentLoaded", function(event) {
  const ulEl = document.querySelector('.contacts-list');
  console.log('--ul', ulEl);
  for (let i = 0; i < 10; i++) {
    ulEl.insertAdjacentHTML('beforeend', `<li class="list-item" data-id="${data[i].id}">${data[i].name}</li>`);
  }

  ulEl.addEventListener('click', onClick);

  function onClick(event) {
    console.log('--onClick', event.currentTarget);
    if (event.target.classList.contains('list-item')) {
      event.target.classList.add('active');
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



  console.log('--friendsMap', friendsMap);
  console.log('--popularity', popularity);
  console.log('--first', first.id);
  console.log('--second', second.id);
  console.log('--third', third.id);

  function showDetails(id) {
    console.log('--showDetails', id);
    const ulEl = document.querySelector('.details-view__list');
    ulEl.textContent = '';
    ulEl.insertAdjacentHTML('beforeend', '<li class="people-title">Друзья</li>');
    friendsMap[id].friends.forEach(item => {
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