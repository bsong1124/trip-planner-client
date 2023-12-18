import { useState } from 'react'
import './App.css'

import Main from './components/main/Main'
import Header from './components/header/header'

function App() {
  return (
    <div className='app'>
      <Header />
      <Main />
    </div>
  )
}

export default App
