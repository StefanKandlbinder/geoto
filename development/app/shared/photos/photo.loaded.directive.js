'use strict'

angular
	.module('geoto.photos.photo.loaded.directive', [])
	.directive('imageloaded', imageloaded);

imageloaded.$inject = ['$rootScope'];

function imageloaded($rootScope) {
	var directive = {
		restrict: 'A',
		controller: GalleryCtrl,
		link: function(scope, element, attrs) {
			// $rootScope.info = 'loading image ...';
			// success
			element.on('load', function() {
				// console.log($rootScope);
				$rootScope.info = '';
				element.parent().removeClass('is-loading');
				
			});
			// error
			element.on('error', function() {
				console.log('image loading failed: ' + error.data);
			})
		}
	}

	return directive;
}