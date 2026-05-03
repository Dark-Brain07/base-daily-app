// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title DailyCheckIn
/// @notice On-chain daily check-in tracker with streak logic
/// @dev Deploy on Base Mainnet via Remix.
contract DailyCheckIn {
    address public owner;

    uint256 public constant COOLDOWN     = 20 hours;
    uint256 public constant STREAK_GRACE = 48 hours;

    mapping(address => uint256) public lastCheckIn;
    mapping(address => uint256) public streak;
    mapping(address => uint256) public totalCheckIns;

    event CheckedIn(address indexed user, uint256 streak, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /// @notice Transfer ownership
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        owner = newOwner;
    }

    /// @notice User checks in themselves
    function checkIn() external {
        _doCheckIn(msg.sender);
    }



    function _doCheckIn(address user) internal {
        require(canCheckIn(user), "Too early to check in");

        uint256 last = lastCheckIn[user];
        if (last != 0 && block.timestamp - last <= STREAK_GRACE) {
            streak[user]++;
        } else {
            streak[user] = 1;
        }

        lastCheckIn[user] = block.timestamp;
        totalCheckIns[user]++;

        emit CheckedIn(user, streak[user], block.timestamp);
    }

    /// @notice Check if a user is eligible to check in
    function canCheckIn(address user) public view returns (bool) {
        return block.timestamp >= lastCheckIn[user] + COOLDOWN;
    }

    /// @notice Get full stats for a user
    function getStats(address user) external view returns (
        uint256 _streak,
        uint256 _total,
        uint256 _lastCheckIn,
        bool    _canCheckIn
    ) {
        return (
            streak[user],
            totalCheckIns[user],
            lastCheckIn[user],
            canCheckIn(user)
        );
    }
}
