var express = require('express');
var router = express.Router();
var serverUrl = require('../config').serverUrl;
var httpreq = require('httpreq');

var currentRoomConfig = {"scene":"DirectorQ","entities":[{"type":"table","micId":"NA","x":2,"y":2,"w":5,"h":3,"direction":"down","onSeat":false},{"type":"member","micId":1,"x":3,"y":1,"w":1,"h":1,"direction":"down","onSeat":false},{"type":"member","micId":1,"x":4,"y":1,"w":1,"h":1,"direction":"down","onSeat":false},{"type":"member","micId":1,"x":5,"y":1,"w":1,"h":1,"direction":"down","onSeat":false}]};

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

/* POST trigger to the Trigger Consolidation Secret Command Center */
//router.post(.......

module.exports = router;
