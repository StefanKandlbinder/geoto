'use strict';

// Declare app level module which depends on views, and components
angular
  .module('geoto', [
    'ngRoute',
    // 'hmTouchEvents',
    // 'infinite-scroll',

    'geoto.photos.photos.area.service',
    'geoto.photos.photos.size.service',
    'geoto.client.geo.service',

    'geoto.photos.photo.loaded.directive',
    'geoto.photos.photo.sticky.directive',

    'geoto.photos.thumbnail.directive',
    'geoto.photos.gallery',

    'geoto.map.directive'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/photos'});
  }])
  .controller('geotoController', geotoController);

geotoController.$inject = ['$document', 
                           '$rootScope'];

function geotoController($document, $rootScope) {
  console.log('init ...');

  $rootScope.info = '';

  // update the app info
  $rootScope.$watch(['info'], function(newValue, oldValue) {
    $rootScope.info = newValue;
  });

  var myLatlng = new google.maps.LatLng(48.2907483, 14.275733299999999);
  var mapCanvas = document.getElementById('map');
  var mapOptions = {
    center: myLatlng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(mapCanvas, mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Geoto!',
      draggable: true
  });

  marker.setMap(map);

  // attach fastclick – https://github.com/ftlabs/fastclick
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
    }, false);
  }
}
