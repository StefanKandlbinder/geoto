'use strict'

angular
	.module('geoto.info.info.service.directive', [])
	.directive('info', info);

function info() {
	console.log('info directive ...');

	var directive = {
		restrict: 'EA',
		/* scope: {
			message: '='
		}, */
		link: link,
		controller: InfoController,
		controllerAs: 'info',
		bindToController: true
	}

	return directive;

	function link(scope, element, attrs) {
		// element.text(info.message);
	}
}

InfoController.$inject = ['$scope'];

function InfoController($scope, message) {
	var info = this;
	info.message = message;
}