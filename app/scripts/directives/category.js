'use strict';

/**
 * @ngdoc function
 * @name awardsApp:CategoryDirective
 * @description
 * # CategoryDirective
 * Directive of the awardsApp
 */

angular.module('awardsApp')
  .directive('category', function(){
    return {
      restrict: 'EA',
      replace: true,
      scope: true,
      templateUrl: 'views/category.tmpl.html',
      controllerAs: 'category',
      controller: 'CategoryCtrl'
    };
  })
  .controller('CategoryCtrl', CategoryCtrl);

function CategoryCtrl($scope, CategoriesFactory, $stateParams, $location, Flags, $rootScope, $window){
  var self              = this;
  this.details          = {};
  this.winners          = {};
  this.filterBy         = 'winner';
  this.categoryIdList   = [];
  this.categoryNames    = [];
  this.categoryListLeng = null;
  this.categories       = null;
  this.currentCategory  = null;
  this.nextCategoryId   = undefined;
  this.prevCategoryId   = undefined;
  this.awards           = ['winner', 'gold', 'silver'];
  this.index            = null;
  this.next             = null;
  this.prev             = null;
  this.$body            = angular.element('body');

  this.getLocation = function(array, value) {
    for(var i = 0; i < array.length; i += 1) {
      if(array[i] === value) {
        return i;
      }
    }
  };

  this.goTo = function(category){
    this.index     = this.getLocation(this.categoryIdList, category);
    this.prevIndex = this.index;
    this.shiftTo(this.index);
    this.setNav();

    if ($location.search().award !== undefined) {
      this.categories[this.index].filterBy = $location.search().award;
    }
  };

  this.shiftTo = function(index) {
    var transitionDuration = ((Math.abs(this.prevIndex - index) * 0.2) + 0.8) + 's',
        ieTransitionDuration = ((Math.abs(this.prevIndex - index) * 0.2) + 0.8) * 1000;
    this.categories[this.index].filterBy = 'winner';
    this.setNav();
    $scope.$broadcast('change:category', this.currentCategory);
    if(Flags.Browser.isIE9) {
      // angular.element('.category__carousel').css({
      //   // transform: 'translate(' + (index * (-100/this.categoryListLeng) ) + '%, 0,0)',
      //   left: (index * (-100/this.categoryListLeng) ) + '%',
      //   'transition-duration': transitionDuration
      // });
      $('.category__carousel').animate({left:(index * (-100/this.categoryListLeng) ) + '%'}, ieTransitionDuration);
    } else {
      angular.element('.category__carousel').css({
        transform: 'translate3d(' + (index * (-100/this.categoryListLeng) ) + '%, 0,0)',
        'transition-duration': transitionDuration
      });
    }

    $('.main__view').animate({scrollTop: 0}, 'fast');
  };

  this.setShareMessage = function(){
    $rootScope.shareMessage = this.currentCategory;
  };

  this.setNav = function(){
    this.currentCategory       = this.categoryNames[this.index];
    this.currentCategoryId     = this.categoryIdList[this.index];
    this.next                  = this.index + 1;
    this.prev                  = this.index - 1;
    this.setShareMessage();
    if (this.categoryIdList[this.next]) {
      this.nextCategoryId = this.categoryIdList[this.next];
    } else {
      this.nextCategoryId = undefined;
    }

    if (this.categoryIdList[this.prev]) {
      this.prevCategoryId = this.categoryIdList[this.prev];
    } else {
      this.prevCategoryId = undefined;
    }
  };

  this.onClickCategory = function(index) {
    var url = '/category/' + this.categoryIdList[index];
    $location.url(url).replace();
    this.prevIndex = this.index;
    this.index = index;
    if (this.isTabletSize) {
      this.$body.removeClass('hide-sidebar');
    }
    this.shiftTo(index);
  };

  this.onNavArrowClickNext = function($event) {
    $event.preventDefault();
    this.nextSlide();
  };

  this.onNavArrowClickPrev = function($event) {
    $event.preventDefault();
    this.prevSlide();
  };

  this.onSwipeNext = function($event) {
    if ('ontouchstart' in window) {
      this.nextSlide();
    } else if($event.target.tagName === 'P' || angular.element($event.target).hasClass('no-swipe')) {
      // don't swipe!
      return;
    } else {
      this.nextSlide();
    }
  };

  this.onSwipePrev = function($event) {
    if ('ontouchstart' in window) {
      this.prevSlide();
    } else if($event.target.tagName === 'P' || angular.element($event.target).hasClass('no-swipe')) {
      // don't swipe!
      return;
    } else {
      this.prevSlide();
    }
  };

  this.nextSlide = function(){
    if (this.nextCategoryId !== undefined) {
      $location.url('/category/' + this.nextCategoryId).replace();
      this.prevIndex = this.index;
      this.index++;
      this.shiftTo(this.next);
    }
  };

  this.prevSlide = function() {
    if (this.prevCategoryId !== undefined) {
      $location.url('/category/' + this.prevCategoryId).replace();
      this.prevIndex = this.index;
      this.index--;
      this.shiftTo(this.prev);
    }
  };

  this.createBgImages = function(winners) {
    angular.forEach(winners, function(winner){
      winner.bgImage = {
        background: 'url(' + winner.photos[0] +') center top no-repeat',
        'background-size': 'cover'
      };
    });
  };

  this.setCategoryData = function(data){
    var self = this;
    this.categoryData = data;
    angular.forEach(data, function(item){
      self.createBgImages(item.winners);
    });
  };

  this.onAwardClick = function(award, index) {
    var newUrl = '/category/' + this.categoryIdList[index];
    if (award.toLowerCase() !== 'winner') {
      newUrl += '?award=' + award;
      $location.url(newUrl).replace();
    } else {
      $location.url(newUrl).replace();
    }
    this.categories[index].filterBy = award;
    $('.main__view').animate({scrollTop: 0});
  };

  this.onClickClose = function(){
    this.currentCategory = null;
    $scope.$broadcast('close:category', this.currentCategory);
    this.$body.removeClass('category-view');
  };

  this.onSearchClick = function(){
    this.showSearch = !this.showSearch;
  };

  this.onWindowResize = function() {
    this.checkWindowSize();
  };

  this.checkWindowSize = function(){
    if($window.innerWidth <= 853) {
      this.isTabletSize = true;
    } else {
      this.isTabletSize = false;
    }
  };

  this.checkBrowser = function(){
    if(Flags.Browser.isFirefox) {
      this.$body.addClass('is-firefox');
    } else if (Flags.Browser.isIE) {
      this.$body.addClass('is-ie');
    }

    if (Flags.Browser.isLtIE11) {
      this.$body.addClass('is-ltie11');
    }

    if (Flags.Browser.isIE9) {
      this.$body.addClass('is-ie9');
    }
  };

  $scope.$on('keydown', function(msg, obj){
    // console.log(obj.code);
    if (obj.code === 39 || obj.code === 40) {
      self.nextSlide();
    } else if (obj.code === 37 || obj.code === 38) {
      self.prevSlide();
    }
    $scope.$apply();
  });

  angular.element($window).bind('resize', function(){
    self.onWindowResize();
  });

  this.getCategory = function() {
    this.categories        = CategoriesFactory.categories;
    this.categoryIdList    = CategoriesFactory.idList;
    this.categoryNames     = CategoriesFactory.categoryNameList;
    this.categoryListLeng  = this.categoryIdList.length;
    this.setCategoryData(this.categories);
    this.currentCategoryId = $stateParams.category;
    this.$body.addClass('category-view');
    this.goTo(this.currentCategoryId);
    this.checkWindowSize();
    this.checkBrowser();
    $scope.$emit('share:ready');
  };

  if(CategoriesFactory.categories){
    this.getCategory();
    $window.scrollTo(0,0);
  } else {
    CategoriesFactory.getData()
      .then(angular.bind(this, function then(){
        // console.log(data);
        this.getCategory();
      }));
  }

  // console.log('Scope', $scope);
  // console.log('this', this);
}