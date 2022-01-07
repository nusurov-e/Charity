const { timeout } = require("async");
const { task } = require("hardhat/config");

require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-truffle5");
require("hardhat-gas-reporter");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await web3.eth.getAccounts();
  for (const account of accounts) {
    console.log(account);
  }
});
task("deploy", "Deploys Charity contract", async(taskArgs, hre) => {
  const deploy = require('./scripts/deploy');
  await deploy.main();
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.8",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        { mnemonic: process.env.MNEMONIC }
    },
    hardhat: {
      accounts:
        { mnemonic: process.env.MNEMONIC }
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 2000000
  }
};
