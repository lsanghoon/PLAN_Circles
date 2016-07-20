var myApp = angular.module('myApp', ['ngMaterial','ui.router','ui.bootstrap','youtube-embed']);

myApp.config(function($stateProvider, $urlRouterProvider) {

  // 맞지 않는 모든 URL에 대해 redirect to /deshBoard
  $urlRouterProvider.otherwise("/main");

  // SET UP states
  $stateProvider
  .state('main', {
    url: "/main",
    templateUrl: "views/main2.html",
    controller: "mainCtrl"
  })
  .state('login', {
    url: "/login",
    templateUrl: "views/login.html",
    controller: "loginCtrl"
  })
  .state('planInfo', {
    url: "/planInfo",
    templateUrl: "views/planInfo.html"
  })
  .state('tsInfo', {
    url: "/tsInfo",
    templateUrl: "views/tsInfo.html"
  })
  .state('adminInfo', {
    url: "/adminInfo",
    templateUrl: "views/adminInfo.html"
  })
  .state('tNotice', {
    url: "/tNotice",
    templateUrl: "views/tNotice.html",
    controller:"tNoticeCtrl"
  })
  .state('sNotice', {
    url: "/sNotice",
    templateUrl: "views/sNotice.html",
    controller:"sNoticeCtrl"
  })
  .state('faq', {
    url: "/faq",
    templateUrl: "views/faq.html",
    controller:"faqCtrl"
  })
});