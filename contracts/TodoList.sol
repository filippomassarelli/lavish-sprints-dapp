// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract TodoList {
    string public title = "My smart to-do list";

    struct Task {
        uint256 id;
        string content;
        bool inProgress;
        bool completed;
    }

    event TaskCreated(
        uint256 id,
        string content,
        bool inProgress,
        bool completed
    );
    event TaskToggleCompleted(uint256 id, bool completed);
    event TaskToggleInProgress(uint256 id, bool inProgress);

    mapping(address => mapping(uint256 => Task)) public tasks;
    mapping(address => uint256) public tasksCount;

    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0x9326BFA02ADD2366b30bacB125260Af641031331
        );
    }

    function getEthPrice() public view returns (int256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return price / 10**8; //ETH pairs have 18 decimals, non ETH pairs have 8 decimals
    }

    function createTask(string memory _content) public {
        uint256 taskCount = tasksCount[msg.sender];
        tasks[msg.sender][taskCount] = Task(taskCount, _content, false, false);
        // emit the event of creating the taks and increment taskcount
        emit TaskCreated(taskCount, _content, false, false);
        tasksCount[msg.sender]++;
    }

    function toggleInProgress(uint256 _id) public {
        Task memory task = tasks[msg.sender][_id];
        task.inProgress = !task.inProgress;
        tasks[msg.sender][_id] = task;
        emit TaskToggleInProgress(_id, task.inProgress);
    }

    function toggleCompleted(uint256 _id) public {
        Task memory task = tasks[msg.sender][_id];
        task.completed = !task.completed;
        tasks[msg.sender][_id] = task;
        emit TaskToggleCompleted(_id, task.completed);
    }
}
