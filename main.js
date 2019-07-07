//import component from './component_path';

var app = angular
    .module('myApp', [])
    // .component('componentHTMLTag', componentClass)
    .config(function($locationProvider) {
      $locationProvider.html5Mode(true);
    });