myApp.controller('loginCtrl', function ($http, $scope, $location) {
  
  var check = Cookies.get('islogin');
  if (check) {
    $location.path('/main');
  }
  
  $scope.loginText = '로그인';
  $scope.loginFailStatus = '';
  $scope.formData = [];
 
  var isSaved = Cookies.get('save');
  $scope.save = false;
  
  if (isSaved != undefined) {
    $scope.save = true;
    $scope.email = isSaved;
  }
  
  $(document).on("click", "#danger-btn", function() {
    $('#loginFail').css('display','none');
  });
  
  $scope.submit = function() {
    $scope.formData.push(this.email);
    $scope.formData.push(this.password);
    $scope.loginText = '로그인중';
    $('#loginEmail').val('');
    $('#loginPwd').val('');
    
    $http({
      method: 'POST', //방식
      url: '/login', /* 통신할 URL */
      data: $scope.formData, /* 파라메터로 보낼 데이터 */
      headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
    })
    .success(function(data, status, headers, config) {
      if(data.success) {
        $scope.loginText = '로그인';
        
        if ($scope.save) {
          Cookies.set('save', data.email, { expires: 7 });
        } else {
          Cookies.remove('save');
        }
        
        Cookies.set('islogin', data.name);
        $('#loginBtn').css('display','none');
        
        div.append(
          '<li class="dropdown">' +
            '<a href="" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' +
              data.name +
              '<span class="caret"></span>' +
            '</a>' +
            '<ul class="dropdown-menu">' +
              '<li><a class="menuBtn" ui-sref="main">내 정보</a></li>' +
              '<li><a class="menuBtn" id="logout">로그아웃</a></li>' +
            '</ul>' +
          '</li>'
        );
        
        $location.path('/main');
        
      } else {
        /* 통신한 URL에서 데이터가 넘어오지 않았을 때 처리 */
        $scope.loginText = '로그인';
        $('#loginFail').css('display','');
        $scope.loginFailText = '존재하지 않는 아이디 거나 혹은 패스워드가 틀렸습니다.'
        $scope.formData = [];
      }
    })
    .error(function(data, status, headers, config) {
      /* 서버와의 연결이 정상적이지 않을 때 처리 */
      $scope.loginText = '로그인';
      $('#loginFail').css('display','');
      $scope.loginFailStatus = status;
      $scope.loginFailText = '관리자에게 문의해주세요.';
    });
    
  }
});