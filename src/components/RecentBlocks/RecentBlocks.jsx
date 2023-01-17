import React, { useEffect, useState } from 'react'
import { Table, Label } from 'semantic-ui-react'
import Result from '../Result/Result'
import web3 from '../../helpers/web3Provider'
import { truncate } from '../../helpers/helperFunctions'
import './RecentBlocks.css'

const RecentBlocks = (props) => {

    const [blocks,setBlocks] = useState([]);
    const [block,setBlock] = useState({});
    const [open,setOpen] = useState(false);

    useEffect(() => {
        getBlocks();
    },[props.latestBlock])

    const getBlock = async (blockNum) => {
        const desiredBlock = await web3.eth.getBlock(blockNum);
        setBlock(desiredBlock);
        setOpen(true);
    }
    // Callback function for child component to close modal
    const callbackModal = () => {
        setOpen(false);
    }

    const getBlocks = async () => {
        const lastBlock = props.latestBlock;
        
        let recentBlocks = [];
        setBlocks([]);
        for(let i =0;i<props.numRows;i++){
            // For each block get its information
            const blockInfo = await web3.eth.getBlock(lastBlock-i);
            const result = blockInfo;

            // Get current time and difference from block time
            let currentTime = new Date().getTime();
            let secondsAgo = parseInt(currentTime.toString().slice(0,10)) - parseInt(result.timestamp);

            recentBlocks = [...recentBlocks,(
                <Table.Row key={i}>
                    <Table.Cell>
                    <div className="block-detail">
                        <Label size="big">Bk</Label> 
                        <div className="block-num">
                            <button className="block-number" onClick={e => getBlock(lastBlock-i)}>{lastBlock - i}</button>
                            <p>{secondsAgo} secs ago</p>
                        </div>
                    </div>
                    </Table.Cell>
                    <Table.Cell>
                        <b>Fee Recipient</b> {truncate(result.miner,18)} <br></br>
                        {result.transactions.length} txns 
                    </Table.Cell>
                </Table.Row>
            )]
            console.log('Recent Blocks ',recentBlocks);
            console.log('Blocks ',blocks);
            setBlocks(recentBlocks);
        }
    }

    console.log(blocks);
    return (
        <div className="table-blocks">
            <Table padded fixed singleLine>
                <Table.Header className="table-head">
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>
                            <h4>Latest Blocks</h4>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {blocks}
                </Table.Body>
            </Table>
            {open && <Result callbackModal ={callbackModal} blockData={block} txData={{}} open={open}/>}
        </div>
    )
}

export default RecentBlocks