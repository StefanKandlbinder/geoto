'use strict';

angular
	.module('geoto.photos.photos.size.service', [])
	.factory('getPhotosSize', getPhotosSize);

getPhotosSize.$inject = ['$http', '$rootScope'];

function getPhotosSize($http, $rootScope) {
	var vm = this;
	vm.provider = 'flickr';
	vm.id = '';
	vm.url = '';

	return {
		getPhotosSize: getPhotosSize
	};

	function getPhotosSize(id, provider) {
		console.log('getPhotosSize ...');
		$rootScope.info = 'get sizes ...';

		vm.provider = provider;
		vm.id = id;

		switch(vm.provider) {
			case 'flickr':
				vm.url = 'https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=591b1cc30fbed5d42b202c4d22a7ba6b&photo_id=' + vm.id + '&format=json&jsoncallback=JSON_CALLBACK';
				break;
			case 'instagram':
				vm.url = '';
				break;
			case 'facebook':
				vm.url = '';
				break;
		}
		
		return $http.jsonp(vm.url)
			.then(getPhotosSizeComplete)
			.catch(getPhotosSizeFailed);

		function getPhotosSizeComplete(response) {
			$rootScope.info = '';
			return response.data;
		}

		function getPhotosSizeFailed(error) {
			console.log('XHR Failed for getPhotosSize.' + error.data)
		}
	}
}