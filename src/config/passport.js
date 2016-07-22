'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  console.log('serialize');
  done(null, user);
});

exports.setup = function () {
  passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
      function(email, password, done) {
      // 인증 정보 체크 로직
        if (email === 'aaa@aaa.aa' && password === 'aaaa') {
        // 로그인 성공시 유저 아이디를 넘겨준다.
          var user = {name: 'aaaa'};
          console.log('인증 성공');
          console.log(user);
          return done(null, user);
        } else {
          console.log('인증 실패');
          return done(null, false, { message: 'Fail to login.' });
        }
      }
  ));
};