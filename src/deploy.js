const { ethers } = require("hardhat");

async function deploy(amount, client, freelancer) {
    const Escrow = await ethers.getContractFactory("FreelanceEscrow", client);
    const escrow = await Escrow.deploy(freelancer.address, {
        value: ethers.parseEther(amount.toString())
    });
    await escrow.waitForDeployment();

    const contractAddress = await escrow.getAddress();
    console.log("Escrow Contract deployed to:", contractAddress);

    return { contractAddress };
}

module.exports = { deploy };
