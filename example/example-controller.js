(function() {

  "use strict";
  var module = angular.module("angular-memory-game-example", ["memory-game"]);

}());

function ExampleController($scope) {

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

}
