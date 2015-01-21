'use strict';

/**
 * @ngdoc function
 * @name awardsApp:CategoryDirective
 * @description
 * # CategoryDirective
 * Directive of the awardsApp
 */

angular.module('awardsApp')
  .directive('award', function(){
    return {
      restrict: 'EA',
      templateUrl: 'views/award.tmpl.html',
      replace: true
    };
  });