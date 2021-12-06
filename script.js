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
  let popular = {};
  let first = null;
  let second = null;
  let th
  data.forEach(item => {
    friendsMap[item.id] = {name: item.name, friends: item.friends}
    item.friends.forEach(el => {
      popular[el] = popular[el] ? popular[el] + 1 : 1;

    })
  });

  console.log('--friendsMap', friendsMap);
  console.log('--popular', popular);

  function showDetails(id) {
    console.log('--showDetails', id);
    const ulEl = document.querySelector('.details-view__list');
    ulEl.textContent = '';
    ulEl.insertAdjacentHTML('beforeend', '<li class="people-title">Друзья</li>');
    friendsMap[id].friends.forEach(item => {
      ulEl.insertAdjacentHTML('beforeend', `<li><i class="fa fa-male"></i><span>${friendsMap[item].name}</span></li>`);
    }) 
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