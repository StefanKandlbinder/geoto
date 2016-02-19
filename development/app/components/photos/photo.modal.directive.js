'use strict';

angular
	.module('geoto.photos.modal.directive', [])
	.directive('geotoModal', geotoPhoto);
	
function geotoPhoto() {
	var directive = {
		restrict: 'E',
		// require: ['^^info'],
		templateUrl: 'html/components/photos/photo.modal.directive.html',
		controller: GalleryCtrl,
		link: link
	};

	return directive;

	function link(scope, element, attrs, controllers) {
		
	}
}