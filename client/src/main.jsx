import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import GlobalStyles from '@mui/material/GlobalStyles';

const globalStyles = {
  h1: {
    color: 'black',
    fontSize: '1.5rem'
  },
  label: {
    color: 'black'
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles styles={globalStyles} />
    <App />
  </React.StrictMode>
)
