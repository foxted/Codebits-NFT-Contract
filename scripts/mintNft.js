require('dotenv').config();
const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

const data = require('../build/contracts/Codebits.json');
const abiArray = data.abi;
const contract_address = process.env.CONTRACT_ADDRESS;
const mnemonic = process.env.MNEMONIC;
const clientURL = process.env.CLIENT_URL;
const provider = new HDWalletProvider(mnemonic, clientURL);
const web3 = new Web3(provider);

const mintNFT = async (url) => {
    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Accounts:', accounts);
        console.log('Contract Address', contract_address);
        const codebits = new web3.eth.Contract(abiArray, contract_address);
        await codebits.methods
            .claimItem(url)
            .send({ from: accounts[0] });
        console.log('Successfully minted NFT');
        // https://docs.openzeppelin.com/contracts/2.x/api/token/erc721#IERC721-balanceOf-address-
        // returns number of NFT's in owner's account
        const balance = await codebits.methods.balanceOf(accounts[0]).call();
        const owner = await codebits.methods.ownerOf(balance).call();
        console.log('Balance: ', balance);
        console.log('Owner: ', owner);
    } catch (err) {
        console.error('Error occurred while calling deployed contract:', err);
    }
}

module.exports = mintNFT;
