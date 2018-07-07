(function (exports) {

  'use strict';

  exports.app = new Vue({
    // the root element that will be compiled
    el: '.dgc-app',

    // app initial state
    data: {
      items: itemStorage.fetch(),
      addByValue: '',
      activeItem: null
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
        if (confirm('Reset all counts to zero?')) {
          this.items.forEach(function (item) {
            item.count = 0;
          })
          console.log('All types are reset to zero.');
        }
      },
      setActive: function (item) {
        this.activeItem = item;
        console.log(item.type + ' is active.');
      },
      clearInput: function (item) {
        this.addByValue = '';
        this.activeItem = null;
      },
      commitInput: function (item) {
        var num = Number(this.addByValue);

        if (num !== 0 && this.newCountIssue === "") {
          item.count += num;
          console.log(item.type + ' increased by ' + num + ' (now ' +
            item.count + ').');
        }

        this.clearInput(item);
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