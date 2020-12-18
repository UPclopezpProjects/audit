pragma solidity ^0.6.12;
// SPDX-License-Identifier: jclopezpimentel
contract Bitacora{
    uint idEvent;
    address owner; //it denotes who has generated the log
    struct LogS{
        uint when; //when the log is arisen
        string data; //data description about the log
    }
    //privates
    mapping (uint => LogS) bitacora; // Root's bitacora

    //public methods
    constructor(string memory data) public{
        owner = msg.sender;
        idEvent = 0;  // it is ready to start a bitacora index
        addNewLog(data); //adging a new log
    }

    function addNewLog(string memory data) private{
        uint now_ = block.timestamp;
        LogS memory log =  LogS(now_,data);
        bitacora[idEvent] = log; //adding a new log in the bitacora
        idEvent++; //ready for a new log
    }

    function addLog(string memory data) public{
        require(msg.sender == owner); //only the owner can execute this function
        addNewLog(data);
    }
    function getNLogs() public view returns (uint){
        return idEvent;
    }
    function getData(uint index_) public view returns(string memory){
        require(msg.sender == owner); //only the owner can execute this function
        require(index_ > 0 && index_<idEvent);
        return (bitacora[index_].data);
    }
    function getWhen(uint index_) public view returns(uint){
        require(msg.sender == owner); //only the owner can execute this function
        require(index_ > 0 && index_<idEvent);
        return (bitacora[index_].when);
    }

}
