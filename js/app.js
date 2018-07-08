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
      currentHistoryId: 0
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
          this.currentHistoryId = 0;
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

          this.editHistory.length = this.currentHistoryId;
          this.editHistory.push(
            { id: item.id, difference: num });
            this.currentHistoryId++;
        }

        this.clearInput(item);
      },
      undo: function () {
        if (this.currentHistoryId === 0) {
          return;
        }

        var history = this.editHistory[this.currentHistoryId - 1];
        var item = this.items[history.id - 1];
        item.count -= history.difference;
        this.currentHistoryId--;
      },
      redo: function () {
        if (this.currentHistoryId === this.editHistory.length) {
          return;
        }

        this.currentHistoryId++;
        var history = this.editHistory[this.currentHistoryId - 1];
        var item = this.items[history.id - 1];
        item.count += history.difference;
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