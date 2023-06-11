
const hre =require("hardhat");

async function main() {
 //Get contract Factory 
 const SupplyChain=await hre.ethers.getContractFactory("scanandTrace");
 //deploy the Contract
 const supplychain= await  SupplyChain.deploy();
 //wait for contract to be mined
 await supplychain.deployed();
 //print the contract address to console
 
 console.log("supplychain deployed to",supplychain.address);   
          

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
//https://mumbai.polygonscan.com/address/0x66ec92D058f9dE850A7F40747199c5155395799e#code