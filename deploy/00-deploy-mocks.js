const { developmentChains } = require("../helper-hardhat.config");

const BASE_FEE = ethers.utils.perseEther("0.25") // 0.25 ETH is the premium for the VRF request 
const GAS_PRICE_LINK = 1e9 // calculated value based on the gas price of the chain

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log(`Deploying Raffle on ${network.name}...`);
        // Deploy Raffle vrfCoordinatorV2
        await deploy("vrfCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log('Mocks deployed!')
        log("----------------------------------------------------")
    }
}
module.exports.tags = ["all", "mocks"];