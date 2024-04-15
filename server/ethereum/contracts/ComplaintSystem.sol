// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ComplaintSystem {
    address[] public admins;
    mapping(address => bool) public isAdmin;

    address[] public users;
    mapping(address => bool) public isUser;

    enum ComplaintStatus { Pending, Resolved }
    enum Action { Access, Resolve, Reply }

    struct Transaction {
        address accessor;
        Action actionType;
        uint256 timestamp;
    }

    struct File {
        string ipfsHash;
        string name;
    }

    struct Complaint {
        uint id;
        address complainant;
        string description;
        ComplaintStatus status;
        File file;
    }

    struct Reply {
        address senderAddress;
        string replyText;
        uint256 timestamp;
    }

    mapping(uint => Complaint) public complaints;
    mapping(uint => Transaction[]) public transactions;
    mapping(uint => Reply[]) public replies;
    uint256 public complaintCount;

    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Only admin can call this function");
        _;
    }

    modifier onlyUser() {
        require(isUser[msg.sender], "Only user can call this function");
        _;
    }

    event ComplaintCreated(uint256 id, address indexed complainant, string ipfsHash, string description);
    event ComplaintResolved(uint256 id, string response);
    event TransactionAdded(uint256 complaintId, address accessor, string action, uint256 timestamp);
    event AdminRegistered(address indexed admin);
    event UserRegistered(address indexed user);

    function registerUser() external {
        users.push(msg.sender);
        isUser[msg.sender] = true;
        emit UserRegistered(msg.sender);
    }

    function registerAdmin() external {
        admins.push(msg.sender);
        isAdmin[msg.sender] = true;
        emit AdminRegistered(msg.sender);
    }

    function createComplaint(string memory _ipfsHash, string memory _description, string memory fileName) external onlyUser {
        require(bytes(_ipfsHash).length > 0, "No file provided");
        uint complaintId = complaintCount++;
        complaints[complaintId] = Complaint(complaintId, msg.sender, _description, ComplaintStatus.Pending, File(_ipfsHash, fileName));
        emit ComplaintCreated(complaintId, msg.sender, _ipfsHash, _description);
    }

    function resolveComplaint(uint _complaintId, string memory _response) external onlyAdmin {
        require(complaints[_complaintId].status == ComplaintStatus.Pending, "Complaint is already resolved");
        complaints[_complaintId].status = ComplaintStatus.Resolved;
        emit ComplaintResolved(_complaintId, _response);
        _addTransaction(_complaintId, msg.sender, Action.Resolve);
    }

    function accessComplaint(uint _complaintId) external onlyUser {
        _addTransaction(_complaintId, msg.sender, Action.Access);
    }

    function replyToComplaint(uint _complaintId, string memory _replyText) external onlyAdmin {
        replies[_complaintId].push(Reply(msg.sender, _replyText, block.timestamp));
        emit TransactionAdded(_complaintId, msg.sender, "reply", block.timestamp);
    }

    function _addTransaction(uint _complaintId, address _accessor, Action _actionType) internal {
        transactions[_complaintId].push(Transaction(_accessor, _actionType, block.timestamp));
        emit TransactionAdded(_complaintId, _accessor, _actionType == Action.Access ? "access" : "resolve", block.timestamp);
    }

    function getUserComplaints(address _user) external view returns (Complaint[] memory) {
        Complaint[] memory userComplaints = new Complaint[](complaintCount);
        uint userComplaintsCount = 0;
        for (uint i = 0; i < complaintCount; i++) {
            if (complaints[i].complainant == _user) {
                userComplaints[userComplaintsCount] = complaints[i];
                userComplaintsCount++;
            }
        }
        // Resize the array to remove unused slots
        assembly { mstore(userComplaints, userComplaintsCount) }
        return userComplaints;
    }

    function getUserReplies(address _user) external view returns (Reply[] memory) {
        Reply[] memory userReplies = new Reply[](complaintCount);
        uint userRepliesCount = 0;
        for (uint i = 0; i < complaintCount; i++) {
            if (complaints[i].complainant == _user) {
                for (uint j = 0; j < replies[i].length; j++) {
                    userReplies[userRepliesCount] = replies[i][j];
                    userRepliesCount++;
                }
            }
        }
        // Resize the array to remove unused slots
        assembly { mstore(userReplies, userRepliesCount) }
        return userReplies;
    }

    function getUnresolvedComplaints() external view returns (Complaint[] memory) {
        uint unresolvedCount = 0;
        // Count the number of unresolved complaints
        for (uint i = 0; i < complaintCount; i++) {
            if (complaints[i].status == ComplaintStatus.Pending) {
                unresolvedCount++;
            }
        }
        // Initialize an array to store unresolved complaints
        Complaint[] memory unresolvedComplaints = new Complaint[](unresolvedCount);
        // Iterate through complaints again to populate the array
        uint currentIndex = 0;
        for (uint i = 0; i < complaintCount; i++) {
            if (complaints[i].status == ComplaintStatus.Pending) {
                unresolvedComplaints[currentIndex] = complaints[i];
                currentIndex++;
            }
        }
        return unresolvedComplaints;
    }
}
