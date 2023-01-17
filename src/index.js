
// const apiKey = import.meta.env.VITE_API_KEY;
const apiKey = '369b67875091469c84fd0eb58b2395c7'

const Web3 = require('web3')
const provider = 'https://mainnet.infura.io/v3/'+apiKey
const web3Provider = new Web3.providers.HttpProvider(provider)
const web3 = new Web3(web3Provider);
web3.eth.getBlockNumber().then((res) => {
    console.log("Latest Ethereum Block is ",res);
})