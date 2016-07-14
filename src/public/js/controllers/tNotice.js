myApp.controller('tNoticeCtrl',function ($scope, $http) {
  $scope.communityLists = [],
  $scope.communityPage = 1,
  $scope.numPerPage = 10,
  $scope.maxSize = 5;
  
  $scope.makeLists = function() {
    $scope.community = [];
    for (var i=1;i<=66;i++) {
      $scope.community.push({no:i, text:'게시글제목 '+i, writer:'사용자', date:'2016-07-07', done:false});
    }
  };
  $scope.makeLists(); 

  $scope.$watch('communityPage + numPerPage', function() {
    var begin = (($scope.communityPage - 1) * $scope.numPerPage)
    , end = begin + $scope.numPerPage;

    $scope.communityLists = $scope.community.slice(begin, end);
  });
});
