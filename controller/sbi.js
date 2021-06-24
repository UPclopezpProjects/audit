//var mongoose = require('mongoose');
var axios = require('axios');
var error = require("../controller/errResulUtils");
var result = require("../controller/errResulUtils");
//var Token = require("../controller/token");
var initializer = {};

var blockchainAddress = "ws://host.docker.internal:7545";

function timeStamp(){
	var today = new Date();
	dateC=today.toISOString();
	return dateC;
}


function getContractObject(contractNameSol){
	var compiler = require('solc');
	const fs = require('fs');
	const userSol = contractNameSol;
	sourceCode = fs.readFileSync(userSol, 'UTF8').toString();
	const path = require('path');
	const solc = require('solc');
	const roo = path.resolve('', '', userSol);
	//console.log(roo);
	const source = fs.readFileSync(roo, 'UTF-8');
	var input = {
	    language: 'Solidity',
	    sources: {
	        userSol : {
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
	//console.log(compiledCode);
	return compiledCode.contracts;
}

//save user in the smart contract
function createSC(req,fn){
	console.log("OK");
	var receiptG;
	contracts = getContractObject('UserEvents.sol');
	avoContract = contracts.userSol.User.abi; //it depends of the Contract name
	byteCodeRoot = contracts.userSol.User.evm.bytecode.object; //it depends of the Contract name

	sA = req.body.S;
	keyF = req.body.keyF;
	key = req.body.key; //obtaining public key account
	data = req.body.data; //obtaining public key account
	tuA = req.body.Tu;
	nuA = req.body.Nu;
	toA = req.body.To;
	//console.log(address);
	var resultado = 0;
	try{
		var Web3 = require('web3');
		var web3 = new Web3(Web3.givenProvider || blockchainAddress);
		userContract = new web3.eth.Contract(avoContract);
    userContract.deploy({data: byteCodeRoot, arguments: [key, tuA,nuA,sA,toA,data]}).send({from: keyF, gas: 4700000
	    	}, function(err, transactionHash){
	    		if(err){
	    			console.log("Entré pero hay error");
        			receiptG = "error";
							fn(receiptG);
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
	     }).on('error', function(error, receipt) {
	     		console.log(error);
				receiptG = "error";
				fn(receiptG);	    		
	     	});
	}catch(err){
		resultado = 60;
		receiptG = "error";
		fn(receiptG);
	}
}


//save root in the smart contract
function createRootSC(req,fn){
	console.log("OK");
	var receiptG;
	contracts = getContractObject('UserEvents.sol');
	avoContract = contracts.userSol.User.abi; //it depends of the Contract name
	byteCodeRoot = contracts.userSol.User.evm.bytecode.object; //it depends of the Contract name

	sA = req.body.S;
	tA = req.body.T;  
	keyR = req.body.keyR;
	data = req.body.data; //obtaining public key account
	tuA = req.body.Tu;
	toA = req.body.To;
	var resultado = 0;
	try{
		var Web3 = require('web3');
		var web3 = new Web3(Web3.givenProvider || blockchainAddress);
		userContract = new web3.eth.Contract(avoContract);
    	userContract.deploy({data: byteCodeRoot, arguments: [keyR, tuA,sA,tA,toA,data]}).send({from: keyR, gas: 4700000
	    	}, function(err, transactionHash){
	    		if(err){
	    			console.log("Entré pero hay error");
        			receiptG = "error";
							fn(receiptG);
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
	     }).on('error', function(error, receipt) {
	     		console.log(error);
				receiptG = "error";
				fn(receiptG);	    		
	     	});
	}catch(err){
		resultado = 60;
		receiptG = "error";
		fn(receiptG);
	}
}



initializer.findLog=function(req,fn){

	contracts = getContractObject('UserEvents.sol');
	avoContract = contracts.userSol.User.abi; //it depends of the Contract name
	byteCodeRoot = contracts.userSol.User.evm.bytecode.object; //it depends of the Contract name

	var Web3 = require('web3');
	var web3 = new Web3(Web3.givenProvider || blockchainAddress);

	var addCon 	= req.body.Asc; //'0x4455C1E35e73323b4Ca3B8124FF37A798A1188cF';
	var addTran = req.body.Atr; //'0x48705215cf5170baaebd6d8ef84482350023bfa6b8e428b5bc6f9028f3cb0dd7';
	userContract = new web3.eth.Contract(avoContract,addCon);
	// Working pero regresa todos los logs
	var allEvents=[];
	userContract.getPastEvents('Bitacora',{fromBlock: 0, toBlock:'latest'}, function(error, listEvents){ 
			console.log(listEvents); 
			allEvents = listEvents;
			var entro = false;
			allEvents.forEach(logs => {
				if(logs.transactionHash==addTran){
					entro = true;
					console.log(logs);
					var resul = {
						token:req.body.token,
						log:logs
					};
					fn(resul);
					//break;
				}	
			});
			if(!entro){
				console.log("Log not found");
				var resul = {
					token:req.body.token,
					log:"Error: not found"
				};
				fn(resul);
			}
		});
		//--------------------
}

initializer.deployUser=function(req,fn){
	//It creates a smart contract
	var obj;
		createSC(req,function(resul){
			if(resul=="error"){
				y="Error";
				obj={
						To:req.body.To,
						Atr:y,
						Asc:y
					};
			}else{
				obj={
							To:req.body.To,
							Atr: resul.addTran,
							Asc: resul.addCont
						};
			}
			fn(obj);
		});

}

initializer.deploy=function(req,fn){
	//It creates a smart contract
	var obj;
		createRootSC(req,function(resul){
			if(resul=="error"){
				y="Error";
				obj={
						To:req.body.To,
						Atr:y,
						Asc:y
					};
			}else{
				obj={
							To:req.body.To,
							Atr: resul.addTran,
							Asc: resul.addCont
						};
			}
			fn(obj);
		});

}


function addingEventSC(req,fn){
	console.log("OK: adding Event");
	var receiptG;
	contracts = getContractObject('UserEvents.sol');
	avoContract = contracts.userSol.User.abi; //it depends of the Contract name
	byteCodeRoot = contracts.userSol.User.evm.bytecode.object; //it depends of the Contract name

	var addCon  = req.body.Asc;
	var typeEvent = req.body.typeEvent;
	var source = 	req.body.source;
	var target = 	req.body.target;	
	var token = 	req.body.token;
	var eventDescription = 	req.body.eventDescription;
	var key = req.body.key;

	try{
		var Web3 = require('web3');
		var web3 = new Web3(Web3.givenProvider || blockchainAddress);
		userContract = new web3.eth.Contract(avoContract,addCon);
		//userContract = new web3.eth.Contract(avoContract);

		userContract.methods.addEvent(typeEvent,source,target, token,eventDescription).send({from: key})
	    	.on('receipt', function(receipt){
    			console.log(receipt);
    			var y={
					addTran:receipt.transactionHash,
					addCont:addCon
				};
	     		receiptG = y;
	     		console.log(receiptG);
	     		fn(receiptG);
	     	}).on('error', function(error, receipt) {
	     		console.log(error);
				receiptG = "error";
				fn(receiptG);	    		
	     	});
	}catch(err){
		console.log(err);
		receiptG = "error";
		fn(receiptG);
	}
}

function addingAccountSC(req,fn){
	console.log("OK: adding Account");
	var receiptG;
	contracts = getContractObject('EtherOp.sol');
	avoContract = contracts.userSol.User.abi; //it depends of the Contract name
	byteCodeRoot = contracts.userSol.User.evm.bytecode.object; //it depends of the Contract name

	var addCon  = req.body.Asc;
	var typeEvent = req.body.typeEvent;
	var source = 	req.body.source;
	var token = 	req.body.token;
	var eventDescription = 	req.body.eventDescription;
	var key = req.body.key;

	try{
		var Web3 = require('web3');
		var web3 = new Web3(Web3.givenProvider || blockchainAddress);
		userContract = new web3.eth.Contract(avoContract,addCon);
		//userContract = new web3.eth.Contract(avoContract);

		userContract.methods.addEvent(typeEvent,source,token,eventDescription).send({from: key})
	    	.on('receipt', function(receipt){
    			console.log(receipt);
    			var y={
					addTran:receipt.transactionHash,
					addCont:addCon
				};
	     		receiptG = y;
	     		console.log(receiptG);
	     		fn(receiptG);
	     	}).on('error', function(error, receipt) {
	     		console.log(error);
				receiptG = "error";
				fn(receiptG);	    		
	     	});
	}catch(err){
		console.log(err);
		receiptG = "error";
		fn(receiptG);
	}
}

initializer.addEvent=function(req,fn){
	var obj;
		addingEventSC(req,function(resul){
			if(resul=="error"){
				y="Error";
				obj={
						token:req.body.token,
						Atr:y,
						Asc:y
					};
			}else{
				obj={
							token:req.body.token,
							Atr: resul.addTran,
							Asc: resul.addCont
						};
			}
			fn(obj);
		});

}


initializer.addAccount=function(req,fn){
	var obj;
		addingAccountSC(req,function(resul){
			if(resul=="error"){
				y="Error";
				obj={
						token:req.body.token,
						Atr: y,
						Asc: y,
						pubKey: y,
						privKey: y
					};
			}else{
				obj={
							token:req.body.token,
							Atr: resul.addTran,
							Asc: resul.addCont,
							pubKey: resul.pubKey,
							privKey:resul.privKey
						};
			}
			fn(obj);
		});

}


module.exports = initializer;
