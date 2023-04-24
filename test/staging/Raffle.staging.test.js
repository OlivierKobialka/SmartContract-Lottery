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
            isCallTrace("works with live ChaainLink Keepers and chainlink VRF, we get a roandom winner", async function () {
                // enter the raffle
                const startingTimeStamp = await raffle.getLatestTimeStamp()
                const accounts = await ethers.getSigner()

                // await raffle.enterRaffle({ value: raffleEntranceFee })
                await new Promise(async (resolve, reject) => {
                    raffle.once("WinnerPicked", async () => {
                        console.log('Winner Picked event fired!');
                        try {
                            const recentWinner = await raffle.getRecentWinner()
                            const raffleState = await raffle.getRaffleState()
                            const winnerEndingBalance = await raffle.getRaffleBalance()
                            const endingTimeStamp = await raffle.getLatestTimeStamp()

                            await expect(raffle.getPPlayer(0)).to.be.reverted
                            assert.equal(recentWinner.toString(), accounts[0].address)
                            assert.equal(raffleState, 0)
                            assert.equal(winnerEndingBalance.toString(), winnerStartingBalance.add(raffleEntranceFee).toString())
                        } catch (error) {
                            console.log(error);
                            reject(error)
                        }
                    })

                    await raffle.enterRaffle({ value: raffleEntranceFee })
                    const winnerStartingBalance = await account[0].getBalance()

                })
            })
        })
    })
