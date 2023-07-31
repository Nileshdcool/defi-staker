const Teather = artifacts.require('Teather');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function (deployer, network, accounts) {

    await deployer.deploy(Teather);
    const teather = await Teather.deployed();

    await deployer.deploy(RWD);
    const rwd = await RWD.deployed();

    await deployer.deploy(DecentralBank, rwd.address, teather.address);
    const decentralbank = await DecentralBank.deployed();
    await rwd.transfer(decentralbank.address, '1000000000000000000000000');

    // distribute 100 Teather rtokens to investors
    await teather.transfer(accounts[1], '100000000000000000000' );
}