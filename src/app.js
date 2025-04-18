const express = require("express");
const app = express();
const path = require("path");
const hre = require("hardhat");
const dotenv = require('dotenv');
dotenv.config();

const { deploy } = require('./deploy');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://0.0.0.0:${PORT}/`);
});

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname)));
app.use("/images", express.static(path.join(__dirname, "src/images")));

const PRIVATE_KEY_CLIENT = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const PRIVATE_KEY_FREELANCER = "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d";

const provider = new hre.ethers.JsonRpcProvider("http://127.0.0.1:8545");
const walletClient = new hre.ethers.Wallet(PRIVATE_KEY_CLIENT, provider);
const walletFreelancer = new hre.ethers.Wallet(PRIVATE_KEY_FREELANCER, provider);

let contractAddress = "";
let currentStep = 1;
const contractAbi = require("../artifacts/contracts/FreelanceEscrow.sol/FreelanceEscrow.json").abi;

// async function mintTokens(userAddress, amount) {
//     const tx = await tokenContract.mint(userAddress.walletAddress, ethers.parseUnits(amount.toString(), 18));
//     await tx.wait();
//     console.log(`Minted ${amount} tokens to ${userAddress.walletAddress}`);
// }

app.get('/', async (req, res) => {
    currentStep = 1;
    res.render('index', {
        client: walletClient.address,
        freelancer: walletFreelancer.address,
        deployed: false,
        checked: "none",
        approvedFreelancer: false,
        approvedClient: false,
        checkedAfter: "none",
        currentStep: currentStep
    });
});

app.post('/deploy-contract', async (req, res) => {
    const jobAmount = req.body.valueAmount;
    const deployment = await deploy(jobAmount, walletClient, walletFreelancer);
    contractAddress = deployment.contractAddress;
    currentStep = 2;
    console.log(contractAddress);
    res.render('index', {
        client: walletClient.address,
        freelancer: walletFreelancer.address,
        deployed: true,
        checked: "none",
        approvedFreelancer: false,
        approvedClient: false,
        checkedAfter: "none",
        currentStep: currentStep
    });
});

app.post('/check-balance', async (req, res) => {
    if (!contractAddress) {
        return res.status(400).send("Contract not deployed yet.");
    }

    const escrowContract = new hre.ethers.Contract(contractAddress, contractAbi, walletClient);
    const balance = await escrowContract.getContractBalance();
    const formattedBalance = hre.ethers.formatEther(balance.toString());
    currentStep = 3;
    console.log("Escrow balance:", formattedBalance);
    res.render('index', {
        client: walletClient.address,
        freelancer: walletFreelancer.address,
        deployed: true,
        checked: formattedBalance,
        approvedFreelancer: false,
        approvedClient: false,
        checkedAfter: "none",
        currentStep: currentStep
    });
});

app.post('/check-balance-after', async (req, res) => {
    if (!contractAddress) {
        return res.status(400).send("Contract not deployed yet.");
    }

    const escrowContract = new hre.ethers.Contract(contractAddress, contractAbi, walletClient);
    const balance = await escrowContract.getContractBalance();
    const formattedBalance = hre.ethers.formatEther(balance.toString());
    console.log("Escrow balance:", formattedBalance);
    res.render('index', {
        client: walletClient.address,
        freelancer: walletFreelancer.address,
        deployed: true,
        checked: "none",
        approvedFreelancer: true,
        approvedClient: true,
        checkedAfter: formattedBalance,
        currentStep: currentStep
    });
});

app.post('/freelancer-approve', async (req, res) => {
    currentStep = 4;
    const escrowContract = new hre.ethers.Contract(contractAddress, contractAbi, walletFreelancer);
    const approval = await escrowContract.approveJob(walletFreelancer.address, walletClient.address);
    res.render('index', {
        client: walletClient.address,
        freelancer: walletFreelancer.address,
        deployed: true,
        checked: "none",
        approvedFreelancer: true,
        approvedClient: false,
        checkedAfter: "none",
        currentStep: currentStep
    });
});

app.post('/client-approve', async (req, res) => {
    currentStep = 5;
    const escrowContract = new hre.ethers.Contract(contractAddress, contractAbi, walletClient);
    const approval = await escrowContract.approveJob(walletFreelancer.address, walletClient.address);
    res.render('index', {
        client: walletClient.address,
        freelancer: walletFreelancer.address,
        deployed: true,
        checked: "none",
        approvedFreelancer: true,
        approvedClient: true,
        checkedAfter: "none",
        currentStep: currentStep
    });
});
