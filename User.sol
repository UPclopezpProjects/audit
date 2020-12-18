pragma solidity ^0.6.12;
import "Bitacora.sol";
import "User.sol";
// SPDX-License-Identifier: jclopezpimentel
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
