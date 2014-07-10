var ManualDirector = function (options){

	var activeRuleNumber = 0;
	var activeRuleOptions = "";

	var init = function (){
		addHandlers();

	};

	var addHandlers = function (){
		$("ramp-shop-entity").on('click', function(){
			//console.log($(this).attr("type"));
        	$("#topView").append("<ramp-entity type='"+$(this).attr("type")+"' x='0' y='0' direction='down'></ramp-entity>");
        	$("ramp-entity").last().on('mouseup', checkDirections);
        	$("ramp-entity").last().on('touchend', checkDirections);
        	$("ramp-entity").last().on('click', function(){
	        	showProperties($(this));
	        });
        });
        $("ramp-entity").on('click', function(){
        	showProperties($(this));
        });

        $("ramp-entity").on('mouseup', checkDirections);
        $("ramp-entity").on('touchend', checkDirections);
	};

	var checkDirections = function(event){
		event.preventDefault();
		//tables
		var table = $("ramp-entity[type='table']").first();

		//console.log($(this));

		$(this).attr("direction",entityPosToTable($(this),table));
	};

	var entityPosToTable = function(entity, table){
		// Help variables
		var ent = {
			x:entity[0]["x"],
			y:entity[0]["y"]
		};
		var tab = {
			x:table[0]["x"],
			y:table[0]["y"],
			w:table[0]["w"],
			h:table[0]["h"]
		};
		// console.log(ent);
		// console.log(tab);

		// check top border
		if(((ent.x >= tab.x) && (ent.x < tab.x+tab.w)) && (ent.y == tab.y-1))
			return "down";

		// check left border
		if(((ent.y >= tab.y) && (ent.y < tab.y+tab.h)) && (ent.x == tab.x-1))
			return "right";

		// check right border
		if(((ent.y >= tab.y) && (ent.y < tab.y+tab.h)) && (ent.x == tab.x+tab.w))
			return "left";

		// check bottom border
		if(((ent.x >= tab.x) && (ent.x < tab.x+tab.w)) && (ent.y == tab.y+tab.h))
			return "up";

		return "";
	}

	var showProperties = function(entity){
		console.log(entity[0]["imgName"]);
		$(".typeTitle").text(entity[0]["type"]);
		$(".propertyPane img").attr("src", "images/"+entity[0]["imgName"]+".png");
		//$("select[name='micID']").val(entity[0]["x"]);
		//$("select[name='onSeat']").val(entity[0]["x"]);
		$("select[name='x']").val(entity[0]["x"]);
		$("select[name='y']").val(entity[0]["y"]);
		$("select[name='w']").val(entity[0]["w"]);
		$("select[name='h']").val(entity[0]["h"]);
		$("select[name='direction']").val(entity[0]["direction"]);
	};

	return {
		init: init
	};
};


$(function(){
	var app = new ManualDirector();
	app.init();
});