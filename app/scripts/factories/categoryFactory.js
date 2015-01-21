'use strict';

/**
 * @ngdoc function
 * @name folioApp.factory:WinnersFactory
 * @description
 * # WinnersFactory
 * Factory of the folioApp
 */


angular.module('awardsApp')
  .factory('CategoriesFactory', ['$q', '$http', '$location',
    function CategoriesFactory($q, $http, $location) {
      var exports = {};

      exports.categories       = null;
      exports.idList           = [];
      exports.categoryNameList = [];
      exports.filterBy         = null;

      // createId's combines the first and last name into an id
      // used for routing. It also combines the name into one property
      exports.createIds = function(data){
        var index = 0;
        exports.idList = [];
        exports.categoryNameList = [];
        angular.forEach(data, function(item){
          item.id       = item.category.replace(/\//g, ' ').replace(/\./g, '').replace(/\)\s*|\(\s*|-/g, '').replace(/ /g, '-');
          item.index    = index;
          item.filterBy = 'winner';
          index++;
          exports.categoryNameList.push(item.category);
          exports.idList.push(item.id);
          exports.setSearchableProps(item.winners);
        });
      };

      exports.setSearchableProps = function(data) {
        angular.forEach(data, function(item){
          item.searchableProps = [];
          item.searchableProps.push(item.client);
          item.searchableProps.push(item.campaign);
          item.searchableProps.push(item.agency);
          // console.log(item.searchableProps);
          // console.log(item);
        });
      };

      exports.getData = function(){
        // if (exports.categories){
        //   console.log('got it');
        //   return exports.categories;
        // } else {
          // Here we're using a promise to fetch the data.
          var deferred = $q.defer();
          // Wordpress won't let yoyou use the JSON so it's necessary to copy
          // the JSON to work locally. It's crucial to change this back
          // before a build or you'll be using the static JSON
console.log('getting');
          return $http.get('winners/winners.json')
            .success(function(data){
              exports.createIds(data);
              exports.categories = data;
              deferred.resolve(data);
            })
            .error(function(data){
              deferred.reject(data);
              console.log('There was an error: ', data);
            });
          return deferred.promise;
        // }
      };

      return exports;
    }
  ]);