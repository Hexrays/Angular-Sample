'use strict';

/**
 * @ngdoc function
 * @name awardsApp:SearchDirective
 * @description
 * # SearchDirective
 * Directive of the awardsApp
 */

angular.module('awardsApp')
  .directive('search', function(){
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        'search': '=haystack'
      },
      templateUrl: 'views/search.tmpl.html',
      controllerAs: 'searchCtrl',
      controller: 'SearchCtrl'
    };
  }).controller('SearchCtrl', SearchCtrl);

function SearchCtrl($scope, $state, $location) {

  this.onBackBtnClick = function(){
    $scope.search.searchBy = '';
    this.closeSearch();
  };

  this.closeSearch = function(){
    $scope.search.showSearch = !$scope.search.showSearch;
  };

  this.loadPage = function(id, award){
    if ($state.current.name === 'category'){
      var newUrl = '/category/' + id + '?award=' + award;
      $location.url(newUrl).replace();
      this.closeSearch();
      $scope.search.goTo(id);
    } else if ($state.current.name === 'main') {
      angular.element('body').removeClass('index-view');
    }
  };


}