myApp.controller('homeCtrl', function ($location, $scope) {
  $scope.scrollTo = function (hash) {
    $location.hash(hash);
  };
});