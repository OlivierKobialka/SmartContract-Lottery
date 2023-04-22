const { network, companionNetworks } = require("hardhat");

module.exports = async function ({ getNamedAccoutns, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    

    const raffle = await deploy("Raffle", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfiramtions || 1
    })
}