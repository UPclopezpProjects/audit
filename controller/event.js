var sbi = require("../controller/sbi");
var error = require("../controller/errResulUtils");

var initializer = {};

initializer.storing = function (req, res){
	var token=req.query.token;
	var hash=req.query.hash;
	var typeTransaction=req.query.typeTransaction;
	var obj={body:{token:token,
					hash:hash,
					typeTransaction:typeTransaction
				  }
			};
	//res.send(obj);
	
	var answerCode = sbi.Storing(obj,res);
	if(answerCode!=0){ 
		//it means that an error has happened
		//These erros are controlled when not callback functions are implemented yet 
		res.send(error.jsonRespError(answerCode)); //error code is sent as an answer
	}else{//it means that an error number 0 happened, it is out our reach
		//res.send("Answer:" + answerCode);
	}
	
}

initializer.createUser = function (req, res){
	var key=req.query.key;
	var hash=req.query.hash;
	var typeOfUser=req.query.typeOfUser;
	var obj={body:{key:key,
					hash:hash,
					hash:hash,
					typeOfUser:typeOfUser
				  }
			};
	//res.send(obj);
	var answerCode;
	switch(typeOfUser){
		case "1":
			answerCode = sbi.createRoot(obj,res);
			break;
		default:
			answerCode = 31;
	}	
	
	if(answerCode!=0){ 
		//it means that an error has happened
		//These erros are controlled when not callback functions are implemented yet 
		res.send(error.jsonRespError(answerCode)); //error code is sent as an answer
	}else{//it means that an error number 0 happened, it is out our reach
		//res.send("Answer:" + answerCode);
	}
	
}



module.exports = initializer;