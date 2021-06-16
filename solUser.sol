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


contract User{
    //privates
    address user;  //user address
    string typeUser;
    string nameUser;
    address father;// creator
    string source;
    string token;
    string data;
    bytes32 hash; //hash of all private attributes
    mapping (address=> bool) exists; // existing resources
    mapping (Resource => Resource) resources;
    Bitacora bitacora; // user's bitacora
    //public methods
    constructor(address _user, string memory _typeUser, string memory _nameUser, string memory _source, string memory _token, string memory _data) public{
        user = _user;//assigning who is the new user
        father = msg.sender; //assigning who is the creator
        if(father==user){
            typeUser = "Root";
        }else{
            typeUser = _typeUser;
        }
        nameUser = _nameUser;
        source = _source;
        token = _token;
        data = _data;
        bytes memory concatenate =abi.encodePacked(user,father,typeUser,source,token,data);
        hash = sha256(concatenate);
        string memory log = string(abi.encodePacked("{Creating user:",typeUser,",hash:",hash,"}"));
        bitacora = new Bitacora(log);
    }
    function getOwner() public view returns(address){
        return user;
    }
    function addResource(string memory resourceDescription) public{
        require(msg.sender == user); //only the user can execute this function
        Resource resource = new Resource(resourceDescription);
        //address  addResource = resource.getAddress(resource);
        resources[resource] = resource;
        string memory log = "Creating user";
        bitacora.addLog(log);
    }

    function getBitacora() public view returns(Bitacora){
        require(msg.sender == user); //only the owner can execute this function
        return (bitacora);
    }

    function getHash() public view returns(bytes32){
        return hash;
    }
    function getTypeUser() public view returns(string memory){
        return typeUser;
    }

}
