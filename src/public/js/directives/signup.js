'use strict';

/* 패스워드 같은지 검증 */
angular.module('myApp.directives', [])
.directive('pwCheck', [function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pwCheck;
      
      elem.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          console.info(elem.val() === $(firstPassword).val());
          ctrl.$setValidity('pwmatch', elem.val() === $(firstPassword).val());
        });
      });
      
    }
  }
}]);