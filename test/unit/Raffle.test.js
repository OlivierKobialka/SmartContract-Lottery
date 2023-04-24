const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat.config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle Unit Tests", function () {
        let raffle, raffleContract, vrfCoordinatorV2Mock, raffleEntranceFee, interval, player, deployer

        beforeEach(async () => {
            accounts = await ethers.getSigners() // could also do with getNamedAccounts
            //   deployer = accounts[0]
            player = accounts[1]
            await deployments.fixture(["mocks", "raffle"]) // Deploys modules with the tags "mocks" and "raffle"
            vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock") // Returns a new connection to the VRFCoordinatorV2Mock contract
            raffleContract = await ethers.getContract("Raffle") // Returns a new connection to the Raffle contract
            raffle = raffleContract.connect(player) // Returns a new instance of the Raffle contract connected to player
            raffleEntranceFee = await raffle.getEntranceFee()
            interval = await raffle.getInterval()
        })


        describe("constructor", function () {
            it("initializes the raffle correctly", async () => {
                // Ideally, we'd separate these out so that only 1 assert per "it" block
                // And ideally, we'd make this check everything
                const raffleState = (await raffle.getRaffleState()).toString()
                // Comparisons for Raffle initialization:
                assert.equal(raffleState, "0")
                assert.equal(
                    interval.toString(),
                    networkConfig[network.config.chainId]["interval"]
                )
            })
        })

        describe("enterRaffle", async function () {
            it("reverts when you don't pay enough", async function () {
                await expect(raffle.enterRaffle()).to.be.revertedWith("Raffle__NotEnoughETHEntered")
            })
            it("records players when they enter", async function () {
                // raffleEntranceFee
                await raffle.enterRaffle({ value: raffleEntranceFee })
                const playerFromContract = await raffle.getPlayer(0)
                assert.equal(playerFromContract, deployer)
            })
            it("emits on event", async function () {
                await expect(raffle.enterRaffle({ value: raffleEntranceFee })).to.emit(raffleContract, "RaffleEnter")
            })
            it("doesnt allow enteance whem reffle in calculating", async function () {
                await raffle.enterRaffle({ value: raffleEntranceFee })
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                await network.provider.send("evm_mine", [])

                await raffle.performUpkeep([])
                await expect(raffle.enterRaffle({ value: raffleEntranceFee })).to.be.revertedWith("Raffle__NotOpen")
            })
        })
        describe("checkUpkeep", async function () {
            it("returns false if people havent dent any ETH", async function () {
                await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
                await network.provider.send("evm_mine", [])
            })
        })
    })