import React, { Component } from "react";
import teather from '../tether.png';
import Airdrop from "./Airdrop";


class Main extends Component {
    render() {
        console.log(this.props.stakingBalance);
        console.log(this.props.teatherBalance);
        console.log(this.props.rwdBalance);
        return (
            <div id="content" className="mt-3">
                <table className="table text-muted text-center">
                    <thead >
                        <tr style={{ color: 'white' }}>
                            <th scope="col">Staking Balance</th>
                            <th scope="col">Reward Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ color: 'white' }}>
                            <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')}USDT</td>
                            <td>{window.web3.utils.fromWei(this.props.rwdBalance, 'Ether')}RWD</td>
                        </tr>
                    </tbody>
                </table>
                <div className="card mb-2" style={{ opacity: '.9' }}>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            let amount = this.input.value.toString();
                            amount = window.web3.utils.toWei(amount, 'Ether');
                            this.props.stakeTokens(amount);
                        }} className="mb-3">
                        <div style={{ borderSpacing: '0 1em' }}>
                            <label className="float-left" style={{ marginLeft: '15px' }}>
                                <b>Stake Tokens</b>
                            </label>
                            <span className="float-right" style={{ marginRight: '8px' }}>
                                Balance:{window.web3.utils.fromWei(this.props.teatherBalance)}
                            </span>
                            <div className="input-group mb-4">
                                <input type="text" placeholder="0" 
                                ref={(input)=>{this.input = input}} required></input>
                                <div className="input-group-open">
                                    <div className="input-group-text">
                                        <img src={teather} alt="teather" height='32'>
                                        </img>&nbsp;&nbsp;&nbsp;USDT
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Deposit</button>

                        </div>
                    </form>
                    <button onClick={this.props.unstakeTokens} className="btn btn-primary btn-lg btn-block">Withdraw</button>
                    <div className="card-body text-center" style={{ color: 'blue' }}>
                        AIRDROP <Airdrop stakingBalance={this.props.stakingBalance}></Airdrop>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;