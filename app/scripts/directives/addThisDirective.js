'use strict';

angular.module('awardsApp')
  .directive('addthisToolbox', function($timeout, $rootScope, $location) {
    return {
      restrict : 'A',
        transclude : true,
        replace : true,
        template : '<div ng-transclude></div>',
        link : function(scope, element, attrs) {
          // $timeout(function () {
          //   // addthis.init();
          //   // addthis.toolbox($(element).get(), {}, {
          //   //   url: $location.absUrl(),
          //   //   title : $rootScope.shareMessage,
          //   //   description : 'The editors of Event Marketer magazine announced the winners of the Event Technology Awards, the world’s largest and only recognition program honoring the power of integrating technology into events and trade shows.'
          //   // });
          // });
          scope.onShareInfoReady = function(){
            addthis.init();
            addthis.toolbox($(element).get(), {}, {
              url: $location.absUrl(),
              title : $rootScope.shareMessage,
              description : 'The editors of Event Marketer magazine announced the winners of the Event Technology Awards, the world’s largest and only recognition program honoring the power of integrating technology into events and trade shows.'
            });
          };
          scope.$on('share:ready', scope.onShareInfoReady);
        }
      };
  });