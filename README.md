# Smart Contracts Simplified: Ep. 1 - Smart Contracts Lab

This project is a simple demo that explains how a basic smart contract works.  
**Episode 1** focuses on a freelancer job contract, walking through how a smart contract can automate and secure agreements between a client and a freelancer.

## 🚀 Features

- Demonstrates a basic freelance job smart contract
- Integrates with Hardhat for local blockchain simulation
- Simple frontend to interact with the contract

## 📦 Setup Instructions

Follow these steps to run the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kalu-Bru/Freelance.git
   cd Freelance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the app**
   ```bash
   node src/app
   ```

4. **In a separate terminal, start the local Hardhat node**
   ```bash
   cd Freelance
   npx hardhat node
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) and follow the instructions in the UI.

## 🧪 Tech Stack

- Node.js
- Hardhat
- Solidity
- JavaScript / EJS / CSS

## 📄 License

MIT License

## 🧹 Cleanup Instructions

Once you're done exploring the demo and want to remove everything:

### 1. Remove the cloned repository folder

From the parent directory where you cloned the project:
```bash
rm -rf Freelance
```


### 2. Uninstall globally installed dependencies (if any)

If you installed anything globally (optional), you can remove it like this:

```bash
npm uninstall -g hardhat
```

### 3. (Optional) Clear local node modules and lock file first

If you want to clean up without deleting the repo folder:

```bash
rm -rf node_modules package-lock.json
```

