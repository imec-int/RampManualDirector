var express = require('express');
var router = express.Router();
var serverUrl = require('../config').serverUrl;
var httpreq = require('httpreq');

var currentRoomConfig = [];

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Manual Director - Q' , roomConfig: null});

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
