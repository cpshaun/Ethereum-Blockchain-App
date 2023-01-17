import './App.css'
import EthOverview from './components/EthOverview/EthOverview'

import Navbar from './components/Navbar/Navbar'
import SearchBar from './components/SearchBar/SearchBar'

function App() {

  return (
    <div className="App">
      <Navbar />
      <EthOverview />
    </div>
  )
}

export default App
