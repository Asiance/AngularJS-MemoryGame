(function() {
  "use strict";

  /* jasmine specs for directives go here */

  describe("memory-game logic", function() {
    var ctrl, scope, attrs;
    beforeEach(module("memory-game"));
    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      attrs = {
        "columns": 2,
        "lines": 3,
        "tilesDir": "./img/",
        "tilesSrc": "[sci_fi-48.png, sheep-48.png, fork-48.png]",
        "tileWidth": "48",
        "tileHeight": "48"
      };
      ctrl = $controller('MemoryGameCtrl', {
        $scope: scope,
        $attrs: attrs
      });
    }));

    it("should create a grid with the correct dimensions", function() {
      expect(scope.grid.length).toBe(attrs.lines);
      for (var i = 0 ; i < attrs.lines ; i++) {
        expect(scope.grid[i].length).toBe(attrs.columns);
      }
    });

    it('should be initialized with no flipped tile', function() {
      var nbFlippedTile = 0;
      for (var i = 0 ; i < scope.grid.length ; i++) {
        for (var j = 0 ; j < scope.grid[i].length ; j++) {
          if (scope.grid[i][j].flipped) {
            nbFlippedTile++;
          }
        }
      }
      expect(nbFlippedTile).toBe(0);
    });

    it('should flip a tile', function() {
      expect(scope.grid[0][0].flipped).toBe(false);
      scope.flipTile(scope.grid[0][0]);
      expect(scope.grid[0][0].flipped).toBe(true);
    });

    it('should not flip twice the same tile', function() {
      expect(scope.grid[0][0].flipped).toBe(false);
      scope.flipTile(scope.grid[0][0]);
      scope.flipTile(scope.grid[0][0]);
      expect(scope.grid[0][0].flipped).toBe(true);
    });

    it('should flip only one tile', function() {
      scope.flipTile(scope.grid[0][0]);
      var nbFlippedTile = 0;
      for (var i = 0 ; i < scope.grid.length ; i++) {
        for (var j = 0 ; j < scope.grid[i].length ; j++) {
          if (scope.grid[i][j].flipped) nbFlippedTile++;
        }
      }
      expect(nbFlippedTile).toBe(1);
    });

    it('should be finishable (or a pair exists for every tile)', function() {
      while(scope.unmatchedPairs > 0) {
        findPair(pickOne());
      }
      expect(scope.unmatchedPairs).toBe(0);

      function pickOne() {
        var i = 0;
        while (i < scope.grid.length) {
          var j = 0;
          while (j < scope.grid[i].length) {
            if (!scope.grid[i][j].flipped) {
              scope.flipTile(scope.grid[i][j]);
              return scope.grid[i][j];
            }
            j++;
          }
          i++;
        }
      }

      function findPair(tile) {
        var i = 0;
        while (i < scope.grid.length) {
          var j = 0;
          while (j < scope.grid[i].length) {
            if (tile.title === scope.grid[i][j].title && !scope.grid[i][j].flipped) {
              scope.flipTile(scope.grid[i][j]);
              return scope.grid[i][j];
            }
            j++;
          }
          i++;
        }
      }
    });

  });

}());
