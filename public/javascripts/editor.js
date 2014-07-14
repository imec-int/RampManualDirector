var ManualDirectorEditor = function (options){

	var activeRuleNumber = 0;
	var activeRuleOptions = "";

	var activeEntity;

	var init = function (){
		addHandlers();

	};

	var addHandlers = function (){
		$("ramp-shop-entity").on('click', function(){
			//console.log($(this).attr("type"));
        	$("#topView").append("<ramp-entity type='"+$(this).attr("type")+"' x='0' y='0' direction='down' editable='true'></ramp-entity>");
        	$("ramp-entity").last().on('mouseup', checkDirections);
        	$("ramp-entity").last().on('touchend', checkDirections);
        	$("ramp-entity").last().on('mouseup', handleActive);
        	$("ramp-entity").last().on('touchend', handleActive);
        });

        $("ramp-entity").on('mouseup', handleActive);
        $("ramp-entity").on('touchend', handleActive);

        // $("ramp-entity").on('mouseup', checkDirections);
        // $("ramp-entity").on('touchend', checkDirections);

        $(".propertyPane select").change( syncEntityProperties);
        $(".propertyPane #remove").on('click', removeEntity);

        $(".syncButton").click(function(event){
        	$(".syncButton").css({ opacity: 0.5 });
        	var scene = sceneToJSON();
        	$.ajax({
				url: '/configuration',
				type: 'POST',
				contentType:'application/json',
				data: JSON.stringify(scene),
				// dataType:'json',
				success: function(data){
					$(".syncButton").css({ opacity: 1 });
					// console.log(data);
				}
			});

        });
	};

	var checkDirections = function(event){
		event.preventDefault();
		//tables
		var table = $("ramp-entity[type='table']").first();

		//console.log($(this));

		$(this).attr("direction",entityPosToTable($(this),table));
	};

	var handleActive = function(event){
		event.preventDefault();
		if(activeEntity)
    		activeEntity["active"]=false;

		if(activeEntity != this){
    		activeEntity = this;
        	this["active"]=true;
        	showProperties(this);
        	$(".propertyPane #propForm").show();
        	$(".propertyPane #propMessage").hide();
    	}else{
    		activeEntity = null;
    		$(".propertyPane #propForm").hide();
    		$(".propertyPane #propMessage").show();
    	}
    	checkDirections(event);
    	// not necessary to keep track of this continuously
    	// sceneToJSON();
	};

	var removeEntity = function(event){
		if(activeEntity)
    		$(activeEntity).remove();
    	activeEntity = null;
    	$(".propertyPane #propForm").hide();
    	$(".propertyPane #propMessage").show();
	}

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

		return "down";
	}

	var showProperties = function(entity){
		$(".typeTitle").text(entity["type"]);
		$(".propertyPane img").attr("src", "images/"+entity["imgName"]+".png");
		$("select[name='micID']").val(entity["micId"]);
		$("select[name='onSeat']").val(""+entity["onSeat"]);
		$("select[name='x']").val(entity["x"]);
		$("select[name='y']").val(entity["y"]);
		$("select[name='w']").val(entity["w"]);
		$("select[name='h']").val(entity["h"]);
		$("select[name='direction']").val(entity["direction"]);
	};

	var syncEntityProperties = function(event){
		if(activeEntity){
			activeEntity[$(this).attr("name")] = $(this).val();
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
		return scene;
	}


	return {
		init: init
	};
};


$(function(){
	var app = new ManualDirectorEditor();
	app.init();
});