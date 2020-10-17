//var mongoose = require('mongoose');
var error = require("../controller/errResulUtils");
var result = require("../controller/errResulUtils");
//var Token = require("../controller/token");
var initializer = {};

var blockchainAddress = "ws://host.docker.internal:7545";



/*
initializer.getAddContrR = function (par,resp) {
	var r=result.someFieldIsEmpty(par);	
	if (r==0){
		var tok=par.body.token;
		Token.whoP(tok,function(answer){
			if(answer.email==""){
				resp.send(error.jsonRespError(70));
			}else{
					User.find({status:statusV.rootCreation}).exec(function(err, users){
						if(err){
							resp.send(error.jsonRespError(50));
						}
				        if(users.length>0 && users.length<2){ 
				        	if(answer.email==users[0].email){ //we check that the token match with the root
				        		res = users[0].addressContract;
			        			resp.send(result.jsonRespOK(2,res));
		        			}else{
	        					resp.send(error.jsonRespError(4));
	        				}
				        }else{			
							resp.send(error.jsonRespError(100));
				        } 
				    });
			}
		});
	}else{
		res.send(error.jsonRespError(r));
	}
}
*/


/*
initializer.getAddTransR = function (par,resp) {	
	var r=result.someFieldIsEmpty(par);	
	if (r==0){
		var tok=par.body.token;
		Token.whoP(tok,function(answer){
			if(answer.email==""){
				res.send(error.jsonRespError(70));
			}else{
					User.find({status:statusV.rootCreation}).exec(function(err, users){
						if(err){
							resp.send(error.jsonRespError(50));
						}
				        if(users.length>0 && users.length<2){ 
				        	if(answer.email==users[0].email){ //we check that the token match with the root
				        		res = users[0].addressTransaction;
			        			resp.send(result.jsonRespOK(3,res));
		        			}else{
	        					resp.send(error.jsonRespError(4));
	        				}
				        }else{			
							resp.send(error.jsonRespError(100));
				        } 
				    });
			}
		});
	}else{
		res.send(error.jsonRespError(r));
	}
}
*/


//save root in the smart contract
function createRootSC(req,fn){
	//rootCreation involves create root in database and create a smart contract
	//recepitG is a json that includes  all data about the root transaction
	console.log("Ya entré");
	var receiptG;
	compiler = require('solc');
	const fs = require('fs'); 
	const rootSol = 'RootSC.sol';
	sourceCode = fs.readFileSync(rootSol, 'UTF8').toString();
	const path = require('path');	
	const solc = require('solc');
	const veh = path.resolve('', '', rootSol);
	const source = fs.readFileSync(veh, 'UTF-8');
	
	var input = {
	    language: 'Solidity',
	    sources: {
	        rootSol : {
	            content: source
	        }
	    },
	    settings: {
	        outputSelection: {
	            '*': {
	                '*': [ '*' ]
	            }
	        }
	    }
	}; 
	compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));
	contracts = compiledCode.contracts;
	avoContract = contracts.rootSol.RootSC.abi; //it depends of the Contract name
	byteCodeVeh = contracts.rootSol.RootSC.evm.bytecode.object; //it depends of the Contract name

	address = req.body.key; //obtaining public key account
	var resultado = 0;
	try{
		var Web3 = require('web3');
		var web3 = new Web3(Web3.givenProvider || blockchainAddress);

		rootContract = new web3.eth.Contract(avoContract);
	    rootContract.deploy({data: byteCodeVeh}).send({from: address, gas: 4700000
	    	}, function(err, transactionHash){
	    		if(err){
	    			console.log("Entré pero hay error");
        			receiptG = "error";
	    		}
	    	})
	    	.on('receipt', function(receipt){
    			console.log("Entré no hay error");
    			var y={
					addTran:receipt.transactionHash,
					addCont:receipt.contractAddress
				};				
	     		receiptG = y;
	     		console.log(receiptG);
	     		fn(receiptG);
	     }).on('error', console.error); 
	}catch(err){
		resultado = 60;
		receiptG = "error";
		fn(receiptG);
	}
}

//Falta implementarla correctamente
function hasAccess(token,typeOfOperation){
	//Verifies in users microservice if Token has enough permitions
	return true;
}


function audit(X,y,res){
	var r=hasAccess(X.body.Token,X.body.typeOfOperation);

	//Create an audit smart contract
		tr = 1;
	//******************************
	var obj={
			Tr:tr,
			Token:X.body.Token,
			y:y
		};
	res.send(obj);
}

//Falta implementarla correctamente
function permit(){
	//Checar servicio en microservicios Users
	return 1;
}


function timeStamp(){
	var today = new Date();
	dateC=today.toISOString();
	return dateC;
}

initializer.createRoot=function(req,res){
	//Create the root smart contract
	var y,r=0;
	createRootSC(req,function(resul){
		if(resul=="error"){
			y="error";
			r=60;
		}else{
			y=resul;
		}
		//Hacer un deploy para guardar los demás datos en la parte de auditoría
		var X = req;
		audit(X,y,res);
		r=0;
	});
	return r;
}


/*
initializer.Storing=function(req,res){
	//We evaluate if some of the parameters are empty
	//In case, return 10, it indicates an error	
	var r=result.someFieldIsEmpty(req);
	if (r==0){ //0 means not fields are empty
		var u = req.body.token;
		var h = req.body.hash;
		var t = req.body.typeTransaction;		
		var TS = timeStamp();
		var id = permit(u,t);
		//var Tr = audit(u,h,t,TS,id);
		var resp ={
			token: u,
			T: TS,
			id:id,
			Tr:Tr};
			res.send(resp);
		return resp;
	}else{
		return (r);
	}
}
*/

/*
function createAdmorSC(req,res){
	//createAdmorSC involves create Admor in database and add it within the root knowledge
	compiler = require('solc');
	const fs = require('fs'); 
	const rootSol = 'RootSC.sol';
	sourceCode = fs.readFileSync(rootSol, 'UTF8').toString();
	const path = require('path');	
	const solc = require('solc');
	const veh = path.resolve('', '', rootSol);
	const source = fs.readFileSync(veh, 'UTF-8');
	
	var input = {
	    language: 'Solidity',
	    sources: {
	        rootSol : {
	            content: source
	        }
	    },
	    settings: {
	        outputSelection: {
	            '*': {
	                '*': [ '*' ]
	            }
	        }
	    }
	}; 
	compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));
	contracts = compiledCode.contracts;
	rContract = contracts.rootSol.RootSC.abi; //it depends of the Contract name
	byteCodeVeh = contracts.rootSol.RootSC.evm.bytecode.object; //it depends of the Contract name

	addressA = req.body.addressU; //obtain Administrator address
	addressR = req.body.addressR; //obtain root address
	addressContract = req.body.addressContract; //obtain Contract Address of the root

	var resultado = 0;
	try{
		var Web3 = require('web3');
		var web3 = new Web3(Web3.givenProvider || blockchainAddress);

		//Adding Administrator in the blockchain*******************************
		//Object rootContract is created from abi template and the contract address
		var rootContract = new web3.eth.Contract(rContract, addressContract);
		rootContract.methods.addAdmor(addressA).send({from: addressR,gas: 4700000}, 
			function(err, transactionHash){
	    		if(err){
        			res.send(error.jsonResp(60));
        			return 60;
	    		}
	    	})
	    	.on('receipt', function(receipt){
	     		receiptG = receipt;//Getting the receipt of the transaction
	     		User_.save(req,"No contract address in this transaction",receiptG.transactionHash,statusV.admorCreation,res,4); //add user to the database
	     		candado=true;
	     	}).on('error', console.error);
	     //*********************************************************************
	}catch(err){
		resultado = 60;
	}

    return resultado;
}
*/

/*
function getRegister(regS,tok,fn){		
		Token.whoP(tok,function(answer){
			if(answer.email==""){
				fn("");
			}else{
				regS.email = answer.email;
				User.find(regS).exec(function(err, users){
					if(err){
						fn("");
					}
			        if(users.length>0 && users.length<2){ 
			        	if(answer.email==users[0].email){ //we check that the token user match with the search
			        		res = users[0].addressContract;		        			
	        				var answerR = {	email:users[0].email,
			                    				addressU:users[0].addressU,
			                    				addressContract:users[0].addressContract,
							                    addressTransaction:users[0].addressTransaction,
			                    				status:users[0].status,
			                    				token:users[0].token};
		                    fn(answerR);
	        			}else{
	        					fn("");
        				}
			        }else{			
						fn("");
			        } 
			    });
			}
		});
}
*/

/*
//Create an administrator
initializer.AddAdmor=function(req,res){
	//We evaluate if some of the parameters are empty
	//In case, return an error	
	var r=result.someFieldIsEmpty(req);
	if (r==0){		
		//First, we must verify that token is linked with the root
		//To do tat, we are going to form an objet with the search
		var search = {email:"",
					  status:statusV.rootCreation};
		getRegister(search,req.body.token,function(resultado){
			if(resultado==""){
				res.send(error.jsonRespError(4)); //error code is sent as an answer
			}else{				
				//Avoid that an existence administrator can be duplicated in offchain
				var searchEmail = {email:req.body.email};
				User.find(searchEmail).exec(function(err, users){
					if(err || users.length>0){
						res.send(error.jsonRespError(20)); //error code is sent as an answer
					}else{
						var searchA = {addressU:req.body.addressU};
						User.find(searchA).exec(function(err, users){
							if(err || users.length>0){
								res.send(error.jsonRespError(21)); //error code is sent as an answer
							}else{
								//then we must obtain the root address
								req.body.addressR = resultado.addressU;
								//and the smart contract address
								req.body.addressContract = resultado.addressContract;
								//With all ingredients, we can create the AdmorSC
								var answer = createAdmorSC(req,res);
							}						
						});						
					}
				});
			}
		});
	}else{
		res.send(error.jsonRespError(r)); //error code is sent as an answer
	}
}
*/

initializer.createAdmor=function(req,res){
	var y={
					addTran:"Not implemented yet",
					addCont:"Not implemented yet"
	};
	var obj={
			Tr:"Not implemented yet",
			Token:req.body.Token,
			y:y
		};
	res.send(obj);
}

initializer.createTUser=function(req,res){
	var y={
					addTran:"Not implemented yet",
					addCont:"Not implemented yet"
	};
	var obj={
			Tr:"Not implemented yet",
			Token:req.body.Token,
			y:y
		};
	res.send(obj);
}


module.exports = initializer;