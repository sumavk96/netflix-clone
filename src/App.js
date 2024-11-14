
import React, { useEffect } from 'react';
import NavBar from './Components/NavBar/NavBar';
import './App.css';
import { action,original } from './urls';
import Banner from './Components/NavBar/Banner/Banner';
import RowPost from './Components/NavBar/Banner/RowPost/RowPost';


function App() {

  return (
    <div className="App">
     <NavBar/>
     <Banner/>
     <RowPost url={original} title='Netflix originals'/>
     <RowPost url={action} title='Action' isSmall/>
       
    </div>
  );
}

export default App;
