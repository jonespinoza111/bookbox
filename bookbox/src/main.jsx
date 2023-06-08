import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import config from './aws-exports.js'
import './index.css'
import { Amplify } from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore';
import { AmplifyProvider } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { BrowserRouter } from 'react-router-dom'

Amplify.configure(config);

DataStore.start();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AmplifyProvider>
        <App />
      </AmplifyProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
