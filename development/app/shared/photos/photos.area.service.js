'use strict';

angular
	.module('geoto.photos.photos.area.service', [])
	.factory('getPhotosFromArea', getPhotosFromArea);

getPhotosFromArea.$inject = ['$http', '$rootScope'];

function getPhotosFromArea($http, $rootScope) {
	var photosfromArea = this;
	
	// flickr
	photosfromArea.flickrKey = '591b1cc30fbed5d42b202c4d22a7ba6b';
	// instagram
	photosfromArea.instagramToken = '14923135.1fb234f.5f63cc371d7049b88becdd04498a63eb';
	// facebook
	photosfromArea.facebookToken = 'CAACEdEose0cBAHAQgIpz5xtMxhap1Ro1A0aYyCd2ldFyENMSoKV0mv7y2xn9Tk66JIdGdZBhZBK0xFHZClniDmB4URPNO4BRVUk20AnmpmH4RBPLwjXnEjB1yKpUCjHAZATuhAOPmZAFqYMZBDqUV8vz2IrCf6iT5m27qSHZAww7QBuTAXsS6NnZBffoZCjyaoRwYVFTxPSkMOZCpZBdiyZCs67WWgpPqruoSGQZD';

	return {
		getPhotos: getPhotos
	};

	function getPhotos(latitude, longitude, radius, perPage, maxUploadDate, page, provider) {
		console.log('getPhotos ...');
		$rootScope.info = 'get photos ...';
		
		var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + photosfromArea.flickrKey + '&lat=' + latitude + '&lon=' + longitude + '&radius=' + radius + '&page=' + page + '&per_page=' + perPage + '&max_upload_date=' + maxUploadDate + '&format=json&jsoncallback=JSON_CALLBACK';
		
		switch(provider) {
			case 'flickr':
				url = url;
				break;

			case 'instagram':
				radius = radius * 1000;
				// console.log(radius);
				url = 'https://api.instagram.com/v1/media/search?lat=' + latitude + '&lng=' + longitude + '&distance=' + radius + '&callback=JSON_CALLBACK&access_token=' + photosfromArea.instagramToken;
				break;

			case 'facebook':
				distance = distance * 1000;
				url = 'https://graph.facebook.com/search?q=coffee&type=place&center=' + latitude + ',' + longitude + '&distance=1000&access_token=' + photosfromArea.facebook;
				break;
		}
		
		return $http.jsonp(url)
			.then(getPhotosComplete)
			.catch(getPhotosFailed);

		function getPhotosComplete(response) {
			$rootScope.info = '';
			return response.data;
		}

		function getPhotosFailed(error) {
			console.log('XHR Failed for getPhotos.' + error.data)
		}
	}
}