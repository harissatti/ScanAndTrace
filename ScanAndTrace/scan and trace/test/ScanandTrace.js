const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("scanandTrace", function () {
  let owner;
  let supply;
  let distrubutor1;
  let distrubutor2;
  let distrubutor3;

 
  describe("create",() => {
   it("create",async ()=>{
    [owner, supply, distrubutor1,distrubutor2,distrubutor3,retailor1,retailor2,retailor3] = await ethers.getSigners();
    const SupplyChain = await ethers.getContractFactory("scanandTrace");
    supplyChain = await SupplyChain.deploy();
    await supplyChain.deployed();
   })
  //  ************************************************Minting************************************************
    it("Mint", async () => {
      const tx = await supplyChain.mint(10000000,"https://game.example/api/item/07Ad9d.json");
      const tx1 = await supplyChain.mint(300000000,"https://game.example/api/item/1.json");
      const tx2 = await supplyChain.mint(50,"https://game.example/api/item/2.json");
      const tx3 = await supplyChain.mint(100,"https://game.example/api/item/07Ad.json");
    });
    it("fail Minting  passing an zero amount  ",async()=>{
    await expect(supplyChain.mint(0, "https://game.example/api/item/07Ad9d.json")).to.be.revertedWith("invalid Amount");
    })

    //  ************************************************getting IDS************************************************

    it("Getting IDS",async()=>{
      console.log("owner Balance",await supplyChain.getUserIds(owner.address));
     })

  //  ************************************************Balance************************************************

    it("checking owner Balance",async()=>{
      const balance=await supplyChain.balanceOf(owner.address,0);
      const balance1=await supplyChain.balanceOf(owner.address,1);
      const balance2=await supplyChain.balanceOf(owner.address,2);
      const balance3=await supplyChain.balanceOf(owner.address,3);
      expect(balance).to.equal(10000000);
      expect(balance1).to.equal(300000000);
      expect(balance2).to.equal(50);
      expect(balance3).to.equal(100);
    })
    it("checking Uri of smart contract",async()=>{
      const uri=await supplyChain.uri(0);
      const uri1=await supplyChain.uri(1);
      const uri2=await supplyChain.uri(2);
      const uri3=await supplyChain.uri(3);
      expect(uri).to.equal("https://game.example/api/item/07Ad9d.json");
      expect(uri1).to.equal("https://game.example/api/item/1.json");
      expect(uri2).to.equal("https://game.example/api/item/2.json");
      expect(uri3).to.equal("https://game.example/api/item/07Ad.json");
    })
    it("checking Total supply ",async()=>{
      const supply =await supplyChain.totalSupply(0);
      const supply1 =await supplyChain.totalSupply(1);
      const supply2 =await supplyChain.totalSupply(2);
      const supply3 =await supplyChain.totalSupply(3);
      console.log(supply,"0");
      console.log(supply1,"1");
      console.log(supply2,"2");
      console.log(supply3,"3");
      
      expect(supply).to.equal(10000000);
    })
    it("checking save transfer from",async()=>{
      console.log("owner Balance",await supplyChain.getUserIds(distrubutor1.address));
      const transfer=await supplyChain.safeTransferFrom(owner.address,distrubutor1.address,0,1000,"0x");
      const transfer1ing=await supplyChain.safeTransferFrom(owner.address,distrubutor1.address,1,1000,"0x");

      console.log("distrubutor1 Balance",await supplyChain.getUserIds(distrubutor1.address));
      console.log("retailor1 Balance",await supplyChain.getUserIds(retailor1.address));
      const transfer1=await supplyChain.connect(distrubutor1).safeTransferFrom(distrubutor1.address,retailor1.address,0,100,"0x");
      console.log("retailor1 Balance",await supplyChain.getUserIds(retailor1.address));
      console.log("owner Balance",await supplyChain.getUserIds(owner.address));

      console.log("owner balance ",await supplyChain.balanceOf(owner.address,0));
      console.log(await supplyChain.balanceOf(distrubutor1.address,0));
      console.log(await supplyChain.balanceOf(distrubutor2.address,0));
      console.log(await supplyChain.balanceOf(retailor1.address,0));

      expect(await supplyChain.balanceOf(owner.address,0)).to.equal(9999000);
    })
    it("seting the uri again",async()=>{
      const  uri=await supplyChain._setTokenURI(0,"https://game.example/api/item/1.json");
      const  uri1=await supplyChain._setTokenURI(1,"https://game.example/api/item/da12.json");
      const  uri2=await supplyChain._setTokenURI(2,"https://game.example/api/item/12wq.json");
      console.log(await supplyChain.uri(0),"uri 0");
      console.log(await supplyChain.uri(1),"uri 1");
      console.log(await supplyChain.uri(2),"uri 2");
      console.log(await supplyChain.uri(3),"uri 3");
      

      expect(await supplyChain.uri(0)).to.equal("https://game.example/api/item/1.json");
      
    })

  });
});