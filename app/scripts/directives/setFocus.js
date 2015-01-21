'use strict';

angular.module('awardsApp')
  .directive('focus', function ($timeout){
    return {
      scope: {
        focus: '@'
      },
      link: function(scope, element) {
        function setFocus() {
          $timeout(function(){
            element[0].focus();
          });
        }

        if (scope.focus !== null) {
          if (scope.focus !== 'false') {
            setFocus();
          }
          scope.$watch('focus', function(value){
            if (value === true) {
              setFocus();
            }
          });
        } else {
          setFocus();
        }

      }
    };
  });