// SPDX-License-Identifier: MIT 
pragma solidity >=0.4.22 <0.9.0;

import './RWD.sol';
import './Teather.sol';

contract DecentralBank { 

    string public name = "Decentral Bank";
    address public owner;
    Teather public teather;
    RWD public rwd;

    constructor(RWD _rwd, Teather _teather) public {
        rwd = _rwd;
        teather = _teather;
    }

}