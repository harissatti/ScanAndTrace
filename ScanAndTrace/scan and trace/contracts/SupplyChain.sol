// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract scanandTrace is ERC1155, Ownable, Pausable, ERC1155Supply  {
    uint256 public _currentTokenId;
    mapping (uint256 => string) private _uris;

    constructor() ERC1155("") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause(); 
    }

    

    function mint(uint256 amount, string memory tokenURI) public onlyOwner returns (uint256) {
        require(amount>0,"invalid Amount");
        _mint(msg.sender, _currentTokenId, amount, "");
         _uris[_currentTokenId] = tokenURI;
         _currentTokenId++;
        return _currentTokenId;
    }


    
    function _setTokenURI(uint256 tokenId, string memory _uri) public onlyOwner {
        require(bytes(_uris[tokenId]).length != 0, "Token does not exist");
        _uris[tokenId] = _uri; 
    }
   
    function uri(uint256 tokenId) override public view returns (string memory) {
        return(_uris[tokenId]);
    }


    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
    function getUserIds(address user) public view returns (uint256[] memory) {
    uint256[] memory ids = new uint256[](_currentTokenId);
    uint256 count = 0;
    for (uint256 i = 0; i < _currentTokenId; i++) {
        if (balanceOf(user, i) > 0) {
            ids[count] = i;
            count++;
        }
    }
    uint256[] memory result = new uint256[](count);
    for (uint256 i = 0; i < count; i++) {
        result[i] = ids[i];
    }
    return result;
}


}
