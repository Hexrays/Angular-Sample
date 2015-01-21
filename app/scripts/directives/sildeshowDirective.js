'use strict';

angular.module('awardsApp')
  .directive('slideshow', function(){
    return {
      restrict     : 'EA',
      replace      : true,
      scope        : {
        slides   : '=photos',
        category : '=active',
        current  : '=current'
      },
      templateUrl  : 'views/slideshow.tmpl.html',
      controller   : 'SlideshowCtrl'
    };
  })
  .controller('SlideshowCtrl', SlideshowCtrl);

function SlideshowCtrl($scope, $timeout) {
  var INTERVAL = 3000,
      timer;

  $scope.currentIndex = 0;

  $scope.setCurrentSlideIndex = function(index){
    this.currentIndex = index;
  };

  $scope.isCurrentSlideIndex = function(index) {
    // console.log(index);
    return $scope.currentIndex === index;
  };

  $scope.resetSlideCounter = function(){
    $scope.currentIndex = 0;
  };

  $scope.nextSlide = function() {
    $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
    // Check for ticks
    // console.log('tick', $scope.category);
    timer = $timeout($scope.nextSlide, INTERVAL);
  };

  $scope.loadSlides = function() {
    if ($scope.slides.length > 1) {
      $timeout.cancel(timer);
      timer = $timeout($scope.nextSlide, INTERVAL);
    }
  };

  $scope.onClickSlideshowDot = function(index) {
    $timeout.cancel(timer);
    $scope.currentIndex = index;
    timer = $timeout($scope.nextSlide, INTERVAL);
  };

  $scope.$on('change:category', function(event, data){
    // console.log(event, data);
    if ($scope.category === data) {
      $scope.loadSlides();
    } else {
      if(timer) {$timeout.cancel(timer);}
      timer = $timeout($scope.resetSlideCounter, INTERVAL);
    }
  });

  if ($scope.current === $scope.category) {
    $scope.loadSlides();
  }

  // console.log($scope.$parent.$parent.$parent.category.currentCategory);
  // console.log($scope.category);
  // console.log($scope.$parent.$parent.cat.category);
// console.log($scope);
  // $scope.loadSlides();
}