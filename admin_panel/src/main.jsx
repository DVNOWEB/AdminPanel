import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import './main.scss'
import { Provider } from 'react-redux'
import { store } from './store/index.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)