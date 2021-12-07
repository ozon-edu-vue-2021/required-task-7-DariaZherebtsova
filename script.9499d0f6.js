// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"boCh":[function(require,module,exports) {
module.exports = [{
  "id": 1,
  "name": "Петя",
  "friends": [10, 2, 6]
}, {
  "id": 2,
  "name": "Вася",
  "friends": [5, 1, 3]
}, {
  "id": 3,
  "name": "Оля",
  "friends": [9, 4, 3]
}, {
  "id": 4,
  "name": "Максим",
  "friends": [11, 12, 2]
}, {
  "id": 5,
  "name": "Елена",
  "friends": [7, 8, 4]
}, {
  "id": 6,
  "name": "Иван",
  "friends": [6, 1, 12]
}, {
  "id": 7,
  "name": "Никита",
  "friends": [1, 8, 5]
}, {
  "id": 8,
  "name": "Марат",
  "friends": [11, 12, 10]
}, {
  "id": 9,
  "name": "Анатолий",
  "friends": [1, 2, 3]
}, {
  "id": 10,
  "name": "Наташа",
  "friends": [8, 4, 2]
}, {
  "id": 11,
  "name": "Марина",
  "friends": [1, 5, 8]
}, {
  "id": 12,
  "name": "Кирилл",
  "friends": [5, 2, 12]
}];
},{}],"mpVp":[function(require,module,exports) {
"use strict";

var _data = _interopRequireDefault(require("./data.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function (event) {
  var contactsListEl = document.querySelector('.contacts-list');
  contactsListEl.textContent = '';

  for (var i = 0; i < _data.default.length; i++) {
    contactsListEl.insertAdjacentHTML('beforeend', "<li class=\"list-item\" data-id=\"".concat(_data.default[i].id, "\">").concat(_data.default[i].name, "</li>"));
  }

  contactsListEl.addEventListener('click', onListClick);
  var currentListItem = null;
  var containerEl = document.querySelector('#container');

  function onListClick(event) {
    if (event.target.classList.contains('list-item')) {
      currentListItem = event.target;
      currentListItem.classList.add('active');
      containerEl.classList.add('details');
      showDetails(event.target.dataset.id);
    }
  }

  ;
  var friendsMap = {};
  var popularity = {};
  var first = {
    id: null,
    popularity: 0
  };
  var second = {
    id: null,
    popularity: 0
  };
  var third = {
    id: null,
    popularity: 0
  };

  _data.default.forEach(function (item) {
    friendsMap[item.id] = {
      name: item.name,
      friends: item.friends
    };
    item.friends.forEach(function (el) {
      popularity[el] = popularity[el] ? popularity[el] + 1 : 1;
    });
  });

  Object.keys(popularity).forEach(function (el) {
    if (popularity[el] > first.popularity || popularity[el] === first.popularity && friendsMap[el].name.localeCompare(friendsMap[first.id].name) < 0) {
      third = second;
      second = first;
      first = {
        id: el,
        popularity: popularity[el]
      };
    } else if (popularity[el] > second.popularity || popularity[el] === second.popularity && friendsMap[el].name.localeCompare(friendsMap[second.id].name) < 0) {
      third = second;
      second = {
        id: el,
        popularity: popularity[el]
      };
    } else if (popularity[el] > third.popularity || popularity[el] === third.popularity && friendsMap[el].name.localeCompare(friendsMap[third.id].name) < 0) {
      third = {
        id: el,
        popularity: popularity[el]
      };
    }
  });
  document.querySelector('.details-view__back').addEventListener('click', onClickBack);

  function onClickBack() {
    currentListItem.classList.remove('active');
    containerEl.classList.remove('details');
  }

  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function showDetails(id) {
    var arrNotFriends = [];

    while (arrNotFriends.length < 3) {
      var randomFriend = randomInteger(1, _data.default.length);

      if (!friendsMap[id].friends.includes(randomFriend) && !arrNotFriends.includes(randomFriend) && randomFriend != id) {
        arrNotFriends.push(randomFriend);
      }
    }

    var detailsListEl = document.querySelector('.details-view__list');
    detailsListEl.textContent = '';
    detailsListEl.insertAdjacentHTML('beforeend', '<li class="people-title">Друзья</li>');
    friendsMap[id].friends.forEach(function (item) {
      detailsListEl.insertAdjacentHTML('beforeend', "<li><i class=\"fa fa-male\"></i><span>".concat(friendsMap[item].name, "</span></li>"));
    });
    detailsListEl.insertAdjacentHTML('beforeend', '<li class="people-title">Не в друзьях</li>');
    arrNotFriends.forEach(function (item) {
      detailsListEl.insertAdjacentHTML('beforeend', "<li><i class=\"fa fa-male\"></i><span>".concat(friendsMap[item].name, "</span></li>"));
    });
    detailsListEl.insertAdjacentHTML('beforeend', '<li class="people-title">Популярные люди</li>');
    [first, second, third].forEach(function (item) {
      detailsListEl.insertAdjacentHTML('beforeend', "<li><i class=\"fa fa-male\"></i><span>".concat(friendsMap[item.id].name, "</span></li>"));
    });
  }
});
},{"./data.json":"boCh"}]},{},["mpVp"], null)
//# sourceMappingURL=script.9499d0f6.js.map