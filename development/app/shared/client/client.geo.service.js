'use strict';

angular
	.module('geoto.client.geo.service', [])
	.factory('getClientGeo', getClientGeo);

getClientGeo.$inject = ['$q', '$rootScope'];

function getClientGeo($q, $rootScope) {
	var scope = $rootScope;
	
	return {
		getGeo: getGeo
	};

	function getGeo() {
		console.log('getGeo ...');
		scope.info = 'get geolocation ...';

		var deferred = $q.defer();

	    navigator.geolocation.getCurrentPosition(
	        function(position) { deferred.resolve(position.coords); },
	        function(error) { deferred.resolve(null); }
	    );

	    return deferred.promise;
	}
}