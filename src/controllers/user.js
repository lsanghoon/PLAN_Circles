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