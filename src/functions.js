import TodoListJSON from '../build/contracts/TodoList.json';
import Web3 from 'web3';
import { getTransactions } from './apis';
// import {response} from 'express';

// create instance of the package truffle contracts
var contract = require('@truffle/contract');

const weiToEth = (weiAmount) => {
  const answer = weiAmount != 0 ? weiAmount / 10**18 : 0;
  return answer
}

const weiToGwei = (weiAmount) => {
  const answer = weiAmount != 0 ? weiAmount / 10**9 : 0;
  return answer
}

export const formatCurrency = (amount) => {
  const roundedAmount = Math.round(amount * 100) / 100;
  return roundedAmount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export const computeSpendData = (txs, account) => {

  const totWeiSpent = 0;

  txs.map((tx) => {
    if (tx.from_address === account) {
      totWeiSpent += (tx.gas_spent * tx.gas_price)
    }});
  const lastTsx = txs[txs.length-1]
  const lastWeiSpent = lastTsx ? lastTsx.gas_spent * lastTsx.gas_price : 0
  const result = {
    last: weiToEth(lastWeiSpent),
    tot: weiToEth(totWeiSpent)
  }

  return result
}

export const getResult = (response) => {
  return response.data.data.items;
};

export const load = async () => {
  await loadWeb3();
  const account = await loadAccount();
  const balance = await loadBalance(account);
  const { todoContract, tasks } = await loadContract(account);
  const ethPrice = await loadEthPrice(todoContract);
  const transactions = await getTransactions(todoContract.address);

  return { account, balance, todoContract, tasks, ethPrice, transactions };
};

const loadEthPrice = async (contract) => {
  const ethPrice = await contract.getEthPrice();
  return ethPrice.words[0];
}

const loadAccount = async () => {
  const account = await web3.eth.getCoinbase();
  return account;
};

const loadBalance = async (account) => {
  const balance = await web3.eth.getBalance(account);
  return balance;
}

const loadContract = async (account) => {
  const myContract = contract(TodoListJSON);
  myContract.setProvider(web3.eth.currentProvider);
  const todoContract = await myContract.deployed();
  const tasks = await loadTasks(todoContract, account);

  return { todoContract, tasks }
};

const loadTasks = async (contract, account) => {
  const tasksCount = await contract.tasksCount(account);
  const tasks = [];
  for (var i = 0; i < tasksCount; i++) {
    const task = await contract.tasks(account, i);
    tasks.push(task);
  }
  return tasks
}

// provided by Metamask to connect web3 to the wallet
const loadWeb3 = async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            const account = await web3.eth.getCoinbase()
            // Acccounts now exposed
            web3.eth.sendTransaction({from: account});
        } catch (error) {
          console.log('custom catch: ', error);
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */}).catch(e=>console.log('legacy catch e: ', e));
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};
