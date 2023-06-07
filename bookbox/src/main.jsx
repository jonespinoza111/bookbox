import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import config from './aws-exports.js'
import './index.css'
import { Amplify } from 'aws-amplify'
import { AmplifyProvider } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(config);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AmplifyProvider>
      <App />
    </AmplifyProvider>
  </React.StrictMode>,
)
