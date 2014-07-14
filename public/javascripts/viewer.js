var ManualDirector = function (options){

	var activeRuleNumber = 0;
	var activeRuleOptions = "";

	var activeEntity;
	var scene = {};

	var init = function (){
		addHandlers();

	};

	var addHandlers = function (){
		// $("ramp-entity").on('mouseup', handleActive);
  //       $("ramp-entity").on('touchend', handleActive);


	};

	var generateScene = function(){

	});

	var sceneToJSON = function(){
		var entities = [$("ramp-entity").length];
		$("ramp-entity").each(function(index,ent){
			entities[index] = {
				"type": ent["type"],
				"micId": ent["micId"],
				"x": ent["x"],
				"y": ent["y"],
				"w": ent["w"],
				"h": ent["h"],
				"direction": ent["direction"],
				"onSeat": ent["onSeat"]
			}
		});
		var scene = {"scene":"DirectorQ", "entities": entities};
		//console.log(JSON.stringify(scene));
	}


	return {
		init: init
	};
};


$(function(){
	var app = new ManualDirector();
	app.init();
});