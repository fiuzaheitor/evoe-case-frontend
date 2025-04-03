import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoute from './hoc/Routes'
import './styles/globals.scss'
import { AuthProvider } from './hoc/AuthContext'
import { ToastContainer } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ToastContainer />
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  </React.StrictMode>
)
