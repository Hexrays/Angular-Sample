'use strict';

/**
 * @ngdoc function
 * @name awardsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the awardsApp
 */
angular.module('awardsApp')
  .controller('MainCtrl', function ($scope, dataFetch, CategoriesFactory) {
    if (dataFetch) {
        $scope.categoryData = dataFetch.data;
    } else {
        $scope.categoryData = CategoriesFactory.categories;
    }
  });
