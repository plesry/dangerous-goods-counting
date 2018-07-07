# Dangerous Goods Counting

This demo web app helps me count up all dangerous/hazardous goods found in the security control in Taiwan Taoyuan International Airport.
It is based on [Vue.js](https://vuejs.org/) and [Bootstrap](https://getbootstrap.com/).

## How to run
This web app is out-of-the-box and has no any prerequisites.

Make sure your web browser accepts 3rd-party data/cookies.

**[Run the web app](https://plesry.github.io/dangerous-goods-counting/)**

## Features
* A table that shows all counts of 12 pre-defined groups
  * The sum of all counts is calculated automatically
* **Click-and-edit** a group. An input area will show and you can add a value to its count. Beware:
  * Input should be a valid integer
  * New count (count + input) should be non-negative
* A button to **reset all counts**
  * No more data-loss accident! A window will pop-up and ask you to confirm
* All counts are saved into HTML5 local storage
  * Results are kept intact even if you refresh or exit the page
* UI: now use Bootstrap

## Planning TODOs

* Undo/Redo operations
* Tabs to switch between different profiles (Terminals 1 and 2)
* Load/Save counts from/to file

## Background

During my one-year substitute military service, I take responsibility for counting up all confiscated goods from the airport for archive purpose. These goods are recognized as dangerous or hazardous items and confiscated by security inspectors in the Aviation Police Bureau. In practice, they can be roughly categorized into 12 groups:

* Scissors and Knifes (刀剪)
* Tripods (腳架)
* Sticks and Rods (棍棒)
* Tools (工具)
* Lighters (打火機)
* Lead-Acid and Lithinium Batteries (鉛酸/鋰電池)
* Toy Guns or Swords (槍刀玩具)
* Sprays (噴罐)
* Pepper Sprays (防狼噴霧)
* Fireworks (煙火)
* Inflammable Liquids (易燃液體)
* Corrosive Liquids (腐蝕液體)

I work with some of my colleagues and record all counts of these 12 groups from them. With the aid of this app, it is much easier to gather results and calculate the total in a round.

## Credit

This app was inspired by the [TodoMVC example](https://vuejs.org/v2/examples/todomvc.html) in Vue.js Examples. See [the repository in GitHub](https://github.com/tastejs/todomvc/tree/gh-pages/examples/vue) for more information.