var express = require('express');
var router = express.Router();

var main = require('../controller/index.js');
//var modelRoot = require('../controller/modelRoot.js');
var event = require('../controller/event.js');
//var us = require('../controller/users.js');


//************************************************
//************************************************
//ROUTES FOR RESTFUL REQUESTS
//************************************************

//EVENT
router.get('/', event.default);
//router.post('/exec/storing', event.storing); 
//router.post('/exec/getAddContrR', event.getAddContrR);
//router.post('/exec/getAddTransR', event.getAddTransR);
//************************************************

//Create users
router.post('/exec/createUser', event.createUser); 


module.exports = router;



