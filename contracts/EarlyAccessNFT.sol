// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@4.9.3/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.9.3/access/Ownable.sol";

/// @title EarlyAccessNFT
/// @notice Free-mint ERC-721 early access NFT, 1000 supply, one per wallet
/// @dev Deploy on Base Mainnet via Remix. Requires OpenZeppelin v5.
contract EarlyAccessNFT is ERC721, Ownable {
    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public constant MINT_PRICE = 0; // Free mint

    uint256 public totalMinted;
    bool    public mintOpen = true;

    mapping(address => bool) public hasMinted;

    string private _baseTokenURI;

    event Minted(address indexed user, uint256 tokenId);
    event MintStatusChanged(bool open);

    /// @param baseURI  IPFS or HTTP base URI for token metadata, e.g. ipfs://CID/
    constructor(string memory baseURI)
        ERC721("Early Access", "EARLY")
    {
        _baseTokenURI = baseURI;
    }

    /// @notice Open or close minting
    function setMintOpen(bool _open) external onlyOwner {
        mintOpen = _open;
        emit MintStatusChanged(_open);
    }

    /// @notice Update base URI for metadata
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    /// @notice User mints their own NFT
    function mint() external payable {
        _doMint(msg.sender);
    }



    function _doMint(address user) internal {
        require(mintOpen,              "Mint is closed");
        require(totalMinted < MAX_SUPPLY, "Sold out");
        require(!hasMinted[user],      "Already minted");
        require(msg.value >= MINT_PRICE, "Insufficient ETH");

        hasMinted[user] = true;
        totalMinted++;
        uint256 tokenId = totalMinted;

        _safeMint(user, tokenId);
        emit Minted(user, tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    /// @notice Withdraw any ETH sent to contract
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
