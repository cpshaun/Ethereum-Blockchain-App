import { React, useState, useEffect } from 'react';
import './EthOverview.css';

import { Button, Card, Grid, Icon } from 'semantic-ui-react';
import SearchBar from '../SearchBar/SearchBar';
import RecentBlocks from '../RecentBlocks/RecentBlocks';
import RecentTransactions from '../RecentTransactions/RecentTransactions';
import web3 from '../../helpers/web3Provider';

const EthOverview = () => {

    const [latestBlock,setLatestBlock] = useState(0);

    // Get latestBlock once on page load
    useEffect(()=> {
        web3.eth.getBlockNumber().then((res) => {
            setLatestBlock(res);            
        })
    },[])

    const getLastBlock =()=>{
        web3.eth.getBlockNumber().then((res) => {
            console.log(res);
            setLatestBlock(res);            
        })
    }

    console.log("Latest Ethereum Block is ",latestBlock);
    
    const numRows = 10;
    // Update latest blocks and transactions 
    const getLatestBlocks = () => {
        if(latestBlock){
            return <RecentBlocks latestBlock={latestBlock} numRows={numRows}/>
        }
    }
    
    const getLatestTxn = () => {
        if(latestBlock){
            return <RecentTransactions latestBlock={latestBlock} numRows={numRows}/>
        }
    }

    return (
        <div>
            <SearchBar />
            <div className="section-overview">
                <Grid className="section-overview--heading">
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>
                                        <Icon name="ethereum"></Icon> ETHER TRANSACTIONS
                                    </Card.Header>
                                    <Card.Description>
                                        <p>Transactions over time</p>
                                        <p>Network Throughput</p>
                                        <p>Average Latency</p>                                        
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Button 
                    className="refresh-button"
                    icon
                    labelPosition='left'
                    primary
                    onClick={getLastBlock}>
                        Refresh
                        <Icon name='refresh'/>
                    </Button>
                </Grid>
                
                <Grid className="section-overview--latest"stackable >
                    <Grid.Row className="" columns={2}>
                        <Grid.Column>{getLatestBlocks()}</Grid.Column>
                        <Grid.Column>{getLatestTxn()}</Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>            
        </div>
    )
}

export default EthOverview