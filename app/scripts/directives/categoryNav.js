'use strict';

/**
 * @ngdoc function
 * @name awardsApp:CategoryDirective
 * @description
 * # CategoryDirective
 * Directive of the awardsApp
 */

angular.module('awardsApp')
  .directive('categoryNav', function(){
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'views/category-nav.tmpl.html',
    };
  });