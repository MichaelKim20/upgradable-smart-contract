import { NonceManager } from "@ethersproject/experimental";
import "@nomiclabs/hardhat-ethers";

import { GasPriceManager } from "../src/modules/GasPriceManager";
import { Greeting } from "../typechain-types";
import * as hre from "hardhat";

import { Wallet } from "ethers";

async function main() {
  let contract: Greeting;

  const provider = hre.ethers.provider;

  const admin = new Wallet(process.env.MANAGER_KEY || "");
  const adminSigner = new NonceManager(
    new GasPriceManager(provider.getSigner(admin.address))
  );

  const factory = await hre.ethers.getContractFactory("Greeting");
  contract = factory.attach(
    "0x4953F6a3073cf7C52D69965bb725896DF6A764c0"
  ) as Greeting;
  await (
    await contract.connect(adminSigner).setGreeting("안녕하세요9!")
  ).wait();
  console.log(await contract.connect(adminSigner).greet());
  console.log(await contract.connect(adminSigner).greet2());
  console.log(await contract.connect(adminSigner).greet3());
  console.log(await contract.connect(adminSigner).greet4());
  console.log(await contract.connect(adminSigner).greet5());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
