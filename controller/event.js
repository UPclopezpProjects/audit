var sbi = require("../controller/sbi");
var error = require("../controller/errResulUtils");

var initializer = {};

initializer.default = function (req, res){
	var obj = {
		output: "This is not available yet"
	};
	res.send(obj);
}


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
	/*
	var answerCode = sbi.Storing(obj,res);
	if(answerCode!=0){ 
		//it means that an error has happened
		//These erros are controlled when not callback functions are implemented yet 
		res.send(error.jsonRespError(answerCode)); //error code is sent as an answer
	}else{//it means that an error number 0 happened, it is out our reach
		//res.send("Answer:" + answerCode);
	}
	*/
}

initializer.createUser = function (req, res){
	var Token = req.body.Token;
	var key=req.body.key;
	var typeOfUser=req.body.typeOfUser;
	var typeOfOperation=req.body.typeOfOperation;
	var x1 = req.body.hashX;
	var obj={body:{key:key,
					typeOfUser:typeOfUser,
					x1:x1,
					Token:Token,
					typeOfOperation:typeOfOperation
				  }
			};
	//res.send(obj);
	console.log(typeOfUser);
	var answerCode;
	switch(typeOfUser){
		case "Root":
			answerCode = sbi.createRoot(obj,res);
			break;
		case "Administrator":
			answerCode = sbi.createAdmor(obj,res);
		case "TUser":
			answerCode = sbi.createTUser(obj,res);
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