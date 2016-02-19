'use strict';

angular
	.module('geoto.map.directive', [])
	.directive('geotoMap', geotoMap);

geotoMap.$inject = ['$rootScope', 
				    '$document'];
	
function geotoMap($rootScope, $document) {
	var directive = {
		restrict: 'E',
		// require: ['^^info'],
		templateUrl: 'html/components/map/map.directive.html',
		controller: MapCtrl,
		link: link
	};

	return directive;

	function link(scope, element, attrs, controllers) {

	}

	function MapCtrl() {
		console.log('map init ...');
		
		var map = this;
		
		map.longitude = 0;
		map.setLongitude = setLongitude;
		map.latitude = 0;
		map.setLatitude = setLatitude;
	}

	function setLongitude(longitude) {
		map.longitude = longitude;
	}

	function setLatitude(latitude) {
		map.latitude = latitude;
	}
}