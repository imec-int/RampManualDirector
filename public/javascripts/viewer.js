var ManualDirector = function (options){

	var activeRuleNumber = 0;
	var activeRuleOptions = "";

	var activeEntity;


	var init = function (){
		generateScene();
		addHandlers();
	};

	var addHandlers = function (){
		$("ramp-entity").on('mouseup', handleActive);
		// mag deze weg? http://stackoverflow.com/questions/8503453/click-event-called-twice-on-touchend-in-ipad
		// niet getest op echte iPad
		// $("ramp-entity").on('touchend', handleActive);
	};

	var generateScene = function(){
		this.scene = roomConfig;
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

	var handleActive = function(event){
		event.preventDefault();
		// wordt automatisch gereflecteerd in DOM
		if(!this.active) this.active = true;
		else this.active = false;
		$.post('/entity/' + this.micId, {active: this.active}, function(data){console.log(data);});

	}

	var sceneToJSON = function(){
		var entities = [$("ramp-entity").length];
		$("ramp-entity").each(function(index,ent){
			entities[index] = {
				"type": ent["type"],
				"micId": ent["micId"],
				"active": ent["active"],
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