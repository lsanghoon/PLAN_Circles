myApp.controller('signUpCtrl', function ($location, $scope, $http) {
  
  $scope.user = {
    email: "",  // 이메일
    password: "", // 패스워드
    name: "", // 이름
    birth: "",  // 생년월일
    gender: "M", // 성별
    cphone: "", // 핸드폰번호
    hphone: "", // 집 전화번호
    addr: "", // 주소
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
  
  $(document).on("click", "#signUpFail-btn", function() {
    $('#signUpFail').css('display','none');
  });
  
  $scope.getSelected = function() {
    if ($scope.user.job == "대학생") {
      $('#school').css('display', '');
      $('#hint-school').html('풀네임으로 입력해주세요. <font style="color:#f34235;font-size:25px">예) 안양대학교</font>');
      $('#stu_no').css('display', '');
      $('#dept').css('display', '');
      $('#gradu').css('display', '');
      return "대학생";
      
    } else if ($scope.user.job == "고등학생") {
      $('#school').css('display', '');
      $('#hint-school').html('풀네임으로 입력해주세요. <font style="color:#f34235;font-size:25px">예) 안양고등학교</font>');
      $('#stu_no').css('display', 'none');
      $('#dept').css('display', 'none');
      $('#gradu').css('display', '');
      return "고등학생";
      
    } else {
      $('#school').css('display', 'none');
      $('#stu_no').css('display', 'none');
      $('#dept').css('display', 'none');
      $('#gradu').css('display', 'none');
      return "직장인";
      
    }
  } // getSelected
  
  $scope.signUpSubmit = function() {
    console.log($scope.user.birth);
    if ($('#pw1').val() != $('#pw2').val()) {
      $('#signUpFail').css('display','');
      $scope.signUpFailText = '비밀번호가 틀립니다.';
      $scope.signUpFailEx = '';
      
    } else if ($scope.user.birth == '') {
      $('#signUpFail').css('display','');
      $scope.signUpFailText = '생년월일을 선택해주세요.';
      $scope.signUpFailEx = '';
      
    } else if ($scope.user.job == '대학생') {
      if ($scope.user.school == '') {
        $('#signUpFail').css('display','');
        $scope.signUpFailText = '학교이름을 입력해주세요.';
        $scope.signUpFailEx = '예) 안양대학교';
        
      } else if ($scope.user.stu_no == '') {
        $('#signUpFail').css('display','');
        $scope.signUpFailText = '학번을 입력해주세요.';
        $scope.signUpFailEx = '';
        
      } else if ($scope.user.dept == '') {
        $('#signUpFail').css('display','');
        $scope.signUpFailText = '학과를 입력해주세요. ';
        $scope.signUpFailEx = '예)컴퓨터공학과(o) 컴공과(x)';
        
      }
    } else if (($scope.user.job == '고등학생') && ($scope.user.school == '')) {
      $('#signUpFail').css('display','');
      $scope.signUpFailText = '학교이름을 입력해주세요.';
      $scope.signUpFailEx = '예) 안양고등학교';
     
    } else {
      $scope.formData = [];
      $scope.formData.push(this.user);

      $http({
        method: 'POST', //방식
        url: '/signup', /* 통신할 URL */
        data: $scope.formData, /* 파라메터로 보낼 데이터 */
        headers: {'Content-Type': 'application/json; charset=utf-8'} //헤더
      })
      .success(function(data, status, headers, config) {
        if(data.success) {
          console.log("success");
          Cookies.set('islogin', data.name);
          $('#loginBtn').css('display','none');
          
          div.append(
            '<li class="dropdown">' +
              '<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' +
                data.name +
                '<span class="caret"></span>' +
              '</a>' +
              '<ul class="dropdown-menu">' +
                '<li><a class="menuBtn" ui-sref="main">내 정보</a></li>' +
                '<li><a class="menuBtn" id="logout">로그아웃</a></li>' +
              '</ul>' +
            '</li>'
          );

          $location.path('/imgcrop');

        } else {
          /* 통신한 URL에서 데이터가 넘어오지 않았을 때 처리 */
          $scope.formData = [];
        }
      })
      .error(function(data, status, headers, config) {
        /* 서버와의 연결이 정상적이지 않을 때 처리 */
        console.log("err")
      });
    
    } // else
  } // signUpSubmit
});