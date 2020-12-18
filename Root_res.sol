pragma solidity ^0.6.12;
import "./Bitacora.sol";
import "./Admor.sol";
// SPDX-License-Identifier: jclopezpimentel
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
