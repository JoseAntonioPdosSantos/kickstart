const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(contractPath, { encoding: "utf-8" });

var input = {
    language: "Solidity",
    sources: {
        ethereum: {
            content: source,
        },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

const inputJson = JSON.stringify(input);
const compileFile = solc.compile(inputJson);
const contracts = JSON.parse(compileFile);

fs.ensureDirSync(buildPath);

try {
    fs.outputJSONSync(
        path.resolve(buildPath, 'CampaignFactory.json'),
        contracts.contracts.ethereum.CampaignFactory
    );
    fs.outputJSONSync(
        path.resolve(buildPath, 'Campaign.json'),
        contracts.contracts.ethereum.Campaign
    );
} catch(e) {
    console.log(e);
}
