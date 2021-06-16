var sbi = require("../controller/sbi");
var error = require("../controller/errResulUtils");

var initializer = {};

initializer.default = function (req, res){
	var obj = {
		output: "This is not available yet"
	};
	res.send(obj);
}

/*
initializer.storing = function (req, res){
	var token=req.query.token;
	var hash=req.query.hash;
	var typeTransaction=req.query.typeTransaction;
	var obj={body:{token:token,
					hash:hash,
					typeTransaction:typeTransaction
				  }
			};
	res.send(obj);

}
*/
/*
initializer.createUser = function (req, res){
	res.send("Proof");
}*/

initializer.createUser = function (req, res){
	var S = req.body.source;
	var keyF=req.body.keyF;
	var key=req.body.key;
	var data = req.body.data;
	var Tu = req.body.Tu;
	var Nu = req.body.Nu;
	var To = req.body.To;
	var obj={body:
						{
							S:S,
							keyF:keyF,
							key:key,
							data:data,
							Tu:Tu,
							Nu:Nu,
							To:To
						}
			};
			sbi.deploy(obj,function(resul){
				res.send(resul);
			});
}


initializer.getLog = function (req, res){
	var Atr = req.body.Atr;
	var Acs = req.body.Acs;
	var token=req.body.token;
	var obj={body:
						{
							Atr:Atr,
							Acs:Acs,
							token:token
						}
			};
	console.log(obj)		
	sbi.findLog(obj,function(resul){
				res.send(resul);
	});
}

initializer.addEvent = function (req, res){
	var typeEvent = req.body.typeEvent;
	var source = req.body.source;
	var token = req.body.token;
	var eventDescription=req.body.eventDescription;
	var Asc=req.body.Asc;
	var key=req.body.key;

	var obj={body:
						{
							typeEvent:typeEvent,	
							source:source,
							token:token,
							eventDescription:eventDescription,
							Asc:Asc,
							key:key
						}
			};
	console.log(obj)		
			sbi.addEvent(obj,function(resul){
				res.send(resul);
			});
}


module.exports = initializer;
