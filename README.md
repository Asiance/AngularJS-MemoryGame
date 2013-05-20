AngularJS-MemoryGame
====================

Directive to build a memory game based on AngularJS, flip animation in CSS3

[Example](http://asiance.github.io/AngularJS-MemoryGame/example/example.html)

![Preview AngularJS-MemoryGame](https://github.com/Asiance/AngularJS-MemoryGame/raw/master/preview.png)

Usage
------------

1. Download the [MemoryGame module](https://raw.github.com/Asiance/AngularJS-MemoryGame/master/src/angular-memory-game.js) and the [CSS rules](https://raw.github.com/Asiance/AngularJS-MemoryGame/master/src/angular-memory-game.css).

2. Register the module `memory-game`:
```javascript
angular.module('myApp', ['memory-game']);
```
3. Declare the array of images filenames for the tiles:
```javascript
$scope.tilesSrc = ['sci_fi-48.png', 'sheep-48.png', 'fork-48.png'];
```
4. Invoke the directive from HTML:
```html
<!doctype html>
<html ng-app>
  <head>
    <link rel="stylesheet" href="angular-memory-game.css">
    <script src="angular.js"></script>
    <script src="controller.js"></script>
    <script src="angular-memory-game.js"></script>
  </head>
  <body>
    <memory-game
      columns="3"
      lines="2"
      tiles-dir="./img/"
      tiles-src="tilesSrc"
      tile-width="48"
      tile-height="48">
    </memory-game>
  </body>
</html>
```

4. Catch game events:
```javascript
$scope.$on("memoryGameUnmatchedPairEvent", function() {
  $scope.message = "Try again!";
});
$scope.$on("memoryGameMatchedPairEvent", function() {
  $scope.message = "Good match!";
});
$scope.$on("memoryGameCompletedEvent", function() {
  $scope.message = "Success!";
});
```
5. Trigger restart event (with possibility to load new tiles):
```javascript
var newParams = {
  "tilesSrc": ['fork-48.png', 'fork-48.png', 'fork-48.png']
};
$scope.$broadcast("memoryGameRestartEvent", newParams);
```

### Parameters ###
- **columms** *integer*
- **lines** *integer*
- **tiles-dir** *directory where tiles images are located (example: `img/`)*
- **tiles-src** *array of images filenames*
- **tile-width** *integer*
- **tile-height** *integer*

### Input ###
- `memoryGameRestartEvent` when player wants to start a new game.

### Output ###
- `memoryGameUnmatchedPairEvent` when player picks **unmatched** pair.
- `memoryGameMatchedPairEvent` when player picks **matched** pair.
- `memoryGameCompletedEvent` when game is **completed**.

Tests
-----
### Requirements ###

- [node.js](http://nodejs.org/)
- [Karma](http://karma-runner.github.io/0.8/index.html)

To execute tests, use `test.sh` in `test/scripts/`.

Credits
--------------------

  - Product Owner: [Laurent Le Graverend](https://github.com/laurent-le-graverend)
  - Developer: [Gilles Piou](https://github.com/pioug)
  - [icons8](http://icons8.com/)

Licence (MIT)
--------------------
Copyright 2013 Asiance Korea ltd.  
http://www.asiance.com/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

