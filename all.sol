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
    address father; //father address
    mapping (address=> bool) exists; // existing resources
    mapping (Resource => Resource) resources;
    Bitacora bitacora; // user's bitacora
    //public methods
    constructor(address nuser_) public{
        user = nuser_; //assigning who is the new user
        father = msg.sender; //assigning who is the father
    /*    userStruct memory nuserS = userStruct(nuser_,"Admor",nuser_);
        users[nuser_] = nuserS; */
        string memory log = "Creating user";
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
}



contract Admor{
    //privates
    address admor;  //user address
    address father; //father address
    mapping (address=> bool) exists; // existing users
    struct userStruct{
        address userSC;
        string  tUser;
        address scAddress;  //creator
    }
    mapping (address => userStruct) users;
    Bitacora bitacora; // Admor's bitacora
    //public methods
    constructor(address nuser_) public{
        admor = nuser_; //assigning who is the new user
        father = msg.sender; //assigning who the father
        userStruct memory nuserS = userStruct(nuser_,"Admor",nuser_);
        users[nuser_] = nuserS;
        string memory log = "Creating admor";
        bitacora = new Bitacora(log);
        exists[admor] = true; // user is added to the set of users
    }
    function addUser(address userKey) public returns(address){
        require(msg.sender == admor); //only admor can execute this function
        require(exists[userKey]==false); // the user must not exist
        User userN = new User(userKey);
        address userAddress = userN.getOwner();
        userStruct memory nuserS = userStruct(userKey,"TUser",userAddress);
        users[userKey] = nuserS;
        string memory log = "Creating user";
        bitacora.addLog(log);
        return userAddress;
    }
    function addAdmor(address admorKey, address scAddress) public returns(address){
        require(msg.sender == admor); //only an admor can execute this function
        require(exists[admorKey]==false); // the user must not exist
        userStruct memory newAdmor = userStruct(admorKey,"Admor",scAddress);
        users[admorKey] = newAdmor;
        string memory log = "Creating admor";
        bitacora.addLog(log);
        return admorKey;
    }
    function getBitacora() public view returns(Bitacora){
        require(msg.sender == admor); //only the owner can execute this function
        return (bitacora);
    }
}

contract Root{
    //privates
    address root;  //root address
    Bitacora bitacora; //Declaring bitacora objet
    mapping (Admor=> Admor) admors; // set of admors
    mapping (address=> bool) exists; // existing users
    //array tree of the users created by root
    //event CreateUser(address creator, User newUser);

    //public methods
    constructor() public{
        root = msg.sender; //when the smart contract is created, root also
        exists[root] = true; // root is added to the set of users
        string memory log = "Creating root";
        bitacora = new Bitacora(log);
    }

    function addAdmor(address userKey) public{
        require(msg.sender == root); //only root can execute this function
        require(exists[userKey]==false); // the user must not exist
        Admor admorN = new Admor(userKey);
        admors[admorN] = admorN;  //adding a new admor
        string memory log = "Creating admor";
        bitacora.addLog(log);
    }
    function getBitacora() public view returns(Bitacora){
        require(msg.sender == root); //only the owner can execute this function
        return (bitacora);
    }
}
