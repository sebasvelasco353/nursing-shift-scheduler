import { useState, useEffect } from 'react'
import './App.css'

import ShiftsTable from './components/ShiftsTable.jsx';

function App() {
  const [shifts, setShifts] = useState(null);
  const shiftsUrl = 'http://localhost:9001/shifts/';
  const nursesUrl = 'http://localhost:9001/nurse/'

  useEffect(() => {
    Promise.all([
      fetch(shiftsUrl),
      fetch(nursesUrl)
    ])
    .then(([res1, res2]) => {
      Promise.all([
        res1.json(),
        res2.json()
      ])
      .then(([shiftsResponse, nursesResponse]) => {
        let rows = []
        for (let i = 0; i < shiftsResponse.length; i++) {
          const element = shiftsResponse[i];
          element.nurse = nursesResponse.find((nurse) => {
            return nurse.id === element.nurseId
          })
          rows.push(element);
          setShifts(rows);
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <div className="App">
      <ShiftsTable rows={shifts} />
    </div>
  )
}

export default App
