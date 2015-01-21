// Based on this
// http://ctrlq.org/code/19452-embed-youtube-with-javascript

'use strict';

angular.module('awardsApp')
  .directive('youtubeVideo', function($timeout, Flags){
    return {
      restrict     : 'AE',

      link: function(scope, element, attrs){
        var INTERVAL = 666,
            iframe, timer;

        scope.youtubeId = attrs.youtubeVideo;

        scope.onYoutubeClick = function(){
          element.addClass('youtube-active');
          iframe = document.createElement('iframe');
          iframe.setAttribute('src', 'https://www.youtube.com/embed/' + scope.youtubeId + '?autoplay=1&autohide=1&border=0&wmode=opaque&enablejsapi=1');
          iframe.setAttribute('class', 'video__embed');
          element.append(iframe);
        };

        scope.refreshVideo = function() {
          element.removeClass('youtube-active');
          if (iframe) {
            $(iframe).remove();
          }
        };

        scope.$watch('isActive', function(){
          if (!scope.isActive) {
            if(timer) {$timeout.cancel(timer);}
            timer = $timeout(scope.refreshVideo, INTERVAL);
          }
        });

        element.on('click', scope.onYoutubeClick);

        if (scope.category === scope.category) {
          scope.isActive = true;
        }
      }
    };
  });