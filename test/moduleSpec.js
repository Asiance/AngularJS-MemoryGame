(function() {
  "use strict";

  describe("memory-game Controller", function() {
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
          if (scope.grid[i][j].flipped) {
            nbFlippedTile++;
          }
        }
      }
      expect(nbFlippedTile).toBe(1);
    });

    it('should be finishable (or a pair exists for every tile)', function() {
      var completedEvent = 0;
      scope.$on('memoryGameCompletedEvent', function() {
        completedEvent++;
      });
      while(scope.unmatchedPairs > 0) {
        findPair(pickOne());
      }
      expect(scope.unmatchedPairs).toBe(0);
      expect(completedEvent).toBe(1);

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

  describe("memory-game Template", function() {
    var element, scope, attrs, timeout;
    beforeEach(module("memory-game"));
    beforeEach(inject(function($rootScope, $compile, $timeout) {
      element = angular.element('<memory-game columns="2" lines="3" tiles-dir="./img/" tiles-src="[sci_fi-48.png, sheep-48.png, fork-48.png]" tile-width="48" tile-height="48"></memory-game>');
      scope = $rootScope;
      timeout = $timeout;
      $compile(element)(scope);
      scope.$digest();
    }));

    it("should have the correct amount of lines", function() {
      expect(element.find("tr").length).toBe(3);
    });

    it("should have the correct amount of cells/tiles", function() {
      expect(element.find("td").length).toBe(6);
    });

    it("should have the correct amount of images", function() {
      expect(element.find(".card").length).toBe(6);
      expect(element.find("img").length).toBe(12);
    });

    it("should create a tile with the correct size", function() {
      expect(element.find("img").attr("height")).toBe("48");
      expect(element.find("img").attr("width")).toBe("48");
    });

    it("should flip on click", function() {
      var tile = element.find(".card").eq(0);
      tile.click();
      expect(tile.hasClass("flipped")).toBe(true);
    });

    it("should hide tiles when unmatch", function() {
      var unmatchPairEvent = 0;
      scope.$on('memoryGameUnmatchedPairEvent', function() {
        unmatchPairEvent++;
      });
      var tile1 = element.find('img[src="./img/sci_fi-48.png"]').eq(0).parent();
      var tile2 = element.find('img[src="./img/sheep-48.png"]').eq(0).parent();
      tile1.click();
      tile2.click();
      expect(tile1.hasClass("flipped")).toBe(true);
      expect(tile1.hasClass("flipped")).toBe(true);
      timeout.flush();
      expect(tile1.hasClass("flipped")).toBe(false);
      expect(tile2.hasClass("flipped")).toBe(false);
      expect(unmatchPairEvent).toBe(1);
    });

    it("should be finishable", function() {
      var completedEvent = 0;
      scope.$on('memoryGameCompletedEvent', function() {
        completedEvent++;
      });
      var matchedPairEvent = 0;
      scope.$on('memoryGameMatchedPairEvent', function() {
        matchedPairEvent++;
      });

      var tilesPair = element.find('img[src="./img/sci_fi-48.png"]');
      expect(tilesPair.length).toBe(2);
      var tile1 = tilesPair.eq(0).parent();
      var tile2 = tilesPair.eq(1).parent();

      tilesPair = element.find('img[src="./img/sheep-48.png"]');
      expect(tilesPair.length).toBe(2);
      var tile3 = tilesPair.eq(0).parent();
      var tile4 = tilesPair.eq(1).parent();

      tilesPair = element.find('img[src="./img/fork-48.png"]');
      expect(tilesPair.length).toBe(2);
      var tile5 = tilesPair.eq(0).parent();
      var tile6 = tilesPair.eq(1).parent();

      tile1.click();
      tile2.click();
      tile3.click();
      tile4.click();
      tile5.click();
      tile6.click();
      expect(tile1.hasClass("flipped")).toBe(true);
      expect(tile2.hasClass("flipped")).toBe(true);
      expect(tile3.hasClass("flipped")).toBe(true);
      expect(tile4.hasClass("flipped")).toBe(true);
      expect(tile5.hasClass("flipped")).toBe(true);
      expect(tile6.hasClass("flipped")).toBe(true);
      expect(completedEvent).toBe(1);
      expect(matchedPairEvent).toBe(3);
    });

  });

}());
