import React from 'react';
import './App.css';

import Topbar from './Topbar'
import data from './data.json'

function App() {
  return (
    <React.Fragment>
      <Topbar data={data} />
    </React.Fragment>
  );
}

export default App;
