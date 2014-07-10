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
        	$("ramp-entity").on('mouseup', checkDirections);
        	$("ramp-entity").on('touchend', checkDirections);
        });
        //console.log($("ramp-entity").first());

        $("ramp-entity").on('mouseup', checkDirections);
        $("ramp-entity").on('touchend', checkDirections);

	};

	var checkDirections = function(event){
		//tables
		var table = $("ramp-entity[type='table']").first();

		console.log($(this));

		$(this).attr("direction",entityPosToTable($(this),table));

		//console.log(event);
		//console.log($(this).attr("x"));
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

	return {
		init: init
	};
};


$(function(){
	var app = new ManualDirector();
	app.init();
});