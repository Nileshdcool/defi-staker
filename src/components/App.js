import React, { Component } from "react";
import Navbar from "./Navbar";
import Web3 from 'web3';
import Teather from '../truffle_abis/Teather.json';
import RWD from '../truffle_abis/RWD.json';
import DecentralBank from '../truffle_abis/DecentralBank.json';
import Main from "./Main";

class App extends Component {

    async UNSAFE_componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('No ethereum browser detected, checkout Metamask!');
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        const account = await web3.eth.getAccounts();
        console.log(account);
        this.setState({ account: account[0] });
        const networkID = await web3.eth.net.getId();
        // load teather Contract
        const teatherData = Teather.networks[networkID];
        if (teatherData) {
            const teather = new web3.eth.Contract(Teather.abi, teatherData.address);
            this.setState({ teather });
            let teatherBalance = await teather.methods.balanceOf(this.state.account).call();
            this.setState({ teatherBalance: teatherBalance.toString() });
            console.log({ balance: teatherBalance.toString() });
        } else {
            window.alert('Error, teather contract not deployed');
        }

        // load rwd Contract
        const rwdData = RWD.networks[networkID];
        if (rwdData) {
            const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
            this.setState({ rwd });
            let rwdBalance = await rwd.methods.balanceOf(this.state.account).call();
            this.setState({ rwdBalance: rwdBalance.toString() });
            console.log({ balance: rwdBalance.toString() });
        } else {
            window.alert('Error, rwd contract not deployed');
        }

        // load decentral bank Contract
        const decentralBankData = DecentralBank.networks[networkID];
        if (decentralBankData) {
            debugger;
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
            this.setState({ decentralBank });
            let stakingBalance = await decentralBank.methods.stakingBalance(this.state.account).call();
            this.setState({ stakingBalance: stakingBalance.toString() });
            console.log({ stakingBalance: stakingBalance.toString() });
        } else {
            window.alert('Error, decentralbank contract not deployed');
        }
        this.setState({ loading: false })
    }

    //two functions one that stakes and unstake 


    //staking function

    stakeTokens = (amount) => {
        debugger;
        this.setState({ loading: true });
        this.state.teather.methods.approve(this.state.decentralBank._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.state.decentralBank
                .methods
                .depositTokens(amount)
                .send({ from: this.state.account })
                .on('transactionHash', (hash) => {
                    this.setState({ loading: false });
                });
        });
    }

    unstakeTokens = () => {
        debugger;
        this.setState({ loading: true });
            this.state.decentralBank
                .methods
                .unStakeTokens()
                .send({ from: this.state.account })
                .on('transactionHash', (hash) => {
                    this.setState({ loading: false });
                });
    }

    constructor(props) {
        super(props);
        this.state = {
            account: '0x0',
            teather: {},
            rwd: {},
            decentralBank: {},
            teatherBalance: '0',
            rwdBalance: '0',
            stakingBalance: '0',
            loading: true
        }
    }
    render() {
        let content;
        {
            this.state.loading ? content = <p id="loader" className="text-center"
                style={{ margin: '30px' }}>Loading Please...</p> : content =
            <Main
                teatherBalance={this.state.teatherBalance}
                rwdBalance={this.state.rwdBalance}
                stakingBalance={this.state.stakingBalance}
                stakeTokens={this.stakeTokens}
                unstakeTokens= {this.unstakeTokens}>
            </Main>
        }
        return (
            <div>
                <Navbar account={this.state.account}></Navbar>
                <div className="container-fluid mt-5">
                    <div className="row">
                        <main role="main"
                            className="col-lg-12 ml-auto mr-auto"
                            style={{ maxWidth: '600px', minHeight: '100vm' }}>
                            <div>
                                {content}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;