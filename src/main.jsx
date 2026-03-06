import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import Chat from './Chat.jsx'
import Results from './Results.jsx'

const path = window.location.pathname
const root = createRoot(document.getElementById('root'))

if (path === '/login') {
  root.render(<StrictMode><Login /></StrictMode>)
} else if (path === '/chat') {
  root.render(<StrictMode><Chat /></StrictMode>)
} else if (path === '/results') {
  root.render(<StrictMode><Results /></StrictMode>)
} else {
  root.render(<StrictMode><App /></StrictMode>)
}