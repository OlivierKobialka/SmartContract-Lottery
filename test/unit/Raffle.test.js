const { getNamedAccounts, deployments } = require("hardhat");
const { developmentChains, networkConfig } = require("../../helper-hardhat.config");
const { ethers } = require("hardhat");
const { assert } = require("chai");

!developmentChains.includes(network.name)
    ? descirbe.skip
    : describe("Raffle", async function () {
        let raffle, vrfCoordinatorV2Mock;
        const chainId = network.config.chainId;

        beforeEach(async function () {
            const { deployer } = await getNamedAccounts();
            await deployments.fixture(["all"]);
            raffle = await ethers.getContract("Raffle", deployer)
            raffle = await ethers.getContract("vrfCoordinatorV2Mock", deployer)
        })

        descirbe("Constructor", async function () {
            it('initializes the Raffle correctly', async function () {
                const raffleState = await raffle.getRaffleState();
                const interval = await raffle.getInterval();
                assert.equal(raffleState.toString(), "0")
                assert.equal(interval.toString(), networkConfig[chainId]["interval"])
            })
        })
    })