(function() {

  "use strict";
  var module = angular.module("angular-memory-game-example", ["memory-game"]);

}());

function ExampleController($scope) {

  $scope.tilesSrc = ['sci_fi-48.png', 'sheep-48.png', 'fork-48.png'];

  // Listeners for events triggered by angular-memory-game
  $scope.$on("memoryGameUnmatchedPairEvent", function() {
    $scope.message = "Try again!";
  });
  $scope.$on("memoryGameMatchedPairEvent", function() {
    $scope.message = "Good match!";
  });
  $scope.$on("memoryGameCompletedEvent", function() {
    $scope.message = "Success!";
  });

  $scope.restartBtn = function() {
    var newParams = {
      "tilesSrc": ['fork-48.png', 'fork-48.png', 'fork-48.png']
    };
    $scope.message = "Restart! (and fork us on GitHub)";
    $scope.$broadcast("memoryGameRestartEvent", newParams);
  };

}
