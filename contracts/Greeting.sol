// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Greeting is Initializable {
    string private greeting;

    function initialize(string memory _greeting) external initializer {
        greeting = _greeting;
    }

    function greet() public view returns (string memory res) {
        res = greeting;
    }

    function greet2() public view returns (string memory res) {
        res = "Hello Kim";
    }

    function greet3() public view returns (string memory res) {
        res = "Hello Lee";
    }

    function greet4() public view returns (string memory res) {
        res = "Hello Choi";
    }


    function greet5() public view returns (string memory res) {
        res = "Hello Park";
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}
