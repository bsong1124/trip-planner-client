import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {BrowserRouter as Router} from 'react-router-dom'
import Auth0ProviderWithNavigate from './components/Auth/Auth0ProviderWithNavigate.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Auth0ProviderWithNavigate>
    <App />
    </Auth0ProviderWithNavigate>
  </Router>,
)
