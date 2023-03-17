import * as dotenv from "dotenv";

// tslint:disable-next-line:no-submodule-imports
import { HardhatUserConfig, task } from "hardhat/config";
// tslint:disable-next-line:no-submodule-imports
import { HardhatNetworkAccountUserConfig } from "hardhat/types/config";

import { utils, Wallet } from "ethers";

import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-web3";
import "@typechain/hardhat";
import 'hardhat-deploy';
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// If not defined, randomly generated.
function createPrivateKey() {
  const reg_bytes64: RegExp = /^(0x)[0-9a-f]{64}$/i;
  if (
    process.env.MANAGER_KEY === undefined ||
    process.env.MANAGER_KEY.trim() === "" ||
    !reg_bytes64.test(process.env.MANAGER_KEY)
  ) {
    console.log("환경 변수에 `MANAGER_KEY` 이 존재하지 않아서 무작위로 생성합니다.");
    process.env.TOKEN_MANAGER_KEY = Wallet.createRandom().privateKey;
  }
}
createPrivateKey();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

function getAccounts() {
  return [process.env.MANAGER_KEY || ""];
}

function getTestAccounts() {
  const accounts: HardhatNetworkAccountUserConfig[] = [];
  const defaultBalance = utils.parseEther("2000000").toString();

  const n = 11;
  for (let i = 0; i < n; ++i) {
    accounts.push({
      privateKey: Wallet.createRandom().privateKey,
      balance: defaultBalance,
    });
  }
  const acc = getAccounts();
  for (let idx = 0; idx < acc.length; idx++) accounts[idx].privateKey = acc[idx];
  accounts[0].balance = utils.parseEther("100000000").toString();

  return accounts;
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.10",
      },
    ],
  },
  networks: {
    hardhat: {
      accounts: getTestAccounts(),
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      blockGasLimit: 30000000,
      gasPrice: 8000000000,
    },
    mainnet: {
      url: process.env.MAIN_NET_URL || "",
      chainId: 2151,
      accounts: getAccounts(),
    },
    testnet: {
      url: process.env.TEST_NET_URL || "",
      chainId: 2019,
      accounts: getAccounts(),
    },
    michael: {
      url: process.env.MICHAEL_URL || "",
      chainId: 34559,
      accounts: getAccounts(),
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};

export default config;
