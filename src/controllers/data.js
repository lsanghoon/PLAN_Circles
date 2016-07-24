var async = require('async');
var fs = require('fs')
var multiparty = require('multiparty');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var xoauth2 = require('xoauth2');

var info = require('./xoauth2.json');

var generator = xoauth2.createXOAuth2Generator({
  'user': info.user,
  'clientId': info.clientId,
  'clientSecret': info.clientSecret,
  'refreshToken': info.refreshToken,
  'accessToken': info.accessToken
});

// listen for token updates (if refreshToken is set)
// you probably want to store these to a db
generator.on('token', function(token){
    console.log('New token for %s: %s', token.user, token.accessToken);
});

var options = {
  service: 'gmail',
	auth: {
		xoauth2: generator
	}
}

var smtpTransport = nodemailer.createTransport(smtpTransport(options));


//--------------------------------------------------
//      파일업로드 후 파일첨부해서 메일보내기
//--------------------------------------------------
exports.fileUploadSendMail = function(req, res) {
  var form = new multiparty.Form();
  var mailOptions;

  // get field name & value
  form.on('field',function(name,value){
    console.log('normal field / name = ' + name + ' , value = ' + value);
  });

  // 파일 업로드 핸들링
  form.on('part',function(file){
    var filename;
    var size;
    
    if (file.filename) {
      filename = file.filename;
      size = file.byteCount;
    } else {
      file.resume();
    }    

    console.log("--> Write Streaming file : " + filename);
    var writeStream = fs.createWriteStream('./public/upload/' + filename);
    writeStream.filename = filename;
    file.pipe(writeStream);

    file.on('data',function(chunk){
      console.log("--> " + filename + ' : read ' + chunk.length + 'bytes');
    });

    //파일 업로드 끝남을 알림
    file.on('end',function(){
      console.log("--> " + filename + ' Part read complete');
      
      mailOptions = {
        from: 'PLAN',
        to: 'wkdrns119@naver.com',
        subject: '[PLAN][신청] 가입신청서가 도착했습니다',
        html:'<h1>PLAN 새로운 맴버가 되길 원합니다.</h1>',
        attachments:[
          {
            path: './public/upload/' + filename
          }
        ]
      };
      writeStream.end();
    });
  });

  // 모든 업로드가 완료된후
  form.on('close',function(file){
    smtpTransport.sendMail(mailOptions, function(error, response) {
      if (error){
        console.log("전송 실패");
        console.log(error);
        res.end('{"success" : "false"}');
      } else {
        console.log(response);
        console.log("전송 성공");
        res.end('{"success" : "true"}');
      }
      smtpTransport.close();
    });
  });

  // 얼마나 업로드 되고있는지 프로그래스 콘솔 표시
  form.on('progress',function(byteRead,byteExpected){
    console.log('--> Reading total ' + byteRead+' / ' + byteExpected);
  });
  form.parse(req);
}


//--------------------------------------------------
//              게시판 이미지 업로드
//--------------------------------------------------
exports.imgUpload = function(req, res) {
  var form = new multiparty.Form();
  var filename;
  var imgSavePath = './public/img/content/';

  // get field name & value
  form.on('field',function(name,value){
    console.log('normal field / name = ' + name + ' , value = ' + value);
  });

  // 파일 업로드 핸들링
  form.on('part',function(file){
    var size;
    
    if (file.filename) {
      // 파일명 랜덤한 숫자 더해서 제작해야함
      // 같은 파일명이면 기존 파일이 사라짐
      filename = file.filename;
      size = file.byteCount;
    } else {
      file.resume();
    }    

    console.log("--> Write Streaming file : " + filename);
    var writeStream = fs.createWriteStream(imgSavePath + filename);
    writeStream.filename = filename;
    file.pipe(writeStream);

    file.on('data',function(chunk){
      console.log("--> " + filename + ' : read ' + chunk.length + 'bytes');
    });

    //파일 업로드 끝남을 알림
    file.on('end',function(){
      console.log("--> " + filename + ' Part read complete');
      writeStream.end();
    });
  });

  // 모든 업로드가 완료된후
  form.on('close',function(file){
    res.end('{"success" : "true", "filename" : "' + filename + '"}');
  });

  // 얼마나 업로드 되고있는지 프로그래스 콘솔 표시
  form.on('progress',function(byteRead,byteExpected){
    console.log('--> Reading total ' + byteRead+' / ' + byteExpected);
  });
  form.parse(req);
}
