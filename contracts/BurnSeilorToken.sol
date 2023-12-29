// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract BurnSeilorToken is Pausable, AccessControl {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    ERC20Burnable public seilorToken;
    mapping(address => string) private userSeiAddress;
    mapping(address => uint256) private userBurnTotalAmount;


    event burnEvent(address indexed from, string seiAddress, uint256 value);

    constructor(address seilorAddress){
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        seilorToken = ERC20Burnable(seilorAddress);
    }
    function burn(uint256 amount, string calldata seiAddress) external whenNotPaused {
        require(amount > 0, "amount must > 0");
        seilorToken.transferFrom(msg.sender, address(this), amount);
        userSeiAddress[msg.sender] = seiAddress;
        userBurnTotalAmount[msg.sender] += amount;
        seilorToken.burn(amount);
        emit burnEvent(msg.sender, seiAddress, amount);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function getUserSeiAddress(address user) external view returns (string memory){
        return userSeiAddress[user];
    }

    function getUserBurnTotalAmount(address user) external view returns (uint256){
        return userBurnTotalAmount[user];
    }


}
