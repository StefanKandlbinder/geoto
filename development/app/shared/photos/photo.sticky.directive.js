'use strict'

angular
	.module('geoto.photos.photo.sticky.directive', [])
	.directive('sticky', sticky);

sticky.$inject = ['$rootScope', 
				  '$document', 
				  '$interval'];

function sticky($rootScope, $document, $interval) {
	var directive = {
		restrict: 'A',
		controller: GalleryCtrl,
		link: function(scope, element, attrs) {
			// $rootScope.info = 'sticky ...';

			element.addClass('sticky');
			
			var height = "height: " + (element[0].clientHeight + 8) + "px";
			element.parent()[0].setAttribute("style", height);

			var offsetHeight = element[0].offsetHeight;
			var myRegExp = new RegExp('\d+.*\d\g');
			var marginBottom = element[0].style.marginBottom;
			
			var fontSize = $document[0].body.style.fontSize;
			var positionInit = element[0].getBoundingClientRect().top - offsetHeight - 16;

			var didScroll = false;
			var translateY = "";
			var position = 0;
			var positionBody = 0;
			var pan = 0;

			/* var myElement = document.getElementById('geoto-photos');
			var mc = new Hammer.Manager(myElement, {
		    recognizers: [
		        // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
		        [Hammer.Pan,{ direction: Hammer.DIRECTION_VERTICAL }],
			    ]
			}); */

			/* mc.on("pan", function(ev) {
				pan = ev.deltaY;
			    console.log(pan);

			    position = element.parent()[0].getBoundingClientRect().top;

			    if (position <= 0) {
					element.addClass('sticky--top');
				}
				if (position >= 0) {
					element.removeClass('sticky--top');
				}
			}); */

			$document.bind( 'scroll', function() {
				didScroll = true;
			});

			$interval(function() {
				if ( didScroll ) {
			        didScroll = false;
			        position = element.parent()[0].getBoundingClientRect().top;
			    	// positionBody = $document[0].body.getBoundingClientRect().top;
			    	// translateY = "transform: translateY(" + Math.abs(position) + "px); -webkit-transform: translateY(" + Math.abs(position) + "px)";

			    	// console.log(position + ' | ' + positionBody);

					if (position <= 0) {
						element.addClass('sticky--top');
						// element[0].setAttribute("style", translateY);
					}
					if (position >= 0) {
						element.removeClass('sticky--top');
						// element[0].setAttribute("style", "transform: translateY(-8px)");
					}
			    }
	            
	        }, 100);

			// console.log(positionInit + ' | ' + marginBottom + ' | ' + fontSize);

		    /* $document.bind( 'scroll', function() {
		    	position = element.parent()[0].getBoundingClientRect().top;
		    	// positionBody = $document[0].body.getBoundingClientRect().top;
		    	// translateY = "transform: translateY(" + Math.abs(position) + "px); -webkit-transform: translateY(" + Math.abs(position) + "px)";

		    	// console.log(position + ' | ' + positionBody);
		    	// $rootScope.info = position;

				if (position <= 0) {
					element.addClass('sticky--top');
					
					// element[0].setAttribute("style", translateY);
					// var padding = "padding-left: 0; padding-right: 0";
					// element.parent()[0].setAttribute("style", padding);
				}
				if (position >= 0) {
					element.removeClass('sticky--top');
					
					// element[0].setAttribute("style", "transform: translateY(0)");
					// var padding = "padding-left: 6px; padding-right: 6px";
					// element.parent()[0].setAttribute("style", padding);
				}
	        }); */
		}
	}

	return directive;
}