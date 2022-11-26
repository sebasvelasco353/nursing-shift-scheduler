import { useState, useEffect } from 'react'
import './App.css'

import ShiftsTable from './components/ShiftsTable.jsx';

function App() {
  const [rows, setRows] = useState(null);
  const shiftsUrl = 'http://localhost:9001/shifts/';

  useEffect(() => {
    fetch(shiftsUrl,{
      method: 'GET',
    })
    .then((response) => {
      return response.json();
    })
    .then((actualData) => console.log(actualData))
  }, []);

  return (
    <div className="App">
      <ShiftsTable />
    </div>
  )
}

export default App
