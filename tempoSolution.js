	var receiptG;
	var compiler = require('solc');
	const fs = require('fs');
	const userSol = 'UserEvents.sol';
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
	console.log(compiledCode);

	contracts = compiledCode.contracts;
	avoContract = contracts.userSol.User.abi; //it depends of the Contract name
	byteCodeRoot = contracts.userSol.User.evm.bytecode.object; //it depends of the Contract name

	var Web3 = require('web3');
	var web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
	//var addCon = '0x5f117Aed493195239ff22737d39F5a8b559b4D89'; //con index
	var addCon = '0xA638CDB3d0cb4F55a6224D10e9Bb4F8ECebf158B'; //sin index
	userContract = new web3.eth.Contract(avoContract,addCon);



		// ---------------------------------
		var idE = 0;
		userContract.events.LogS({fromBlock: 0, toBlock:'latest'}, function(error, event){ console.log(event); })
			.on('data', function(eventLogS){
    			console.log(eventLogS); // same results as the optional callback above
			})
			.on("connected", function(eventLogS){
    			console.log(eventLogS);
			})
			.on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
			  	console.log("Error");
			});

		var even;
		userContract.events.LogS(function(error, event){ 
			console.log(event); 
			even = event;
		})


		
		var allEvents=[];
		userContract.getPastEvents('LogS',{filter:{idEvents:[0,1]},fromBlock: 0, toBlock:'latest'}, function(error, listEvents){ 
			console.log(listEvents); 
			allEvents = listEvents;
		});

		var allEvents=[];
		var idE = '0';
		userContract.getPastEvents('LogS',{filter:{idEvents:idE},fromBlock:0}, function(error, listEvents){ 
			console.log(listEvents); 
			allEvents = listEvents;
		});


		var allEvents=[];
		userContract.getPastEvents('LogS',{filter:{idEvents:0},fromBlock:0}, function(error, listEvents){ 
			console.log(listEvents); 
			allEvents = listEvents;
		});


		var allEvents;
		userContract.once('LogS', function(error, listEvents){ 
			console.log(listEvents); 
			allEvents = listEvents;
		});

		var allEvents=[];
		userContract.getPastEvents('LogS',{fromBlock: 62, toBlock:62}, function(error, listEvents){ 
			console.log(listEvents); 
			allEvents = listEvents;
		});


		// xzx---------------------------------


var allEvents=[];
		userContract.getPastEvents('LogS',{toBlock:'latest'}, function(error, listEvents){ 
			console.log(listEvents); 
			allEvents = listEvents;
		});

    	
	}catch(err){
		resultado = 60;
		receiptG = "error";
		fn(receiptG);
	}
