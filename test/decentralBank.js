// const { assert } = require('console');



const Teather = artifacts.require('Teather');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');


require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DecentralBank', ([owner,customer]) => {
    let teather, rwd, decentralBank;

    function tokens(number) {
        return web3.utils.toWei(number, 'ether');
    }

    before(async()=> {
        // Load cntracts
        teather = await Teather.new();
        rwd = await RWD.new();
        decentralBank = await DecentralBank.new(rwd.address, teather.address);
        // tranfer all tokens to decentralBank (1 Million)
        await rwd.transfer(decentralBank.address, tokens('1000000'));

        // treamfer 100 mock teather to customer

        await teather.transfer(customer,tokens('100'), {from:owner});
    })

    describe('Mock teather Deployment', async () => {
        it('matched name successdully', async () => {
            const name = await teather.name();
            assert.equal(name, 'Mock Teather Token');
        })
    })

    describe('Reward Token Deployment', async () => {
        it('matched name successdully', async () => {
            
            const name = await rwd.name();
            assert.equal(name, 'Reward Token');
        })
    })

    describe('Decentral Bank Deployment', async () => {
        it('matched name successdully', async () => {
            
            const name = await decentralBank.name();
            assert.equal(name, 'Decentral Bank');
        })

        it('contract has tokens', async() => {
            let balance = await rwd.balanceOf(decentralBank.address);
            assert.equal(balance, tokens('1000000'));
        })
    })
});
