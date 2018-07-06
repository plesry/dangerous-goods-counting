(function (exports) {

  'use strict';

  var STORAGE_KEY = 'dgc-app-vuejs';

  exports.itemStorage = {
    fetch: function () {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    },
    save: function (items) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  };

})(window);