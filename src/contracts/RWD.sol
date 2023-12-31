// SPDX-License-Identifier: MIT 
pragma solidity >=0.4.22 <0.9.0;

contract RWD { 
    string public name  = 'Reward Token';
    string public symbol = 'RWD';
    uint256 totalSupply = 1000000000000000000000000; // 1 million
    uint8 public decimals = 18;

    event Tranfer(
        address indexed _from,
        address indexed _to,
        uint _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping(address =>uint256) public balanceOf;
    mapping(address => mapping(address =>uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address _to, uint256 _value) public returns(bool) {
        require(balanceOf[msg.sender] >= _value, 'Insuffecient funds');
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Tranfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    } 

    function tranferFrom(address _from, address _to, uint256 _value ) public returns(bool) {
        require(balanceOf[_from] >= _value, 'from has Insuffecient funds');
        require(allowance[_from][msg.sender] >= _value, 'allowancer has Insuffecient funds');
        // require(balanceOf[msg.sender] >= _value, 'Insuffecient funds');
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[msg.sender][_from] -= _value;
        emit Tranfer(_from, _to, _value);
        return true;
    }
}