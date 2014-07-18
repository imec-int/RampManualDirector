var express = require('express');
var router = express.Router();
var serverUrl = require('../config').serverUrl;
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
	console.log(currentRoomConfig);
	res.send(200);
});
/* POST trigger to the Trigger Consolidation Secret Command Center */
//router.post(.......
router.post('/entity/:entitid', function(req, res) {
	console.log(req.params.entitid);
	// convert string to bool
	var active = req.body.active === 'true';
	console.log(JSON.stringify(adapter.televicMicrophone(req.params.entitid, active)));
	// TODO: relay to mmlab
	res.send(200);
});

module.exports = router;
