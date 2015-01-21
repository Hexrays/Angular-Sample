// http://stackoverflow.com/questions/21056699/background-default-image-if-ng-style-image-loaded-is-invalid-url
// Taken from this stackoverflow post.
// Could probably be used for an image preloader too.

'use strict';

angular.module('awardsApp')
  .directive('bgImage', function () {
    return {
      link: function(scope, element, attr) {
        element.css({
          'background':'url(images/ajax-loadera.gif) center center no-repeat',
          // 'background-size': 'cover'
        });
        attr.$observe('bgImage', function() {
          var image = new Image();
          image.src = attr.bgImage;
          image.onload = function() {
             //Image loaded- set the background image to it
            element.css({
              'background':'url('+attr.bgImage+') center center no-repeat',
              'background-size': 'cover'
            });
          };
        });
      }
    };
  });