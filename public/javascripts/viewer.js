var ManualDirector = function (options){

	var activeRuleNumber = 0;
	var activeRuleOptions = "";

	var activeEntity;


	var init = function (){
		addHandlers();
		generateScene();
	};

	var addHandlers = function (){
		// $("ramp-entity").on('mouseup', handleActive);
  //       $("ramp-entity").on('touchend', handleActive);

  		this.scene = roomConfig;
  		//console.log(this.scene);
	};

	var generateScene = function(){
		console.log(this.scene);
		if(this.scene){
			var ent = null;
			for (var i = 0; i < this.scene.entities.length; i++) {
				ent = this.scene.entities[i];
				$("#topView").append("<ramp-entity type='"+ent.type+"' micId='"+ent.micId+"' x='"+ent.x+"' y='"+ent.y+"' w='"+ent.w+"' h='"+ent.h+"' direction='"+ent.direction+"' onSeat='"+ent.onSeat+"'></ramp-entity>");
			};
		}else{
			console.log("no scene detected");
		}
	};

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