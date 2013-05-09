(function () {

  "use strict";
  angular
  .module("memory-game", [])
  .controller('MemoryGameCtrl', ['$scope', '$attrs', '$timeout', function($scope, $attrs, $timeout) {
    // Check coherence between numbers of lines*columns, and numers of provided images
    if ($attrs.tilesSrc.replace(/[\[\]\s]/g, "").split(",").length * 2 === $attrs.lines * $attrs.columns) {
      var tileNames = $attrs.tilesSrc.replace(/[\[\]\s]/g, "").split(",");
      var deck = makeDeck(tileNames);
      $scope.grid = makeGrid(deck);
      $scope.firstPick = $scope.secondPick = undefined;
      $scope.unmatchedPairs = tileNames.length;
    } else {
      console.log("ERROR in memoryGame directive: Bad parameters (check number of lines and row and number image files)");
    }

    /**
     * Define Tile object
     * @param {string} title Filename of the picture associated to the tile
     */
    function Tile(title) {
      this.title = title;
      this.flipped = false;
    }

    /**
     * Method flip for Tile
     */
    Tile.prototype.flip = function() {
      this.flipped = !this.flipped;
    };

    /**
     * Function called when player click on a Tile
     * @param {Tile} tile Tile picked by the player
     */
    $scope.flipTile = function(tile) {
      if (tile.flipped) {
        return;
      }
      tile.flip();
      if (!$scope.firstPick) {
        $scope.firstPick = tile;
      } else {
        if ($scope.firstPick.title === tile.title) {
          $scope.unmatchedPairs--;
          $scope.$emit("memoryGameMatchedPairEvent");
          if ($scope.unmatchedPairs == 0) {
            $scope.$emit("memoryGameCompletedEvent");
          }
        } else {
          $scope.secondPick = tile;
          $scope.$emit("memoryGameUnmatchedPairEvent");
          var tmpFirstPick = $scope.firstPick;
          var tmpSecondPick = $scope.secondPick;
          $timeout(function() {
            tmpFirstPick.flip();
            tmpSecondPick.flip();
          }, 1000);
        }
        $scope.firstPick = $scope.secondPick = undefined;
      }
    };

    /**
     * Create set of tiles
     * @param {array} tileNames Array of filenames
     * @return {array} tileDeck Array of Tiles
     */
    function makeDeck(tileNames) {
      var tileDeck = [];
      tileNames.forEach(function(name) {
        tileDeck.push(new Tile(name));
        tileDeck.push(new Tile(name));
      });
      return tileDeck;
    }

    /**
     * Arrange a set of Tiles on a two-dimensionnal grid
     * @param {array} tileDeck Array of Tiles
     * @return {array} grid Two-dimensional array of Tiles
     */
    function makeGrid(tileDeck) {
      var grid = [];
      for (var row = 0; row < $attrs.lines; row++) {
        grid[row] = [];
        for (var col = 0; col < $attrs.columns; col++) {
            grid[row][col] = removeRandomTile(tileDeck);
        }
      }
      return grid;
    }

    /**
     * Pick a random Tile from a deck to put it on a grid
     * @param {array} tileDeck Array of Tiles
     * @return {tile} Randomly picked Tile
     */
    function removeRandomTile(tileDeck) {
      var i = Math.floor(Math.random()*tileDeck.length);
      return tileDeck.splice(i, 1)[0];
    }
  }])
  .directive("memoryGame", function () {
    return {
      restrict: "E",
      replace: true,
      scope: {
        tilesDir: "@",
        tileHeight: "@",
        tileWidth: "@"
      },
      template: '<table class="memory-game">' +
                    '<tr ng-repeat="line in grid">' +
                      '<td ng-repeat="tile in line" class="container">' +
                        '<div class="card" ng-class="{flipped: tile.flipped}" ng-click="flipTile(tile)">'+
                            '<img class="front" ng-src="{{tilesDir}}{{tile.title}}" width="{{tileWidth}}" height="{{tileHeight}}">' +
                            '<img class="back" ng-src="{{tilesDir}}back.png" width="{{tileWidth}}" height="{{tileHeight}}">' +
                        '</div>' +
                      '</td>' +
                    '</tr>' +
                  '</table>',
      controller: 'MemoryGameCtrl'
    };
  });

}());
