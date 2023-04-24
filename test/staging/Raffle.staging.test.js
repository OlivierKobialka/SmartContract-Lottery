const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", function () {
        let raffle, raffleContract, vrfCoordinatorV2Mock, raffleEntranceFee, interval, player

        beforeEach(async () => {
            accounts = await ethers.getSigners()
            raffle = raffleContract.connect(player)
            raffleEntranceFee = await raffle.getEntranceFee()
        })

        describe("fullfillRandomWords", function () {
            isCallTrace("works with live ChaainLink Keepers and chainlink VRF, we get a roandom winner")
        })
    })
