pragma solidity ^0.6.12;
import "Bitacora.sol";
// SPDX-License-Identifier: jclopezpimentel
contract Resource{
    uint idEvent;
    address owner; //it denotes who has generated the Resource
    uint deleted;
    Bitacora bitacora;
    struct ResourceS{
        string typeEvent; //post, get, put
        string description;
    }
    mapping (uint => ResourceS) resources;
    //public methods
    constructor(string memory description_) public{
        owner = msg.sender;
        idEvent = 0;  // it is ready to start a bitacora index
        string memory log = "Creating new Resource";
        bitacora = new Bitacora(log);
        string memory typeEvent = "POST";
        ResourceS memory resource = ResourceS(typeEvent,description_);
        resources[idEvent] = resource;
        idEvent++;
        deleted=0; // it means that the resource is created
    }

    function updateResource(string memory description_) public{
        require(msg.sender == owner); //only the owner can execute this function
        require(deleted==0);
        string memory typeEvent = "PUT";
        ResourceS memory resource = ResourceS(typeEvent,description_);
        resources[idEvent] = resource;
    }
    function deleteResource(string memory description_) public{
        updateResource(description_);
        deleted = 1;
    }

    function getNEvents() public view returns (uint){
        return idEvent;
    }
    function getResource(uint index_) public view returns(string memory){
        require(msg.sender == owner); //only the owner can execute this function
        require(index_ > 0 && index_<idEvent);
        return (resources[index_].description);
    }
    function getTypeEvent(uint index_) public view returns(string memory){
        require(msg.sender == owner); //only the owner can execute this function
        require(index_ > 0 && index_<idEvent);
        return (resources[index_].typeEvent);
    }

    function getBitacora() public view returns(Bitacora){
        require(msg.sender == owner); //only the owner can execute this function
        return (bitacora);
    }
}
