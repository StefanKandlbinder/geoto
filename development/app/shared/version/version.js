'use strict';

angular.module('geoto.version', [
  'geoto.version.interpolate-filter',
  'geoto.version.version-directive'
])

.value('version', '0.1');
