'use strict';

angular
	.module('geoto.photos.gallery', [])
	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/photos', {
	    templateUrl: 'html/components/photos/gallery.html',
	    controller: 'GalleryCtrl'
	  });
	}])
	.controller('GalleryCtrl', GalleryCtrl)
	.run(function() {
		// vm.getGeo();
	});

GalleryCtrl.$inject = ['getPhotosFromArea', 
					   'getPhotosSize', 
					   'getClientGeo',
					   '$document',
					   '$window',
					   '$rootScope',
					   '$timeout', 
					   '$location', 
					   '$anchorScroll'];

function GalleryCtrl(getPhotosFromArea, getPhotosSize, getClientGeo, $document, $window, $rootScope, $timeout, $location, $anchorScroll) {
	var vm = this;
	vm.latitude = 50;
	vm.longitude = 15;
	vm.radius = 2;
	vm.perPage = 100;
	vm.page = 1;
	vm.maxUploadDate = 0;
	vm.pages = 1;
	vm.photosFromArea = [];
	vm.foundPhotos = 0;
	vm.photos = [];
	vm.source = [];

	vm.getPhotos = getPhotos;
	vm.getPhotosBefore = getPhotosBefore;
	vm.getPhotosAfter = getPhotosAfter;
	vm.getGeo =	getGeo;
	vm.setLatitude = setLatitude;
	vm.setLongitude = setLongitude;
	vm.setRadius = setRadius;
	vm.setProvider = setProvider;
	vm.prevPictures = prevPictures;
	vm.nextPictures = nextPictures;

	vm.showingPicturesFrom = 0;
	vm.showingPicturesTo = 0;

	vm.setShowingPicturesFrom = setShowingPicturesFrom;
	vm.setShowingPicturesTo = setShowingPicturesTo;
	vm.scrollTo = vm.scrollTo;
 	vm.showModal = showModal;

	vm.provider = 'flickr';
	vm.windowHeight = 0;
	vm.scrollPosition = 0;

	vm.windowHeight = $window.innerHeight;
	vm.maxUploadDate = Math.round(+new Date()/1000);

  	$rootScope.scrollPage = 0;

	// update the app info
	$rootScope.$watchCollection('scrollPage', function(newValue, oldValue) {
	   	// $rootScope.scroll = newValue;
	   	if (!newValue) return;

		console.log($rootScope.scrollPage);
	});
	

	// $timeout(getPhotos, 3000);
	
	// console.log(scope.info);

	// getPhotos();
	// getGeo();
	/* $document.bind( 'scroll', function() {
    	// position = element.parent()[0].getBoundingClientRect().top;
    	vm.scrollPosition = Math.abs($document[0].body.getBoundingClientRect().top);
  
    	$rootScope.scrollPage = Math.floor(vm.scrollPosition / vm.windowHeight);
    	$rootScope.$apply();
    }); */

	function getPhotos() {
		switch(vm.provider) {
			case 'flickr':
				vm.perPage = 30;
				// vm.page = page;

				getPhotosFromArea.getPhotos(vm.latitude, vm.longitude, vm.radius, vm.perPage, vm.maxUploadDate, vm.page, vm.provider)
					.then(function(data) {
						vm.photosFromArea = data;
						// console.log(vm.photosFromArea);
						vm.foundPhotos = vm.photosFromArea.photos.total;
						vm.pages = vm.photosFromArea.photos.pages;
						setShowingPicturesFrom();
						setShowingPicturesTo();
						// console.log('pages: ' + vm.pages + ' | page: ' + vm.page);
						getSizes(vm.photosFromArea);
					});
				break;
			case 'instagram':
				vm.perPage = 20;

				getPhotosFromArea.getPhotos(vm.latitude, vm.longitude, vm.radius, vm.perPage, vm.maxUploadDate, vm.page, vm.provider)
					.then(function(data) {
						// console.log(data);
						vm.photosFromArea = data;
						vm.foundPhotos = vm.photosFromArea.data.length;
						vm.page = 1;
						vm.pages = 1;
						setShowingPicturesFrom();
						setShowingPicturesTo();
						// console.log('pages: ' + vm.pages + ' | page: ' + vm.page);
						getSizes(vm.photosFromArea);
					});
				break;
			case 'facebook':
				getPhotosFromArea.getPhotos(vm.latitude, vm.longitude, vm.radius, vm.perPage, vm.maxUploadDate, vm.page, vm.provider)
					.then(function(data) {
						vm.photosFromArea = data;
						// console.log(data);
						// vm.foundPhotos = vm.photosFromArea.data.length;
						// getSizes(vm.photosFromArea);
						/// console.log(vm.photosFromArea);
					});
				break;
		}
	}

	function getPhotosBefore() {

	} 

	function getPhotosAfter() {

	}

	function getSizes(photos) {
		vm.source = [];
		vm.photosFromArea = [];
		vm.photos = [];

		switch(vm.provider) {
			case 'flickr':
				angular.forEach(photos.photos.photo, function(photo) {
					getPhotosSize.getPhotosSize(photo.id, vm.provider)
		        		.then(function(data) {
		        			// console.log(data);
		        			var sizeLength = data.sizes.size.length;
		        			var thumbnail = data.sizes.size[1].source;
		        			var full = data.sizes.size[sizeLength - 1].source;
		        			var source = {'thumbnail': thumbnail, 'full': full};
		        			vm.source.push(source);
		        			vm.photos.push({ 'source': source, 'title': photo.title });
		        			// console.log(vm.photos);
		        		});
	        	});
        		break;
        	case 'instagram':
        		angular.forEach(photos.data, function(photo) {
        			// console.log(photo);
        			var thumbnail = photo.images.thumbnail.url;
        			var full = photo.images.standard_resolution.url;
        			var source = {'thumbnail': thumbnail, 'full': full};
        			vm.source.push(source);
        			vm.photos.push({ 'source': source, 'title': '' });
        		});
	        	break;
		}
	}

	function getGeo() {
		scrollTo('top');
		
		getClientGeo.getGeo()
			.then(function(data) {
				// console.log(data);
				vm.latitude = data.latitude;
				vm.longitude = data.longitude;
				vm.page = 1;

			}).then(function() {
				getPhotos();
			});
	}

	function setLatitude() {
		vm.page = 1;
		getPhotos();
	}

	function setLongitude() {
		vm.page = 1;
		getPhotos();
	}

	function setRadius() {
		vm.page = 1;
		getPhotos();
	}

	function setProvider(provider) {
		console.log('provider: ' + provider);
		vm.provider = provider;
		vm.page = 1;
		scrollTo('top');
		getPhotos();
	}

	function prevPictures() {
		console.log('previous pictures ...');

		scrollTo('top');

		if (vm.page > 1) {
			vm.page = vm.page - 1;
			getPhotos();
		}
	}

	function nextPictures() {
		console.log('next pictures ...');

		scrollTo('top');

		if (vm.page < vm.pages) {
			vm.page = vm.page + 1;
			getPhotos();
		}
	}

	function setShowingPicturesFrom() {
		vm.showingPicturesFrom = (vm.page - 1)  * vm.perPage;
	}

	function setShowingPicturesTo() {
		if (vm.page == vm.pages) {
			vm.showingPicturesTo = vm.foundPhotos;
		}
		else {
			vm.showingPicturesTo = vm.page * vm.perPage;
		}
	}

	function scrollTo(hash) {
		$location.hash(hash);
		$anchorScroll();
	}

	function showModal(src) {
		// alert(src);
		console.log(src);
	}
}