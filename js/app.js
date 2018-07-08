(function (exports) {

  'use strict';

  exports.app = new Vue({
    // the root element that will be compiled
    el: '.dgc-app',

    // app initial state
    data: {
      items: itemStorage.fetch(),
      addByValue: '',
      activeItem: null,
      editHistory: [],
      historyId: 0
    },

    // watch items change for localStorage persistence
    watch: {
      items: {
        deep: true,
        handler: itemStorage.save
      }
    },

    // computed properties
    // http://vuejs.org/guide/computed.html
    computed: {
      total: function () {
        return this.items.reduce(
          function (total, item) {
            return total + item.count;
          }, 0);
      },
      newCount: function () {
        return Number(this.activeItem.count) + Number(this.addByValue);
      },
      newCountIssue: function () {
        var count = Number(this.activeItem.count);
        var num = Number(this.addByValue);

        // check if the input number is a positive integer
        // or the group's count become negative
        if (!Number.isInteger(num)) {
          return "Input is not an integer";
        } else if (count + num < 0) {
          return "Negative count is not accepted";
        } else {
          return "";
        }
      }
    },

    // methods that implement data logic.
    // note there's no DOM manipulation here at all.
    methods: {
      resetAllCounts: function () {
        if (confirm("Reset all counts to zero? This operation can't be undone.")) {
          this.items.forEach(function (item) {
            item.count = 0;
          })
          this.editHistory.length = 0;  // clear array
          this.historyId = 0;
        }
      },
      setActive: function (item) {
        this.activeItem = item;
      },
      clearInput: function (item) {
        this.addByValue = '';
        this.activeItem = null;
      },
      commitInput: function (item) {
        var num = Number(this.addByValue);

        if (num !== 0 && this.newCountIssue === "") {
          item.count += num;

          this.editHistory.length = this.historyId;
          this.editHistory.push(
            {
              itemId: item.id,
              difference: num
            });
            this.historyId++;
        }

        this.clearInput(item);
      },
      getItemIndex: function (queryItemId) {
        return queryItemId - 1;   // item id starts from 1
      },
      undo: function () {
        if (this.historyId === 0) {
          return;
        }

        var history = this.editHistory[this.historyId - 1];
        this.items[ this.getItemIndex(history.itemId) ].count -= history.difference;
        this.historyId--;
      },
      redo: function () {
        if (this.historyId === this.editHistory.length) {
          return;
        }

        this.historyId++;
        var history = this.editHistory[this.historyId - 1];
        this.items[ this.getItemIndex(history.itemId) ].count += history.difference;
      }
    },

    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
      'focus': {
        inserted: function (el, binding) {
          if (binding.value) {
            el.focus();
          }
        }
      }
    }
  })

})(window);