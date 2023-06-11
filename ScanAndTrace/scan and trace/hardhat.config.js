require("hardhat-gas-reporter");
require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("solidity-coverage");
const BINANCE__TESTNET_RPC_URL= process.env.BINANCE__TESTNET_RPC_URL;
const COINMARKETCAP_API_KEY=process.env.COINMARKETCAP_API_KEY;
const Polygon_MAINNET_API=process.env.Polygon_MAINNET_API;
const polygon_TESTNET_PRIVATE_KEY= process.env.polygon_TESTNET_PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  
  networks: {
    polygon_mumbai: {
      url: BINANCE__TESTNET_RPC_URL,
      accounts: [polygon_TESTNET_PRIVATE_KEY],
      chainId:80001,
    },
  },
  gasReporter: {
      enabled: (process.env.REPORT_GAS) ? false:true, // to turn on the gass reporter
    //  enabled: (process.env.REPORT_GAS) ? true:false, //to turn off the gass reporter
    // outputFile:'gas-report.txt',
    currency: 'USD',
    coinmarketcap:COINMARKETCAP_API_KEY,
    token:'MATIC',
  },
  etherscan: {
    apiKey: process.env.Polygon_MAINNET_API
  },

  solidity: {
    version: "0.8.9",
    settings: {
    optimizer: {
    enabled: true,
    runs: 200
    }
    }
    }

};
