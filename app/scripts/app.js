'use strict';

/**
 * @ngdoc overview
 * @name awardsApp
 * @description
 * # awardsApp
 *
 * Main module of the application.
 */
angular.module('awardsApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngTouch',
  'ui.router'
]).config(function ($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      resolve: {
        dataFetch: function(CategoriesFactory) {
          if(!CategoriesFactory.categories) {
            return CategoriesFactory.getData();
          }
        }
      }
    })
    .state('category', {
      url: '/category/:category?award',
      templateUrl: 'views/category.html',
      reloadOnSearch: false,
      resolve: {
        dataFetch: function(CategoriesFactory) {
          if(!CategoriesFactory.categories) {
            return CategoriesFactory.getData();
          }
        }
      }
    });
}).run(function($rootScope){
  $rootScope.$on('$routeChangeError', function(event, current, previous, rejection){
    console.log(event, current, previous, rejection);
  });
});
