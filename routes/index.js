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
router.post('/exec/createRoot', event.createRoot); 
//Create users
router.post('/exec/createUser', event.createUser); 
//Add event
router.post('/exec/addEvent', event.addEvent); 
//Creat an account
router.post('/exec/addAccount', event.addAccount); 



//Looking for logs
router.get('/get/log', event.getLog);

module.exports = router;
