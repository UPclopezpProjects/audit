pragma solidity ^0.6.12;
// SPDX-License-Identifier: jclopezpimentel

contract User{
    //privates
    address user;  //user address
    string typeUser;
    string nameUser;
    address father;// creator
    uint idEvents;

    event Bitacora(
            uint idEvents,
            uint when, //When: the log is arisen, this is a timestamp
            string typeEvent, //How: type of event (GET, POST, PUT, DELETE)
            string where, //Where: the event was triggered
            string token, //Who: token used in this event
            string description //What: data description about the log
        );
    
    //public methods
    constructor(address _user, string memory _typeUser, string memory _nameUser, string memory _source, string memory _token, string memory _data) public{
        user = _user;//assigning who is the user
        father = msg.sender; //assigning who is the creator
        if(father==user){
            typeUser = "Root";
        }else{
            typeUser = _typeUser;
        }
        nameUser = _nameUser;
        idEvents = 0;
        uint now_ = block.timestamp;
        emit Bitacora(idEvents,now_,"POST",_source,_token,_data);
        idEvents++;
    }
   
    function bytes32ToString(bytes32 x) private pure returns (string memory) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (uint j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }

    function addressToString(address _address) private pure returns(string memory) {
       bytes32 _bytes = bytes32(uint256(_address));
       bytes memory HEX = "0123456789abcdef";
       bytes memory _string = new bytes(42);
       _string[0] = '0';
       _string[1] = 'x';
       for(uint i = 0; i < 20; i++) {
           _string[2+i*2] = HEX[uint8(_bytes[i + 12] >> 4)];
           _string[3+i*2] = HEX[uint8(_bytes[i + 12] & 0x0f)];
       }
       return string(_string);
    }    
    function getOwner() public view returns(address){
        return user;
    }
    function addEvent(string memory typeEvent, string memory _source, string memory _token, string memory eventDescription) public{ //returns(address){
        require(msg.sender == user); //only the user can execute this function
        bool c1=keccak256(abi.encodePacked((typeEvent)))==keccak256(abi.encodePacked(("GET")));
        bool c2=keccak256(abi.encodePacked((typeEvent)))==keccak256(abi.encodePacked(("PUT")));
        bool c3=keccak256(abi.encodePacked((typeEvent)))==keccak256(abi.encodePacked(("POST")));
        bool c4=keccak256(abi.encodePacked((typeEvent)))==keccak256(abi.encodePacked(("DELETE")));
        require(c1 || c2 || c3 || c4);
        uint now_ = block.timestamp;
        emit Bitacora(idEvents,now_,typeEvent,_source,_token,eventDescription);
        idEvents++;
    }
    
    function getTypeUser() public view returns(string memory){
        return typeUser;
    }

    function getNameUser() public view returns(string memory){
        return nameUser;
    }
    function getFather() public view returns(address){
        return father;
    }
    function getNumEvents() public view returns(uint){
        return idEvents;
    }
}