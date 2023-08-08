// SPDX-License-Identifier: MIT 
pragma solidity >=0.4.22 <0.9.0;

import './RWD.sol';
import './Teather.sol';

contract DecentralBank { 

    string public name = "Decentral Bank";
    address public owner;
    Teather public teather;
    RWD public rwd;
    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked;

    constructor(RWD _rwd, Teather _teather) public {
        rwd = _rwd;
        teather = _teather;
    }
     

     // staking function
    function depositTokens(uint _amount) public {
        // require staking amount is always greater than zero
        require(_amount > 0, "amount can't be zero");

        // tranmfer treather tokens to this contract address from staking
        teather.tranferFrom(msg.sender, address(this), _amount);
        // update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }
        // update staking balance
        isStaked[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

}