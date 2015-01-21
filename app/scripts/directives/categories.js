'use strict';

/**
 * @ngdoc function
 * @name awardsApp:CategoriesDirective
 * @description
 * # CategoriesDirective
 * Directive of the awardsApp
 */

angular.module('awardsApp')
  .directive('categories', function(){
    return {
      restrict     : 'EA',
      replace      : true,
      scope        : {},
      templateUrl  : 'views/categories.tmpl.html',
      controllerAs : 'categories',
      controller   : 'CategoriesCtrl',
      link: function(scope, element, attr) {
        scope.$on('category_wall_done', function(){
          angular.element('body').addClass('index-view');
        });
      }
    };
  })
  .controller('CategoriesCtrl', function($scope, $rootScope){
    this.categories = [];
    this.currentCategory = null;

    this.onClickCategory = function(){
        angular.element('body').removeClass('index-view');
    };

    this.processData = function(data) {
      angular.forEach(data, function(category){
        // Set the background image
        category.bgImage = {
          background: 'url(' + category.winners[0].photos[0] +') center top no-repeat',
          'background-size': 'cover'
        };
      });
    };

    this.getCategoryData = function(data){
      this.categories = data;
      $rootScope.shareMessage = 'Event Technology Awards 2014';
      this.processData(this.categories);
      $scope.$emit('share:ready');
    };
    this.getCategoryData($scope.$parent.categoryData);

    if (angular.element('body').hasClass('category-view')) {
      angular.element('body').removeClass('category-view');
    }

  });