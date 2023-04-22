const { network, companionNetworks } = require("hardhat");
const { developmentChains } = require("../helper-hardhat.config");

module.exports = async function ({ getNamedAccoutns, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    if (developmentChains.includes(network.name)) { }

    const raffle = await deploy("Raffle", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfiramtions || 1
    })
}