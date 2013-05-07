"use strict";

/* Directives */


angular
  .module("myApp.directives", [])
  .directive("memoryGame", function() {
    return {
      restrict: "E",
      replace: true,
      scope: {
        tileWidth: "@",
        tileHeight: "@"
      },
      template: '<div class="memory-game">' +
                  '<table>' +
                    '<tr ng-repeat="line in grid">' +
                      '<td ng-repeat="tile in line" class="container">' +
                        '<div class="card" ng-class="{flipped: tile.flipped}" ng-click="flipTile(tile)">'+
                            '<img class="front" ng-src="./img/memory-game/{{tile.title}}" width="{{tileWidth}}" height="{{tileHeight}}">' +
                            '<img class="back" ng-src="./img/memory-game/back.png" width="{{tileWidth}}" height="{{tileHeight}}">' +
                        '</div>' +
                      '</td>' +
                    '</tr>' +
                  '</table>' +
                  '<p>{{message}}</p>' +
                  '<p>Remaining: {{unmatchedPairs}}</p>' +
                  '<p>Time: {{timer}}</p>' +
                '</div>',
      controller: function($scope, $element, $attrs, $timeout) {
        if ($attrs.tilesSrc.replace(/[\[\]\s]/g, "").split(",").length * 2 == $attrs.lines * $attrs.columns) {
          var tileNames = $attrs.tilesSrc.replace(/[\[\]\s]/g, "").split(",");
          var deck = makeDeck(tileNames);
          $scope.grid = makeGrid(deck);
          $scope.firstPick = $scope.secondPick = undefined;
          $scope.message = "Start!";
          $scope.timer = 0;
          $scope.unmatchedPairs = tileNames.length;
        } else {
          $scope.message = "Error!";
        }

        $scope.onTimeout = function(){
            $scope.timer++;
            timer = $timeout($scope.onTimeout, 1000);
        }

        var timer = $timeout($scope.onTimeout, 1000);

        $scope.stop = function(){
            $timeout.cancel(timer);
        }

        function Tile(title) {
          this.title = title;
          this.flipped = false;
        }

        Tile.prototype.flip = function() {
          this.flipped = !this.flipped;
        }

        $scope.flipTile = function(tile) {
          if (tile.flipped) {
            return;
          }
          tile.flip();
          if (!$scope.firstPick || $scope.secondPick) {
            $scope.firstPick = tile;
            console.log("firstPick");
          } else {
            console.log("secondPick");
            if ($scope.firstPick.title === tile.title) {
              $scope.unmatchedPairs--;
              if ($scope.unmatchedPairs > 0) {
                $scope.message = "Matched";
              } else {
                $scope.stop();
                $scope.message = "Complete!";
                $scope.$emit('memoryGameCompleteEvent', {timer: $scope.timer, remaining: $scope.remaining});
              }
              $scope.firstPick = $scope.secondPick = undefined;
            } else {
              $scope.secondPick = tile;
              $scope.message = "Mismatched";
              var tmpFirstPick = $scope.firstPick;
              var tmpSecondPick = $scope.secondPick;
              $scope.firstPick = $scope.secondPick = undefined;
              $timeout(function() {
                tmpFirstPick.flip();
                tmpSecondPick.flip();
              }, 1000)
            }
          }
        }

        function makeDeck(tileNames) {
          var tileDeck = [];
          tileNames.forEach(function(name) {
            tileDeck.push(new Tile(name));
            tileDeck.push(new Tile(name));
          });
          return tileDeck;
        }

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

        function removeRandomTile(tileDeck) {
          var i = Math.floor(Math.random()*tileDeck.length);
          return tileDeck.splice(i, 1)[0];
        }
      }
    }
  });
