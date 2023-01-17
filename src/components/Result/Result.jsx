import { React, useEffect, useState } from 'react'
import { Modal } from 'semantic-ui-react'
import web3 from '../../helpers/web3Provider'
import { truncate } from '../../helpers/helperFunctions'
import './Result.css'

const Result = (props) => {
    const [open, setOpen] = useState(false)

    const [blockData, setBlockData] = useState({});
    const [txData,setTxData] = useState({});

    console.log(props.blockData,props.txData);

    let modalHeader,modalDescription;

    useEffect(() => {
        if(Object.keys(props.blockData).length != 0){
            setBlockData(props.blockData);
        }
        else if(Object.keys(props.txData).length != 0){
            setTxData(props.txData);
        }
    },[props.blockData,props.txData])

    if(Object.keys(blockData).length != 0){
        modalHeader = <Modal.Header>
                <h3>Block {blockData.number}</h3>
            </Modal.Header>
        modalDescription =  <Modal.Description className="modal-description">
            <p><b>Fee Recipient: </b>{blockData.miner}</p>
            <p><b>Total Transactions: </b>{blockData.transactions.length}</p>
        </Modal.Description>
    }
    else if (Object.keys(txData).length != 0){
        modalHeader = <Modal.Header className="modal-header--tx">
            <h3>Transaction Hash {truncate(txData.hash,18)}</h3>
            <h3>Block {txData.blockNumber}</h3>          
        </Modal.Header>
        modalDescription = <Modal.Description className="modal-description">
            <p><b>From: </b>{txData.from}</p>
            <p><b>To: </b>{txData.to}</p>
            <p><b>Amount: </b>{web3.utils.fromWei(txData.value).slice(0,5)} Eth</p>
        </Modal.Description>
    }
    
    return (
        <Modal
        onClose={() => {
            console.log('Closing');
            setBlockData({})
            setTxData({})
            console.log(props.blockData,props.txData);
            props.callbackModal();
        }}
        onOpen={() => {
            console.log('Opening');
            setOpen(true)
        }}
        closeIcon
        open={props.open}>
            {modalHeader}
            {modalDescription}
        </Modal>
    )
}

export default Result