// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FreelanceEscrow {
    address public client;
    address public freelancer;
    uint256 public jobAmount;
    bool public clientApproved;
    bool public freelancerApproved;
    bool public isFunded;

    event FreelancerApproval(address freelancer);
    event ClientApproval(address client);

    constructor(address _freelancer) payable {
        client = msg.sender;
        freelancer = _freelancer;
        jobAmount = msg.value;
        isFunded = true;
    }

    modifier onlyClient() {
        require(msg.sender == client, "Only client can call this");
        _;
    }

    modifier onlyFreelancer() {
        require(msg.sender == freelancer, "Only freelancer can call this");
        _;
    }

    function approveJob(address freelancerAddress, address clientAddress) external {
        require(isFunded, "Job not funded");
        if (msg.sender == client) {
            clientApproved = true;
        } else if (msg.sender == freelancer) {
            freelancerApproved = true;
        } else {
            revert("Not authorized");
        }

        if (clientApproved && freelancerApproved) {
            releasePayment();
        } else if (clientApproved && !freelancerApproved) {
            emit ClientApproval(clientAddress);
        } else if (!clientApproved && freelancerApproved) {
            emit FreelancerApproval(freelancerAddress);
        }
    }

    function releasePayment() internal {
        require(address(this).balance >= jobAmount, "Insufficient funds");
        payable(freelancer).transfer(jobAmount);
        isFunded = false;
    }

    function cancelAndRefund() external onlyClient {
        require(!clientApproved && !freelancerApproved, "Cannot cancel after approval");
        payable(client).transfer(address(this).balance);
        isFunded = false;
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
