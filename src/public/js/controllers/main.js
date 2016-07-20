myApp.controller('mainCtrl', function ($location, $uibModal, $scope, $http, $log) {
  // 이미지 슬라이드 인터벌
  $('#carousel-generic').carousel({
    interval: 2000
  })
  
  // alert close
  $(document).on("click", "#danger-btn", function() {
    $('#noFile').css('display','none');
  });
  $(document).on("click", "#success-btn", function() {
    $('#upFile').css('display','none');
  });
  
  //파일 업로드
  $(document).on("click", "#upload", function() {
    console.log("upload..");
    if ($("#file").prop("files")[0] !== undefined) {

      $('#success-title').html('양식을 보내는 중입니다...');
      $('.success-text').html('<i class="fonti um-spinner-alt um-pulse"></i>');
      $('#upFile').css('display','');

      var file_data = $("#file").prop("files")[0];
      var file_name = file_data.name;

      if (file_name !== '양식이름') {
        $('.alert-text').html('동아리 가입 양식만 보낼수 있습니다.');
        $('#noFile').css('display','');
      } else {
//          여기에 ajax 넣기 
      }

      var form_data = new FormData();
      form_data.append("file", file_data);

      $.ajax({
        url: "/upload",
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
        success: function(re) {
          console.log(re.success);
          if (re.success == 'true') {
            console.log('성공');
            $('#success-title').html('성공적으로 양식을 보냈습니다.');
            $('.success-text').html('<i class="fonti um-check"></i>');
            $('#success-btn').css('display','');
            $('#file').val('');
          } else if (re.success == 'false') {
            console.log('실패');
            $('.alert-text').html('업로드 실패 관리자에게 문의하세요.');
            $('#noFile').css('display','');
          }
        }
      }); // ajax - end

    } else {
      console.log('파일없음');
      $('.alert-text').html('파일을 선택하지 않았습니다.');
      $('#noFile').css('display','');
    } // else - end

  });
  
  
  // 스크롤 네비게이터 장착
  $scope.scrollTo = function (hash) {
    $location.hash(hash);
  };
  
  // youTube url정보
  $scope.theBestVideo = 'WkdtmT8A2iY';
  
  // TextScramble
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      this.update = this.update.bind(this);
    }
    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 30);
        const end = start + Math.floor(Math.random() * 35);
        this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }

  // 들어가는 텍스트
  const phrases = [
    'WELCOME TO',
    'THE PLAN',
    'GROUP LIST',
    'TRAVEL',
    'AND',
    'START UP',
    'JOIN US!'
  ]

  const el = document.querySelector('.text')
  const fx = new TextScramble(el)

  let counter = 0
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 1300)
    })
    counter = (counter + 1) % phrases.length
  }

  next()
});
