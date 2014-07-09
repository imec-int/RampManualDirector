var ManualDirector = function (options){

	var activeRuleNumber = 0;
	var activeRuleOptions = "";

	var init = function (){
		addHandlers();

	};

	var addHandlers = function (){
		$(".shopItem").on('click', function(){
          $("#topView")
        });

	};

	return {
		init: init
	};
};


$(function(){
	var app = new ManualDirector();
	app.init();
});