//SPDX-License-Identifier: GPL
pragma solidity ^0.8.8;
/**
* @dev interface for Chariable contract
 */
interface ICharitable {
    event Donation(address indexed donor, uint256 amount);
    event Withdrawal(address indexed to, uint256 amount);
    function donate() external payable;
    function withdraw(address payable to, uint256 amount) external;
}
