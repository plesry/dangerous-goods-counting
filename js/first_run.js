/*global app */

(function (app) {

  'use strict';

  // Initialize app's items in the first run
  var first_run_items = [{
      id: 1,
      type: '刀剪',
      count: 0
    },
    {
      id: 2,
      type: '腳架',
      count: 0
    },
    {
      id: 3,
      type: '棍棒',
      count: 0
    },
    {
      id: 4,
      type: '工具',
      count: 0
    },
    {
      id: 5,
      type: '打火機',
      count: 0
    },
    {
      id: 6,
      type: '鉛酸電池',
      count: 0
    },
    {
      id: 7,
      type: '槍刀玩具',
      count: 0
    },
    {
      id: 8,
      type: '噴罐',
      count: 0
    },
    {
      id: 9,
      type: '防狼噴霧',
      count: 0
    },
    {
      id: 10,
      type: '煙火',
      count: 0
    },
    {
      id: 11,
      type: '易燃液體',
      count: 0
    },
    {
      id: 12,
      type: '腐蝕液體',
      count: 0
    }
  ];

  if (app.items.length === 0) {
    app.items = first_run_items;
    console.log('First run. Initialize items.');
  }

})(app);