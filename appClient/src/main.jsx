import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ContextTasksProvider } from './context/ContextTasks'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextTasksProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ContextTasksProvider>,
)
