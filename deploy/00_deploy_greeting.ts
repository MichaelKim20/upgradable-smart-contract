import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { fillGasFee, fillNonce } from "./helpers";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy, read } = hre.deployments;

  const deployment = await deploy(
    "Greeting",
    await fillNonce(
      await fillGasFee({
        contract: "Greeting",
        from: deployer,
        proxy: {
          proxyContract: "OpenZeppelinTransparentProxy",
          owner: deployer,
        },
        log: true,
      }),
      deployer
    )
  );
};

export default func;
func.tags = ["greeting"];
