'use strict';

/**
 * @ngdoc function
 * @name folioApp:hideFilters
 * @description
 * # hideFilters
 * Directive of the folioApp
 * Triggers the showing and hiding of filters nav in mobile and
 * at smaller sizes
 */


angular.module('awardsApp')
  .directive('hideFilters', ['$animate', function($animate){
    return function(scope, element, attrs) {
      var parentEl = element.parent();
      element.on('click', function(){
        if(parentEl.hasClass('clicked')) {
          $animate.removeClass(parentEl, 'clicked');
        } else {
          $animate.addClass(parentEl, 'clicked');
        }
      });
    };
  }]);

angular.module('awardsApp')
  .directive('hideSidebar', ['$animate', function($animate){
    return function(scope, element, attrs) {
      var body = angular.element('body');
      element.on('click', function(){
        if(body.hasClass('hide-sidebar')) {
          $animate.removeClass(body, 'hide-sidebar');
        } else {
          $animate.addClass(body, 'hide-sidebar');
        }
      });
    };
  }]);


angular.module('awardsApp')
  .directive('hideParentFilters', ['$animate', function($animate){
    return function(scope, element, attrs) {
      var superParentEl = element.parent().parent().parent();
      element.on('click', function(){
        $animate.removeClass(superParentEl, 'clicked');
      });
    };
  }]);