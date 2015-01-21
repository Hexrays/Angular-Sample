'use strict';

angular.module('awardsApp')
  .directive('keyTrap', function(){
    return function(scope, elem) {
      elem.bind('keydown', function(event){
        if (event.target.nodeName !== 'INPUT') {
          scope.$broadcast('keydown', {code: event.keyCode});
        }
        if (event.keyCode === 40) {
          event.preventDefault();
        }
      });
    };
  });