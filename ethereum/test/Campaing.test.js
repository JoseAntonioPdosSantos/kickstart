const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const comipledFactory = require('../build/CampaignFactory.json');
const compiledCampaing = require('../build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(
        JSON.parse(compiledCampaing.abi)
    ).deploy({
        data: compliedFactory.evm.bytecode.object
    }).send({
        from: accounts[0],
        gas: '1000000'
    });
});


