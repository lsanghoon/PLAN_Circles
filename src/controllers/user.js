var async = require('async');
var fs = require('fs')
var multiparty = require('multiparty');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  port : 3306,
  user : 'ican',
  password : '1111',
  database : 'plan'
});
connection.connect(function(err){
  if (err) {
    console.error('mysql connection error');
    console.error(err);
    throw err;
  }
});

var sess = [];
/*
  로그인 하기
*/
exports.login = function(req, res) {
  var email = req.body[0];
  var pwd = req.body[1];
  
  var query = connection.query('select name, count(email) as cnt from user where email = ? and pwd = ?', [email, pwd], function(err, rows) {
    console.log(rows[0]);
    if (rows[0].cnt === 0) { 
      console.log('존재하지 않거나 이메일 혹은 패스워드 틀림');
      res.end('{"success" : false}');
      
    } else {
      sess = req.session;
      sess.email = email;
//      req.sessionId;
      console.log(sess);
      res.end('{"success" : true, "email" : "' + email + '", "name" : "' + rows[0].name + '"}');
      
    }
  });
}

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    if (err) throw err;
  })
  console.log('세션 Destroy');
  console.log(req.session);
  res.redirect('/main');
}

exports.signup = function(req, res) {
  console.log(req.body[0].email);
  var email = req.body[0].email;
  var password = req.body[0].password;
  var name = req.body[0].name;
  var birth = req.body[0].birth.substr(0,10);
  var gender = req.body[0].gender;
  var cphone = req.body[0].cphone;
  var hphone = req.body[0].hphone;
  var addr = req.body[0].addr;
  var job = req.body[0].job;
  var school = req.body[0].school;
  var stu_no = req.body[0].stu_no;
  var dept = req.body[0].dept;
  var gradu = req.body[0].gradu;
  
  var query = connection.query(
    "insert into user (email, pwd, name, birth, gender, cphone, hphone, addr, job, school, stu_no, dept, graduate) values (?,?,?,?,?,?,?,?,?,?,?,?,?)", [email, password, name, birth, gender, cphone, hphone, addr, job, school, stu_no, dept, gradu], function(err, rows) {
      if (err) console.log(err);
      
      sess = req.session;
      sess.email = email;
      console.log(sess);
      res.end('{"success" : true, "email" : "' + email + '", "name" : "' + name + '"}');
      
  });

}

//--------------------------------------------------
//       회원 프로필 이미지 업로드 200 x 200
//--------------------------------------------------
exports.cropImg = function(req, res) {
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

    console.log(sess);
    res.end('{"success" : "true", "filename" : "' + filename + '"}');
  });

  // 얼마나 업로드 되고있는지 프로그래스 콘솔 표시
  form.on('progress',function(byteRead,byteExpected){
    console.log('--> Reading total ' + byteRead+' / ' + byteExpected);
  });
  form.parse(req);
}