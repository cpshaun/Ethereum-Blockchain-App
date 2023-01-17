import Web3 from 'web3';

const INFURA_APIKEY = import.meta.env.VITE_INFURA_API_KEY;

const provider = `https://mainnet.infura.io/v3/${INFURA_APIKEY}`;
const Web3Provider = new Web3.providers.HttpProvider(provider);
let web3 = new Web3(Web3Provider);

export default web3