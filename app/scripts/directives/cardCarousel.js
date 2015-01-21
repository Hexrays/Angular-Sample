'use strict';

angular.module('awardsApp')
  .directive('onRepeatDone', function() {
    return {
        restriction: 'A',
        link: function(scope, element, attributes ) {
          if(scope.$last){
            scope.$emit(attributes['onRepeatDone'] || 'repeat_done', element);
          }
        }
    };
  })

  .directive('cardCarousel', function ($window, $timeout) {
    return {
      link: function(scope, element, attr) {
        var w = angular.element($window),
            innerScope = scope,
            timer1, timer2;

        scope.resizeContainer = function(){

          element.addClass('element-resizing');

          if (timer1 !== undefined) {
            $timeout.cancel(timer1);
            $timeout.cancel(timer2);
          }

          timer1 = $timeout(function(){
            innerScope.sizeContainer();
          }, 50);

          timer2 = $timeout(function(){
            element.removeClass('element-resizing');
          }, 500);
        };

        scope.sizeContainer = function(){
          var children    = element.children(),
              childrenAmt = children.length,
              elWidth     = w.width() * childrenAmt,
              translateAmt = -(elWidth / childrenAmt) * scope.category.index + 'px';

          element.css({
            width: elWidth,
            transform: 'translate3d(' + translateAmt + ', 0,0)'
          });
          children.css({
            width: elWidth / childrenAmt
          });
        };

        scope.$on('category_done', scope.sizeContainer);

        angular.element($window).bind('resize', function(){
          scope.resizeContainer();
        });
      }
    };
  });