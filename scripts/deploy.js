const hre = require("hardhat");

async function main() {
  console.log("Deploying HealthChain contract...");

  const HealthChain = await hre.ethers.getContractFactory("HealthChain");
  const healthChain = await HealthChain.deploy();

  await healthChain.waitForDeployment();

  const address = await healthChain.getAddress();
  console.log(`HealthChain deployed to: ${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 