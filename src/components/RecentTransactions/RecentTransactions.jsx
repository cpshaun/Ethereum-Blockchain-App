import { React, useState, useEffect } from 'react'
import { Table, Label } from 'semantic-ui-react'
import Result from '../Result/Result'
import web3 from '../../helpers/web3Provider'
import { truncate } from '../../helpers/helperFunctions'
import './RecentTransactions.css'


const RecentTransactions = (props) => {

    const [transactions,setTransactions] = useState([]);
    const [open,setOpen] = useState(false);
    const [trx,setTrx] = useState({});

    useEffect(() => {
        getTransactions();
    },[props.latestBlock])

    const getTrx = async (txHash) => {
        const Trx = await web3.eth.getTransaction(txHash);
        setTrx(Trx);
        setOpen(true);
    }

    // Callback function for child component to close modal
    const callbackModal = () => {
        setOpen(false);
    }

    const getTransactions = async () => {
        const lastBlock = props.latestBlock;
        //Get info from last block
        const blockInfo = await web3.eth.getBlock(lastBlock);
        // Get list of transactions
        const transactionList = blockInfo.transactions;
        const numTransactions = transactionList.length;
        
        let recentTransactions = [];
        for (let i =numTransactions-1;i>numTransactions-props.numRows-1;i--){
            // For each transaction get its value and convert from wei to eth
            const tx = transactionList[i];
            const txDetails = await web3.eth.getTransactionReceipt(tx);
            const trx = await web3.eth.getTransaction(tx);
            const txEth = web3.utils.fromWei(trx.value).slice(0,5);

            // Get current time and difference from block time
            let currentTime = new Date().getTime();
            let secondsAgo = parseInt(currentTime.toString().slice(0,10)) - parseInt(blockInfo.timestamp);

            recentTransactions = [...recentTransactions,(
                <Table.Row key={numTransactions - i}>
                    <Table.Cell>
                        <div className="tx-detail">
                            <Label.Group circular>
                                <Label circular size="big">Tx</Label>
                            </Label.Group>
                            <div className="tx-hash">
                                {/* <span>{tx}</span><br></br> */}
                                <button className="tx-hash--button" onClick={e => getTrx(tx)}>{tx}</button>
                                <span>{secondsAgo} secs ago</span>
                            </div>                            
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <b>From</b>  {txDetails.from}<br></br>
                        <b>To</b> {txDetails.to}
                    </Table.Cell>
                    <Table.Cell className="eth-reward">
                        <Label tag className="tag">{txEth} Eth</Label><br></br>
                    </Table.Cell>
                </Table.Row>
            )]
            setTransactions(recentTransactions);
        }
    }

    return (
        <div className="table-transactions">
            <Table padded fixed singleLine>
                <Table.Header fullWidth className="table-head">
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <h4>Latest Transactions</h4>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {transactions}
                </Table.Body>
            </Table>
            {open && <Result callbackModal ={callbackModal} blockData={{}} txData={trx} open={open}/>}
        </div>
    )
}

export default RecentTransactions