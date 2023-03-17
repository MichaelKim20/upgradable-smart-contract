import * as hre from "hardhat";
import { DeployOptions } from "hardhat-deploy/dist/types";

export interface IGasFee {
  maxPriorityFeePerGas: string;
  maxFeePerGas: string;
}

export async function fillGasFee(
  option: DeployOptions
): Promise<DeployOptions> {
  const block = await hre.ethers.provider.getBlock("latest");
  const baseFeePerGas =
    block.baseFeePerGas != null ? block.baseFeePerGas.toNumber() : 0;
  const maxPriorityFeePerGas = 1500000000;
  const maxFeePerGas =
    Math.floor(baseFeePerGas * 1.265625) + maxPriorityFeePerGas;

  option.maxPriorityFeePerGas = maxPriorityFeePerGas.toString();
  option.maxFeePerGas = maxFeePerGas.toString();
  return option;
}

export async function fillNonce(
  option: DeployOptions,
  address: string
): Promise<DeployOptions> {
  option.nonce = (await hre.ethers.provider.getTransactionCount(address)) + 1;
  return option;
}
