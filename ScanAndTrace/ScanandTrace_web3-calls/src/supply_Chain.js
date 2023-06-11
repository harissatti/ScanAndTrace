import React, {useState} from "react";
import {supplyChain} from './data';
import "./rand.css";

// import axios from 'axios';


const Web3 = require("web3");


const  Supply_Chain= ({ web3Obj, userInfo }) => {
  const [amount,setAmount]=useState("");
  const [uri,setUri]=useState("");
  const [id,setId]=useState("");
   const [owner_Address,setOwner_Address]=useState("");
   const [userAddress,setUserAddress]=useState("");

  // const [supply,setSupply]=useState("");

  //nftmint work


const AmountValue=(e)=>{
  setAmount(e.target.value);
  console.log(setAmount(e.target.value));
}
const UriValue=(e)=>{
  setUri(e.target.value);
  console.log(setUri(e.target.value));
}
const IdValue=(e)=>{
  setId(e.target.value);
}

const OwnerAddressValue=(e)=>{
  setOwner_Address(e.target.value);
}

const UserID=(e)=>{
  setUserAddress(e.target.value);
}





//checking owner
  const OnOwner=async(e)=>{
    e.preventDefault();
    var methods=new web3Obj.eth.Contract(supplyChain.ABI,supplyChain.contractAddress);
    const owner=await methods.methods.owner().call();
    console.log(owner,"owner");
    window.alert(owner);
  }

  const onPaused=async(e)=>{
    e.preventDefault();
    var methods=new web3Obj.eth.Contract(supplyChain.ABI,supplyChain.contractAddress);
    const paused=await methods.methods.paused().call();
    console.log(paused,"paused");
    window.alert(paused);
  }

//Pause The Contract
  const OnPause=async(e)=>{
    e.preventDefault();
    var methods=new web3Obj.eth.Contract(supplyChain.ABI,supplyChain.contractAddress);
    const pause=await methods.methods.pause().send({
      from:userInfo.account,
    });
    console.log(pause,"Pause");
    
  }
  const Onunpause=async(e)=>{
    e.preventDefault();
    var methods=new web3Obj.eth.Contract(supplyChain.ABI,supplyChain.contractAddress);
    const unpause=await methods.methods.unpause().send({
      from:userInfo.account,
    });
    console.log(unpause,"unPause");
    
  }


  //TotalSupply
  const onTotalsupply=async(e)=>{
    e.preventDefault();
    var methods=new web3Obj.eth.Contract(supplyChain.ABI,supplyChain.contractAddress);
    const totalsupply=await methods.methods.totalSupply(id).call();
    console.log(totalsupply,"TotalSupply");
    window.alert(totalsupply);
  }

  //minting the NFT
  const OnMint=async(e)=>{
    e.preventDefault();
    var methods= new web3Obj.eth.Contract(supplyChain.ABI,supplyChain.contractAddress);
    const mint =await methods.methods.mint(amount,uri).send({
      from:userInfo.account,
    });
  }
  

  //getting ID Uri
  const OnUri=async(e)=>{
    e.preventDefault();
    var methods= new web3Obj.eth.Contract(supplyChain.ABI,supplyChain.contractAddress);
    const tokenURI=await methods.methods.uri(id).call();
    console.log(tokenURI,"token URI");
    window.alert(tokenURI);
    setId(0);
    
  }
//set Token URI
  const OnSetTokenUri=async(e)=>{
    e.preventDefault();
    var methods= new web3Obj.eth.Contract(supplyChain.ABI,supplyChain.contractAddress);
    const mint =await methods.methods._setTokenURI(id,uri).send({
      from:userInfo.account,
    });

  }
  const OnsafeTransferFrom =async(e)=>{
    e.preventDefault();
    var methods= new web3Obj.eth.Contract(supplyChain.ABI,supplyChain.contractAddress);
    const transfer =await methods.methods.safeTransferFrom(owner_Address,userAddress,id,amount,"0x").send({
      from:userInfo.account,
    });
  }



  const OnGetBalance=async(e)=>{
    e.preventDefault();
    var methods= new web3Obj.eth.Contract(supplyChain.ABI,supplyChain.contractAddress);
    const getBalance=await methods.methods.balanceOf(userAddress,id).call();
    console.log("getBalance",getBalance);
    setUserAddress("");

  }
  const OnGetUserIds=async(e)=>{
    e.preventDefault();
    var methods= new web3Obj.eth.Contract(supplyChain.ABI,supplyChain.contractAddress);
    const getId=await methods.methods.getUserIds(userAddress).call();
    console.log(getId);
    window.alert("ids :"+getId);

  }

  const OncurrentTokenId=async(e)=>{
    e.preventDefault();
    var methods= new web3Obj.eth.Contract(supplyChain.ABI,supplyChain.contractAddress);
    const  CurrentId=await methods.methods._currentTokenId().call();
    console.log(CurrentId);
    window.alert(CurrentId);
  }

  return (
    <>
    <h3>Scan And Trace  contract calls</h3>
    <button className="marginTop" onClick={OnOwner}>owner </button> 
    <button className="marginTop" onClick={OnPause}>stop Contract </button> 
    <button className="marginTop" onClick={Onunpause}>Resume Contract </button> 
    <button className="marginTop" onClick={onPaused}>Contract Pause ?</button> 
    <button className="marginTop" onClick={OncurrentTokenId}>Current TokenID </button>

     {/* **********total Supply*************** */}
      <form className="marginTop" onSubmit={onTotalsupply}>
        <div className="app-details">
          <h5>TotalSupply </h5>
          <label htmlFor="BaseUri">id :</label>
          <input type="text" value={id} onChange={IdValue} />
          <br />
          </div>
        <button className="marginTop">TotalSupply</button>
      </form> 
          {/* **********Uri*************** */}
      <form className="marginTop" onSubmit={OnUri}>
        <div className="app-details">
          <h5> URI </h5>
          <label htmlFor="BaseUri">ID</label>
          <input type="text" value={id} onChange={IdValue} />
          <br />
          </div>
        <button className="marginTop">IdUri</button>
      </form> 
       {/* **********minting*************** */}

      <form className="marginTop" onSubmit={OnMint}>
        <div className="app-details">
          <h5>mint</h5>
          <label htmlFor="mint">Amount</label>
          <input type="text" value={amount} onChange={AmountValue} />
          <br />
          <label htmlFor="mint">URI</label>
          <input type="text" value={uri} onChange={UriValue} />
          <br />
          </div>
        <button className="marginTop">Mint</button>
      </form> 
    
       {/* **********TokenUri*************** */}

    <form className="marginTop" onSubmit={OnSetTokenUri}>
      <div className="app-details">
        <h5>Token ID Uri</h5>
        <label htmlFor="base Uri"> Token Id</label>
        <input type="text" value={id} onChange={IdValue}/>
        <br/>
        <h5>Uri</h5>
        <label htmlFor="base Uri"> Uri</label>
        <input type="text" value={uri} onChange={UriValue} />
        <br/>
      </div>
      
      <button className="marginTop">set TokenId BaseUri</button>
    </form>

     
     {/* **********safeTransferFrom*************** */}
     <form className="marginTop" onSubmit={OnsafeTransferFrom}>
      <div className="app-details">
        <h5>Transfer ID</h5>
        <label htmlFor="user Address"> Owner Address</label>
        <input type="text" value={owner_Address} onChange={OwnerAddressValue}/>
        <br/>
        <label htmlFor="user Address"> User Address</label>
        <input type="text" value={userAddress} onChange={UserID}/>
        <label htmlFor="BaseUri">id :</label>
          <input type="text" value={id} onChange={IdValue} />
          <br />
          <label htmlFor="mint">Amount</label>
          <input type="text" value={amount} onChange={AmountValue} />
      </div>
      <button className="marginTop">Transfer</button>
    </form>
     {/* **********geting user IDs*************** */}
    <form className="marginTop" onSubmit={OnGetUserIds}>
      <div className="app-details">
        <h5>get User ID</h5>
        <label htmlFor="user ID"> User Address</label>
        <input type="text" value={userAddress} onChange={UserID}/>
        <br/>
      </div>
      <button className="marginTop">get IDS</button>
    </form>
     {/* **********geting balance of*************** */}
     <form className="marginTop" onSubmit={OnGetBalance}>
      <div className="app-details">
        <h5>get User Balance</h5>
        <label htmlFor="user ID"> User Address</label>
        <input type="text" value={userAddress} onChange={UserID}/>
        <br/>
        <label htmlFor="BaseUri">ID</label>
          <input type="text" value={id} onChange={IdValue} />
          <br />
      </div>
      <button className="marginTop">get Balance</button>
    </form>
    
    
    
    </>
  )
}
export default Supply_Chain;