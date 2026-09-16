import React from 'react'
import UrlShortener from './components/UrlShortener'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div>
      <UrlShortener/>

      <ToastContainer/>
    </div>
  )
}

export default App
