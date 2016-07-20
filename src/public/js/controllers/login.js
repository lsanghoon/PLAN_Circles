myApp.controller('loginCtrl', function ($http, $scope) {
  $scope.loginText = '로그인';
  $scope.loginFailStatus = '';
  $scope.formData = [];
  $scope.save = false;
  
  $(document).on("click", "#danger-btn", function() {
    $('#loginFail').css('display','none');
  });
  
  $scope.submit = function() {
    $scope.formData.push(this.email);
    $scope.formData.push(this.password);
    console.log($scope.save);
    console.log($scope.formData);
    $scope.loginText = '로그인중';
    
    $http({
      method: 'POST', //방식
      url: '/login', /* 통신할 URL */
      data: $scope.formData, /* 파라메터로 보낼 데이터 */
      headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
    })
    .success(function(data, status, headers, config) {
      if(data) {
        console.log("성공");
        /* 이메일 저장체크면 쿠키에 체크박스 트루값과 이메일 저장*/
        /* 성공적으로 결과 데이터가 넘어 왔을 때 처리 */
      }
      else {
        console.log("실패");
        /* 통신한 URL에서 데이터가 넘어오지 않았을 때 처리 */
        $('#loginFail').css('display','');
        $scope.loginFailText = '존재하지 않는 아이디 거나 혹은 패스워드가 틀렸습니다.'
      }
    })
    .error(function(data, status, headers, config) {
      /* 서버와의 연결이 정상적이지 않을 때 처리 */
      console.log(status);
      $('#loginFail').css('display','');
      $scope.loginFailStatus = status;
      $scope.loginFailText = '관리자에게 문의해주세요.';
    });
    
  }
});