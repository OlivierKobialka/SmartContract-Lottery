// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordintaorV2Interface.sol";

error Raffle__NotEnoughETHEntered();

contract Raffle is VRFConsumerBaseV2 {
    //  State variables
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;
    VRFCoordintaorV2Interface private immutable i_vrfCoordinator;
    bytes32 private immutable i_gasLane

    // Events
    event RaffleEnter(address indexed player);

    constructor(
        address vrfCoordinatorV2,
        uint256 entranceFee,
        bytes32 gasLane
    ) VRFConsumerBaseV2(vrfCoordinatorV2) {
        i_entranceFee = entranceFee;
        i_vrfCoordinator = VRFCoordintaorV2Interface(vrfCoordinator);
        i_gasLane = gasLane;
    }

    function enterRaffle() public payable {
        if (msg.value < i_entranceFee) {
            revert Raffle__NotEnoughETHEntered();
        }

        s_players.push(payable(msg.sender));
        // Event
        emit RaffleEnter(msg.sender);
    }

    function requestRandomWinner() external {
        // request random number from Chainlink VRF | 2 transaction process
        i_vrfCoordinator.requestRandomWords(
                i_gasLane, // max price for payment for gwei
                s_subscriptionId,
                requestConfirmations, 
                callbackGasLimit, 
                numWords
            )
    }

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {}

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }
}
