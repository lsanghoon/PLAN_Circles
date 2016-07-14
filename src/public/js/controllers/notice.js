myApp.controller('noticeCtrl',function ($scope, $http) {
  $scope.noticeLists = [],
  $scope.calendarLists = [],
  $scope.currentPage = 1,
  $scope.calendarPage = 1,
  $scope.numPerPage = 10,
  $scope.maxSize = 5,
  $scope.notice = [],
  $scope.calendar = [];
  
  
  
  pagination($scope.notice, 'notice');
  pagination($scope.calendar, 'calendar');
  
  function pagination (e, cate) {
  
    $scope.makeLists = function() {
      if (cate == 'notice') {
        for (i=1;i<=90;i++) {
          e.push({ text:'공지제목 '+i, cate:'[공지]', writer:'관리자', date:'2016-07-07', done:false});
        }
      } else if (cate == 'calendar') {
        for (i=1;i<=66;i++) {
          e.push({ text:'일정제목 '+i, cate:'[일정]', writer:'관리자', date:'2016-07-07', done:false});
        }
      }
    };
    $scope.makeLists(); 

    if (cate == 'notice') {
      $scope.$watch('currentPage + numPerPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        , end = begin + $scope.numPerPage;

          $scope.noticeLists = e.slice(begin, end);
      });
      
    } else if (cate == 'calendar') {
      $scope.$watch('calendarPage + numPerPage', function() {
        var begin = (($scope.calendarPage - 1) * $scope.numPerPage)
        , end = begin + $scope.numPerPage;

        $scope.calendarLists = e.slice(begin, end);
      });
      
    }
    
  } // end of pagination function
  
});
