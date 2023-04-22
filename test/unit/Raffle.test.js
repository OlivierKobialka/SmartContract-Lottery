const { getNamedAccounts, deployments } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat.config");
const { ethers } = require("hardhat");

!developmentChains.includes(network.name)
    ? descirbe.skip
    : describe("Raffle", async function () {
        let raffle, vrfCoordinatorV2Mock;

        beforeEach(async function () {
            const { deployer } = await getNamedAccounts();
            await deployments.fixture(["all"]);
            raffle = await ethers.getContract("Raffle", deployer)
            raffle = await ethers.getContract("vrfCoordinatorV2Mock", deployer)
        })
    })