'use strict';

angular
	.module('geoto.photos.thumbnail.directive', [])
	.directive('geotoThumbnail', geotoPhoto);
	
function geotoPhoto() {
	var directive = {
		restrict: 'E',
		// require: ['^^info'],
		templateUrl: 'html/components/photos/photo.thumbnail.directive.html',
		controller: GalleryCtrl,
		link: link
	};

	return directive;

	function link(scope, element, attrs, controllers) {

	}
}