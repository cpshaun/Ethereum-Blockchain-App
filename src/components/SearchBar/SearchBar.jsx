import { React, useState } from 'react'
import { Input,Button, Icon } from 'semantic-ui-react'
import Result from '../Result/Result'
import './SearchBar.css'
import web3 from '../../helpers/web3Provider'

const SearchBar = () => {

  const [searchInput, setSearchInput] = useState("")
  const [blockResult, setBlockResult] = useState({})
  const [txResult, setTxResult] = useState({})
  const [open, setOpen] = useState(false)
  const [error,setError] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setError("");
    setSearchInput(e.target.value);
  };

  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSearch();
    }
  };
  const handleSearch = async () => {
    // Basic check of whether input is going to be block or hash
    if(searchInput.slice(0,2)!='0x'){
      try {
        const blockData = await web3.eth.getBlock(searchInput);
        if(blockData){         
          console.log(blockData) 
          setBlockResult(blockData);
          setTxResult({})
          setOpen(true);
          setError("");
        }
        else {
          throw error;
        }
      }
      catch {
        setError('Block cannot be found');
      }
    }
    else{
      try {
        const txData = await web3.eth.getTransaction(searchInput);
        if(txData){
          console.log(txData)
          setTxResult(txData);
          setBlockResult({})
          setOpen(true);
          setError("");
        }
        else {
          throw error;
        }
      }
      catch {
        setError('Transaction cannot be found');
      }
    }       
  }

  // Callback function for child component to close modal
  const callbackModal = () => {
    setOpen(false);
  }

  return (
      <div className="section-search">
          <h3>The Ethereum Blockchain Explorer</h3>
          {/* <div className="ui action input"> */}
            <Input 
              type="text" 
              placeholder="Search For Specific Block or Transaction(Hash)"
              onChange={handleChange}
              value={searchInput}
              onKeyDown={handleKeypress}
            >
              <input />
              <Button 
              className="search-button"
              primary
              icon
              onClick={handleSearch}>
                <Icon name='search'/>
              </Button>
            </Input>
          {/* </div> */}
          <h4>{error}</h4>
          {open && <Result callbackModal ={callbackModal} blockData={blockResult} txData={txResult} open={open}/>}
          {/* {open && <Result callbackModal={callbackModal} blockNum={blockNumInput} txHash={txHashInput} open={open}/>} */}
      </div>
  )
}

export default SearchBar