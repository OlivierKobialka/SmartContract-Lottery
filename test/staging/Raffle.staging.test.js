const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

describe("Raffle Unit Tests", function () {
    let raffle, raffleContract, vrfCoordinatorV2Mock, raffleEntranceFee, interval, player

    beforeEach(async () => {
        accounts = await ethers.getSigners()
        player = accounts[1]
        await deployments.fixture(["mocks", "raffle"])
        vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        raffleContract = await ethers.getContract("Raffle")
        raffle = raffleContract.connect(player)
        raffleEntranceFee = await raffle.getEntranceFee()
        interval = await raffle.getInterval()
    })
})
