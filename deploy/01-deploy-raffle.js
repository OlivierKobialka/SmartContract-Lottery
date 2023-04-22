const { network, companionNetworks } = require("hardhat");
const { developmentChains } = require("../helper-hardhat.config");

module.exports = async function ({ getNamedAccoutns, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    let vrfCoordinatorV2Address = 

    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2Mock = await ethers.getContract("vrfCoordinatorV2Mock");
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
    }

    const raffle = await deploy("Raffle", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfiramtions || 1
    })
}