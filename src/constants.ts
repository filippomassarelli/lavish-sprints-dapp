export const popoverContent: { [key: number]: {[key: string]: string } }= {
  0: {
    title: "👋\v\v Hello",
    body: "It's good to have you here.\n\nI guess you're probably a dev so here's a walkthrough of the Tech stack and how I built this DApp",
  },
  1: {
    title: "⚛️\v\v Next + Typescript",
    body: `This app has been bootstrapped with create-next-app --ts in order to:\n
- get up and running quickly\n
- have static typing handy\n
- use multi page navigation and server-side rendering if wanted`,
  },
  2: {
    title: "⚡\v\v Chakra UI",
    body: `UI React component libraries are great to make things fast and sleek.\n
Chakra was chosen because I'd heard good things and wanted to explore it first hand.\n
This multistep popover we're in now was a pleasure to customise.`,
  },
  3: {
    title: "🗿\v\v Solidity",
    body: `The whole purpuse of this project was to get some experience programming smart contracts in solidity.\n
It's a statically-typed, OOP language that is specifically designed for the Ethereum Virtual Machine.\n
The smart contract powering this DApp is deployed on Ethereum, but it could run on other EVM compatible chains too (eg. Binance, Polygon, Avalanche...)`
  },
  4: {
    title: "🇼\v\v Web3.js",
    body: `This JavaScript library makes it easy to interact with a local or remote ethereum node using HTTP, IPC or WebSocket.\n
Here we've used it to interact with the user's wallet to grab hold of account information and request transaction approvals.`
  },
  5: {
    title: "🦊\v\v MetaMask",
    body: `Who doesn't love that cheeky little fox popping up in your browser on every user interaction with your smart contract?`
  },
  6: {
    title: "🥞\v\v Truffle Suite - Ganache",
    body: `The Truffle suite is composed of 3 tools: Truffle, Ganache and Drizzle (which I didn't use here).\n
Ganache made it possible to develop locally, spinning up blockchains on your machine with pre-funded accounts that you can inmport in your MetaMask wallet.`,
  },
  7: {
    title: "🍄\v\v Truffle Suite - Truffle",
    body: `Truffle is one of the most popular development environments and testing framework for EVM compatible chains.\n
I used it to compile and deploy our smart contract both locally and on the Kovan Testnet of Ethereum. The truffle console is really handy too.\n
The best friend of a Solidity Engineer I guess.`,
  },
  8: {
    title: "🥷\v\v Infura",
    body: "To step things up and get some testnet dev practice I've made use of Infura's Infrastructure to set up an ethereum node on the Kovan testnet"
  },
  9: {
    title: "🐝\v\v CovalentHq",
    body: `With the smart contract deployed on Kovan, I thought of surfacing how much this DApp is costing the user via a blockexplorer.\n
I needed data on the gas price and gas used for each transaction made from the user to the smart contract.\n
EtherScan's free api was quite limited hence why Covalent, which advertises itself as the industry-leading Unified API for Web3.\n
I found their api docs intuitive and am curious to explore how their native token works (Covalent Query Token - CQT).`
  },
  10: {
    title: "🔮\v\v Chainlink",
    body: `Time to interact with an Oracle!\n
For the user to see the transaction costs in $ instead of wei, I called Chainlink's price feed smartcontract running on Kovan to retrieve the latest exchange rate.\n
Now you can continue to uselessly spend your crypto gains in a fully decentralised sprint board`
  },
  11: {
    title: "💃\v\v Awesome, what next?",
    body: `You might have noticed that if you change your wallet's account you start a brand new todo. That's because each account has a different address, so it's as if it were a different user.\n
I thought it would be cool to allow users to assign tasks to each other, if you have other ideas please do share.\n
And if you stuck around this long then you're awesome, let's connect!`
  }
};