myApp.controller('signUpCtrl', function ($location, $scope, $http) {
  
  $scope.user = {
    email: "",  // 이메일
    password: "", // 패스워드
    name: "", // 이름
    birth: "",  // 생년월일
    gender: "male", // 성별
    cphone: "", // 핸드폰번호
    hphone: "", // 집 전화번호
    addr: "", // 주소
    img: "",  // 이미지
    job: "대학생",  // 직업
    school: "", // 학교명
    stu_no: "", // 학번
    dept: "", // 학과
    gradu: "" //졸업여부
  };
  
  $scope.jobs = [
    "대학생",
    "고등학생",
    "직장인"
  ];
  
  $scope.getSelected = function() {
    if ($scope.user.job == "대학생") {
      console.log("대학생");
      $('#school').css('display', '');
      $('#stu_no').css('display', '');
      $('#dept').css('display', '');
      $('#gradu').css('display', '');
      return "대학생";
    } else if ($scope.user.job == "고등학생") {
      console.log("고등학생");
      $('#school').css('display', '');
      $('#stu_no').css('display', 'none');
      $('#dept').css('display', 'none');
      $('#gradu').css('display', '');
      return "고등학생";
    } else {
      console.log("직장인");
      $('#school').css('display', 'none');
      $('#stu_no').css('display', 'none');
      $('#dept').css('display', 'none');
      $('#gradu').css('display', 'none');
      return "직장인";
    }
  } // getSelected
  
  $scope.signUpSubmit = function() {
    console.log($scope.user.birth);
    console.log($scope.user.gradu);
    console.log($scope.user.job);
    if ($('#pw1').val() != $('#pw2').val()) {
      console.log('비밀번호 틀림');
      
    } else if ($scope.user.birth == '') {
      // 생년월일 선택하지 않음
      console.log("생년월인 선택안함");
      
    } else if (($scope.user.job != "직장인") && ($scope.user.gradu == '')) {
      console.log("졸업여부 선택안함");
      
    } else if ($scope.user.job == '대학생') {
      // if 문으로 검사 4개 항목 
      
    } else if ($scope.user.job == '고등학생') {
      // if 문으로 검사 2개 항목
      
    } else {
      $scope.formData.push(this.email);
      $scope.formData.push(this.password);

      $http({
        method: 'POST', //방식
        url: '/signup', /* 통신할 URL */
        data: $scope.formData, /* 파라메터로 보낼 데이터 */
        headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
      })
      .success(function(data, status, headers, config) {
        if(data.success) {
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
    
    } // else
  } // signUpSubmit
});