'use strict';

angular
	.module('geoto.info.info.service', [])
	.factory('info', info);

function info() {
	return {
		getInfo: getInfo
	};

	function getInfo(info) {
		console.log('getInfo ...');
		
		return info;
	}
}