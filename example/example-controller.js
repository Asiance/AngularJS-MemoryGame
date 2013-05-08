
(function() {
  var module = angular.module("angularjs-memory-game-example", ["memory-game"]);
}());

function ExampleController($scope) {
  $scope.$on("memoryGameUnmatchedPairEvent", function() {
    $scope.message = "Try again!";
  });
  $scope.$on("memoryGameMatchedPairEvent", function() {
    $scope.message = "Good matched!";
  });
  $scope.$on("memoryGameCompletedEvent", function() {
    $scope.message = "Success!";
  });
}