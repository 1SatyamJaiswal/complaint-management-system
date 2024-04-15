const fs = require("fs-extra");
const {web3} = require("./web3");
const compileContract = require("./build/Message.json");

// Contract object deployed on network (ganache-cli or testnet or mainnet)
// network can be selected in web3 file

// cont
const getContractObject = () => {
    
    const contractReceipt = require("./receipt-ganache.json");
    // create a contract object/instance 
    const contractObject = new web3.eth.Contract(
        JSON.parse(compileContract.interface),
        contractReceipt.address
    );

    return contractObject;
};