// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

contract EtherOp {
    event Response(bool success, bytes data);

    function getBalance() public view returns(uint){
        //it gets the balance of the sender
        return msg.sender.balance;
    }

    function sendEther(address payable _to) public payable {
        // Call returns a boolean value indicating success or failure.
        (bool sent, bytes memory data) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
        emit Response(sent,data);
    }
}