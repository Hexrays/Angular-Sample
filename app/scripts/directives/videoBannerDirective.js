'use strict';

angular.module('awardsApp')
  .directive('videoBanner', function(){
    return {
      restrict     : 'EA',
      replace      : true,
      scope        : {
        video    : '=video',
        category : '=active',
        current  : '=current',
        poster   : '=poster'
      },
      templateUrl  : 'views/videoBanner.tmpl.html',
      controller   : 'videoBannerCtrl'
    };
  })
  .controller('videoBannerCtrl', videoBannerCtrl);

function videoBannerCtrl($scope, $timeout) {
  $scope.videoId = $scope.video.split('v=')[1];
  $scope.isReady = false;
  $scope.isActive = false;

  $scope.startVideo = function(){
    angular.element('.video__poster').addClass('clicked');
  };

  $scope.onPlayerReady = function(){
    angular.element('.video__poster').addClass('video__ready');
  };

  $scope.$on('change:category', function(event, data){
    if ($scope.category === data) {
      $scope.isActive = true;
    } else if ($scope.category !== data && $scope.isActive){
      $scope.isActive = false;
    }
  });
}