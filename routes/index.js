var express = require('express');
var router = express.Router();
var serverUrl = require('../config').serverUrl;
var configUrl = require('../config').configUrl;
var httpreq = require('httpreq');
var adapter = require('../adapter');

var currentRoomConfig = {"scene":"DirectorQ","entities":[]};

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Manual Director - Q' , roomConfig: JSON.stringify(currentRoomConfig)});

});

router.get('/editor', function(req, res) {
	res.render('editor', { title: 'Manual Director - Q' , roomConfig: null});

});

router.get('/dragtest', function(req, res) {
	res.render('dragtest', { title: 'Drag test'});
});

router.post('/configuration', function(req, res) {
	currentRoomConfig = req.body;
	// console.log(currentRoomConfig);
	var postBody = { "studioconfig": {}};
	if(currentRoomConfig.entities && currentRoomConfig.entities.length > 0){
		for(var i = 0; i < currentRoomConfig.entities.length; i++){
			postBody.studioconfig[currentRoomConfig.entities[i].description] = currentRoomConfig.entities[i].micId;
		}
	}
	console.log(postBody);
	httpreq.post(configUrl, {json: postBody}, function(err, resu){
		if(err){
			console.log(err);
			res.send(500);
		}
		else {
			console.log(resu);
			res.send(200);
		}
	});
});

/* POST trigger to the Trigger Consolidation Secret Command Center */
//router.post(.......
router.post('/entity/:entitid', function(req, res) {
	console.log(req.params.entitid);
	// convert string to bool
	var active = req.body.active === 'true';
	var transformedBody = adapter.televicMicrophone(req.params.entitid, active);
	// console.log(JSON.stringify(adapter.televicMicrophone(req.params.entitid, active)));
	httpreq.put(serverUrl, {json: transformedBody}, function (err, resu){
			if(err) {
				console.log(err);
				res.send(500);
			}
			else {
				// console.log(resu.body);
				res.send(200);
			}

		});

});

module.exports = router;
