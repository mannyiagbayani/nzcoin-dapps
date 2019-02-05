pragma solidity ^0.5.0;

import "./NZToken.sol";
import "./SafeMath.sol";

contract NZcoinTokenSale {
    NZToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokenSold;
    address owner;

    event Sell(address indexed _buyer, uint indexed _amount, uint indexed _noOfTokens);

    constructor(NZToken _tokenContract, uint256 _tokenPrice) public {
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
        owner = msg.sender;
    }


    function buyTokens(uint _numberOfTokens) public payable {
        //value should be equal to the price of number of tokens
        require(msg.value == SafeMath.mul(_numberOfTokens,tokenPrice),"buyTokens error. Possible overflow");

        //has enough number of tokens ready to be sold
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens,"buyTokens error. Remaining tokens is not enough for selling");

        //track to tokens sold
        tokenSold += _numberOfTokens;

        //emit events
        emit Sell(msg.sender, msg.value, _numberOfTokens);

        //transfer
        require(tokenContract.transfer(msg.sender,_numberOfTokens),"buyTokens error. Transfer failed");
    }

    function endSale() public {
        require(msg.sender == owner, "endSale error. Only the owner of the contract can call this method");
        require(tokenContract.transfer(owner, tokenContract.balanceOf(address(this))),"endSale error. Transfer failed");
    }

    
}

