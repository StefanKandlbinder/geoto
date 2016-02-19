'use strict';

// Declare app level module which depends on views, and components
angular.module('app.core', [
  'ngRoute',
  'geoto.photos',
  'geoto.view2',
  'geoto.version',
  'geoto.info.info.directive',
  'geoto.photos.photos.area.service',
  'geoto.photos.photos.size.service',
  'geoto.client.geo.service',
  'geoto.photos.photo.loaded.directive',
  'geoto.photos.photo.directive'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/photos'});
}]);
