var PolicyEditor = function (options){

	var activeRuleNumber = 0;
	var activeRuleOptions = "";

	var init = function (){
		$(document).bind('touchmove', false); // don't you f** scroll, Mr Document.

		// var elem = $('#dragg')[0];
		// var draggie = new Draggabilly( elem, {
		// 	containment: '#topView',
		// 	grid: [ 64, 64 ]
		// });

		//initDragging();
		// FastClick.attach(document.body);
	};

	var initDragging = function () {

		var hammertime = new Hammer($('#container')[0], { dragMaxTouches: 0, preventDefault: true });


		$('.entity[data-type=chair]').each(function (i, elem) {
			addDragHandler(elem);
		});

		function addDragHandler (elem) {
			var width = $(elem).width();
			var height = $(elem).height();

			// frame events tries to make it run at 60fps
			FrameEvents.on(elem, "drag", function (event) {
				event.preventDefault();



				Hammer.utils.each(event.gesture.touches, function (touch) {

					elem.style.cssText = "left:" + (touch.pageX - width/2) + "px; top:" + (touch.pageY - height/2) + "px";
				});
			});
		}

	}

	return {
		init: init
	};
};



$(function(){
	var app = new PolicyEditor();
	app.init();
});